export type Review = {
  name: string;
  country: string;
  text: string;
};

// ponytail: static array, move to CMS/DB only if reviews need moderation/submission workflow later
export const reviews: Review[] = [
  {
    name: "Oliver Thompson",
    country: "England",
    text: "I recently discovered a pharmacy here in the UK that's been a game changer for me. They offer 24/7 delivery, which is honestly something I didn't know I needed until now. It's nice knowing I can order medications or health products any time of the day or night. I've used their service a couple of times, especially late at night when I realized I was out of something important.",
  },
  {
    name: "Sophie Williams",
    country: "Wales",
    text: "What surprised me the most was how affordable their prices are compared to other pharmacies I've used before. It's refreshing to find a service that doesn't break the bank while still providing quality products. Plus, the delivery is super quick! The last time I ordered, my items arrived within an hour, which felt like a miracle at that late hour.",
  },
  {
    name: "Callum MacLeod",
    country: "Scotland",
    text: "The packaging was nice, and everything arrived in perfect condition, which I really appreciated. I also felt like the staff was friendly and helpful when I called to ask a question. It's that personal touch that makes a difference, you know?",
  },
  {
    name: "Lukas Schneider",
    country: "Germany",
    text: "If you're someone who values convenience and cost, I can't recommend them enough. It's been a relief to have a reliable place to turn to, especially with how hectic life can get. I'm definitely going to stick with them for my future pharmacy needs!",
  },
  {
    name: "Anna Müller",
    country: "Germany",
    text: "What really stands out to me is their commitment to being value-based. It's clear they genuinely care about their customers and want to provide the best service possible without breaking the bank. Their prices are fair, and I feel like I'm getting a great deal every time I order.",
  },
  {
    name: "Pierre Dubois",
    country: "France",
    text: "I also appreciate that they operate 24/7. It's a lifesaver for someone like me who often needs to refill prescriptions at odd hours. It makes it so convenient to have access to a pharmacy that's always open.",
  },
  {
    name: "Camille Laurent",
    country: "France",
    text: "Overall, I would highly recommend this pharmacy to anyone looking for a trustworthy and efficient option. Their dedication to customer service and product quality is top-notch, and I feel confident knowing I've got a reliable pharmacy I can count on any time of day.",
  },
  {
    name: "Javier Rodríguez",
    country: "Spain",
    text: "They delivered everything right on schedule, which is such a relief when you're counting on your medications. It's reassuring to know that they have a strong reputation for their products; everything I've received has been high quality.",
  },
  {
    name: "Giulia Romano",
    country: "Italy",
    text: "I recently started using Synedica in Germany that has truly impressed me with their service. From the moment I placed my order, I knew I was dealing with a reliable and efficient company.",
  },
  {
    name: "Daan van der Meer",
    country: "Netherlands",
    text: "They delivered my order exactly on time, which was such a relief, and I really appreciate their commitment to value-based service. Plus, their 24/7 operation means I can rely on them anytime I need help — definitely a lifesaver!",
  },
];
