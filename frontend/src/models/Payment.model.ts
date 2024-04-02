export interface Payment {
  amount: number;
  paymentMethodId: string;
  transactionType: "BOOK_MENTOR" | "";
  referenceId: string;
  createdAt: Date;
  userId: string;
}

export interface PaymentParameter {
  amount?: number;
  paymentMethodId?: string;
  transactionType?: "BOOK_MENTOR" | "";
  referenceId?: string;
  createdAt?: Date;
  userId?: string;
}
