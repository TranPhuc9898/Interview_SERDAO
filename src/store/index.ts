import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Beneficiary, Transaction } from '@types';

interface AppState {
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  balance: number;
  addTransaction: (transaction: Transaction) => void;
  addBeneficiary: (beneficiary: Beneficiary) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      transactions: [],
      beneficiaries: [],
      balance: 1000,
      addTransaction: transaction => {
        set(state => ({
          transactions: [transaction, ...state.transactions],
          balance: state.balance - transaction.amount,
        }));
      },
      addBeneficiary: beneficiary => {
        set(state => ({
          beneficiaries: [beneficiary, ...state.beneficiaries],
        }));
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
