import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { Payment } from "../models/Payment.model";
import { SavedCard } from "../models/SavedCard.model";
import axios from "axios";
import { PaymentMethod } from "@stripe/stripe-js";
import { PaymentDetails } from "../models/PaymentDetails.model";
import {
  Transaction,
  TransactionParams,
  TransactionResponse,
} from "../models/Transaction.model";

const defaultPayment: Payment = {
  paymentMethodId: "",
  amount: 0,
};

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
const PAYMENTS_URL = `${BASE_URL}/payments`;

export class PaymentsStore {
  rootStore: RootStore;

  cards: SavedCard[] = [];
  payment: Payment = {
    ...defaultPayment,
  };
  paymentDetails: Partial<PaymentDetails> = {};
  transactions: Transaction[] = [];
  isCardsLoading = false;
  transactionsParams: TransactionParams = { page: 1, limit: 10, totalPages: 1 };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async saveCard(paymentMethodId: string) {
    const userId = sessionStorage.getItem("userId");
    const response = await axios.post(
      `${PAYMENTS_URL}/save-card`,
      {
        paymentMethodId,
        userId,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    await this.fetchSavedCards();
    return response;
  }

  async fetchSavedCards() {
    const userId = sessionStorage.getItem("userId");
    this.isCardsLoading = true;
    const cards = await axios.get<PaymentMethod[]>(
      `${PAYMENTS_URL}/fetch-saved-cards/${userId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    this.cards = cards.data.map((card) => {
      return {
        id: card.id,
        brand: card.card?.brand as string,
        exp_month: (card.card?.exp_month as number).toString(),
        exp_year: (card.card?.exp_year as number).toString(),
        last4: card.card?.last4 as string,
      };
    });
    this.isCardsLoading = false;
  }

  async deleteCard(paymentMethodId: string) {
    const userId = sessionStorage.getItem("userId");
    const response = await axios.delete(
      `${PAYMENTS_URL}/delete-card/${userId}/${paymentMethodId}`
    );
    await this.fetchSavedCards();
    return response;
  }

  async pay() {
    const userId = sessionStorage.getItem("userId");
    const payload = {
      paymentMethodId: this.payment.paymentMethodId,
      amount: this.payment.amount ?? 0,
      userId,
      description: this.paymentDetails.type ?? "",
    };

    const response = await axios.post(
      `${PAYMENTS_URL}/pay`,
      {
        ...payload,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  }

  async fetchTransactions() {
    const userId = sessionStorage.getItem("userId");
    const { page, limit } = this.transactionsParams;
    const response = await axios.get<TransactionResponse>(
      `${PAYMENTS_URL}/transactions/${userId}?page=${page}&limit=${limit}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const transactions = response.data.data;
    const transactionsWithCards = transactions.map((transaction) => {
      const card = this.cards.find(
        (card) => card.id === transaction.paymentMethodId
      );
      return { ...transaction, cardLast4: card?.last4 ?? "" };
    });
    this.transactionsParams = {
      ...this.transactionsParams,
      page: response.data.page,
      totalPages: response.data.pages,
    };
    this.transactions = transactionsWithCards;
  }

  updatePayment(payment: Partial<Payment>) {
    this.payment = { ...this.payment, ...payment };
  }

  updatePaymentDetails(paymentDetails: Partial<PaymentDetails>) {
    this.paymentDetails = { ...this.paymentDetails, ...paymentDetails };
  }

  updateTransactionParams(params: Partial<TransactionParams>) {
    this.transactionsParams = { ...this.transactionsParams, ...params };
  }

  resetPayment() {
    this.payment = { ...defaultPayment };
  }
}
