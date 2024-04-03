import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OzWAsCze0fcYUhcxAo4PRg7u0pz00TPy5xY5dYMiD8nPyDS1hHmkRa6gQiiRvNVeo2z9jZ8BZlweH5oPUTXB9Wy00PHapT0VL",
  {
    apiVersion: "2023-10-16",
  }
);

export const createStripeCustomer = async (email: string, name?: string) => {
  const customer = await stripe.customers.create({
    email,
    name,
  });
  return customer;
};

export default stripe;
