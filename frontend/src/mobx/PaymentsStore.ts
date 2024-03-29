import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export class PaymentsStore {
  rootStore: RootStore;

  transactions: string[] = [];
  cards: string[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  addTransaction(newT: string) {
    this.transactions.push(newT);
  }
}
