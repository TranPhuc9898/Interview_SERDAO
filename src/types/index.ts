export interface Transaction {
  id: number;
  amount: number;
  beneficiaryId: number;
  date: string;
}

export interface Beneficiary {
  id: number;
  firstName: string;
  lastName: string;
  iban: string;
}
