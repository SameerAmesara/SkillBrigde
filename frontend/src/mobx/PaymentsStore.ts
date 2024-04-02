import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { Payment, PaymentParameter } from "../models/Payment.model";
import { SavedCard } from "../models/SavedCard.model";

const defaultPayment: Payment = {
  amount: 0.0,
  createdAt: new Date(),
  paymentMethodId: "",
  referenceId: "",
  transactionType: "",
  userId: "",
};

export class PaymentsStore {
  rootStore: RootStore;

  transactions: string[] = [];
  cards: SavedCard[] = [
    { brand: "mc", last4: "4242", exp_month: "08", exp_year: "2024", id: "1" },
    {
      brand: "visa",
      last4: "4242",
      exp_month: "08",
      exp_year: "2024",
      id: "2",
    },
  ];
  payment: Payment = {
    ...defaultPayment,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  addTransaction(newT: string) {
    this.transactions.push(newT);
  }

  updatePayment(payment: PaymentParameter) {
    this.payment = { ...this.payment, ...payment };
  }

  resetPayment() {
    this.payment = { ...defaultPayment };
  }
}
