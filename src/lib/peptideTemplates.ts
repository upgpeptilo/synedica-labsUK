export type PeptideTemplate = {
  id: string;
  label: string;
  title: string;
  form: string;
  category: string;
  sizes: string;
  cas: string;
  formula: string;
  weight: string;
  purity: string;
  sequence: string;
};

// ponytail: reference chemistry data (CAS/formula/weight) pulled from public
// sources as a starting draft — admin should verify before publishing, not
// guaranteed exact for every batch/supplier.
export const PEPTIDE_TEMPLATES: PeptideTemplate[] = [
  {
    id: "bpc-157",
    label: "BPC-157",
    title: "BPC-157",
    form: "Injection Kit",
    category: "Recovery",
    sizes: "10MG, 40MG",
    cas: "137525-51-0",
    formula: "C62H98N16O22",
    weight: "1419.53 g/mol",
    purity: "≥98%",
    sequence: "GEPPPGKPADDAGLV",
  },
  {
    id: "tb-500",
    label: "TB-500 (Thymosin Beta-4)",
    title: "TB-500",
    form: "Injection Kit",
    category: "Recovery",
    sizes: "5MG, 10MG",
    cas: "77591-33-4",
    formula: "C212H350N56O78S",
    weight: "4963.4 g/mol",
    purity: "≥98%",
    sequence: "",
  },
  {
    id: "melanotan-2",
    label: "Melanotan II",
    title: "Melanotan 2",
    form: "Nasal Spray",
    category: "Cosmetic",
    sizes: "10MG, 20MG",
    cas: "121062-08-6",
    formula: "C50H69N15O9",
    weight: "1024.18 g/mol",
    purity: "≥98%",
    sequence: "",
  },
  {
    id: "semaglutide",
    label: "Semaglutide",
    title: "Semaglutide",
    form: "Pen Kit",
    category: "Weight Loss",
    sizes: "8MG",
    cas: "910463-68-2",
    formula: "C187H291N45O59",
    weight: "4113.58 g/mol",
    purity: "≥98%",
    sequence: "",
  },
  {
    id: "tirzepatide",
    label: "Tirzepatide",
    title: "Tirzepatide",
    form: "Injection Pen Kit",
    category: "Weight Loss",
    sizes: "40MG",
    cas: "2023788-19-2",
    formula: "C225H348N48O68",
    weight: "4813.45 g/mol",
    purity: "≥98%",
    sequence: "",
  },
  {
    id: "retatrutide",
    label: "Retatrutide",
    title: "Retatrutide",
    form: "Injection Kit",
    category: "Weight Loss",
    sizes: "40MG",
    cas: "",
    formula: "",
    weight: "",
    purity: "≥98%",
    sequence: "",
  },
  {
    id: "nad",
    label: "NAD+",
    title: "NAD+",
    form: "Injection Kit",
    category: "Recovery",
    sizes: "500MG, 1000MG",
    cas: "53-84-9",
    formula: "C21H27N7O14P2",
    weight: "663.43 g/mol",
    purity: "≥99%",
    sequence: "",
  },
  {
    id: "nmn",
    label: "NMN",
    title: "NMN",
    form: "Injection Pen Kit",
    category: "Recovery",
    sizes: "1000MG",
    cas: "1094-61-7",
    formula: "C11H15N2O8P",
    weight: "334.22 g/mol",
    purity: "≥99%",
    sequence: "",
  },
  {
    id: "hgh",
    label: "HGH (Somatropin)",
    title: "Somatropin HGH",
    form: "Injection Pen Kit",
    category: "Recovery",
    sizes: "120IU",
    cas: "12629-01-5",
    formula: "C990H1528N262O300S7",
    weight: "~22125 g/mol",
    purity: "≥99%",
    sequence: "",
  },
  {
    id: "biotin",
    label: "Biotin",
    title: "Biotin",
    form: "Injection Pen Kit",
    category: "Recovery",
    sizes: "40MG",
    cas: "58-85-5",
    formula: "C10H16N2O3S",
    weight: "244.31 g/mol",
    purity: "≥99%",
    sequence: "",
  },
];
