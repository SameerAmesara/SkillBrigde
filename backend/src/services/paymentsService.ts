import { ObjectId } from "mongodb";
import stripe from "../utils/stripe";
import userService from "../services/userDetailsService";
import { Transaction } from "../types";
import TransactionModel from "../models/transaction";

const saveCardToStripe = async (paymentMethodId: string, userId: string) => {
  const stripeCustomerId = await userService.fetchUserStripeCustomerId(userId);
  if (stripeCustomerId) {
    return await stripe.paymentMethods
      .attach(paymentMethodId, {
        customer: stripeCustomerId.toString(),
      })
      .then((card) => {
        return card;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } else {
    throw new Error("Invalid user id");
  }
};

const fetchSavedCardsFromStripe = async (userId: string) => {
  const stripeCustomerId = await userService.fetchUserStripeCustomerId(userId);
  if (stripeCustomerId) {
    return stripe.paymentMethods
      .list({
        customer: stripeCustomerId.toString(),
        type: "card",
      })
      .then((cards) => {
        return cards.data;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } else {
    throw new Error("Invalid card details");
  }
};

const deleteSavedCardFromStripe = async (
  userId: string,
  paymentMethodId: string
) => {
  const stripeCustomerId = await userService.fetchUserStripeCustomerId(userId);
  if (stripeCustomerId) {
    return stripe.paymentMethods
      .detach(paymentMethodId)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } else {
    throw new Error("Invalid user id");
  }
};

const payUsingStripe = async (transaction: Partial<Transaction>) => {
  const { paymentMethodId, userId, amount } = transaction;
  if (userId && amount) {
    const stripeCustomerId = await userService.fetchUserStripeCustomerId(
      userId
    );
    if (stripeCustomerId) {
      return stripe.paymentIntents
        .create({
          amount: Math.round(amount * 100),
          currency: "cad",
          payment_method: paymentMethodId,
          customer: stripeCustomerId.toString(),
          confirm: true,
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never",
          },
        })
        .then((paymentIntent) => {
          const newTransaction = new TransactionModel({
            ...transaction,
            id: new ObjectId(),
            stripeTransactionId: paymentIntent.id,
          });
          newTransaction.save();
          return newTransaction;
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } else {
      throw new Error("Invalid user id");
    }
  } else {
    throw new Error("Invalid user id");
  }
};

const fetchTransactions = async (
  userId: string,
  page: number,
  limit: number
) => {
  try {
    const skip = (page - 1) * limit;

    const transactions = await TransactionModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await TransactionModel.countDocuments({ userId });
    return {
      data: transactions,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  } catch (error: unknown) {
    throw new Error("Unable to fetch transactions");
  }
};

export default {
  saveCardToStripe,
  fetchSavedCardsFromStripe,
  deleteSavedCardFromStripe,
  payUsingStripe,
  fetchTransactions,
};
