// Run manually in a trusted environment with SMTP_PASSWORD configured.
// Sends one clearly labelled test to the business mailbox; creates no order.
const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');
const compiled = ts.transpileModule(fs.readFileSync('src/lib/orderEmail.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const target = { exports: {} };
vm.runInNewContext(compiled, { module: target, exports: target.exports, require, process, Intl, console });
const mailer = target.exports.createOrderMailer();
target.exports.sendOrderEmail({
  sendMail: (mail) => mailer.sendMail({
    ...mail,
    messageId: undefined,
    subject: 'TEST ONLY - Synedica order email integration',
    text: 'TEST ONLY. No order was placed. Do not fulfil or request payment.\n\n' + mail.text,
  }),
}, 0, {
  name: 'TEST ONLY', email: 'info@synedicalabs.uk', phone: 'Test',
  address: 'Test - no delivery', paymentMethod: 'TEST - no payment',
  items: [{ title: 'Email integration test - not a product order', size: '', qty: 1, priceGbp: 0 }], total: 0,
}).then(() => {
  console.log('SMTP_DELIVERY_TEST_PASSED: Hostinger accepted the test notification');
  mailer.close();
}).catch((error) => {
  console.error('SMTP_DELIVERY_TEST_FAILED', error.code || error.name, error.responseCode || '');
  mailer.close();
  process.exitCode = 1;
});
