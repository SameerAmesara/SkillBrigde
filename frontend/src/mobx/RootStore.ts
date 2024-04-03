import { createContext, useContext } from "react";
import { PaymentsStore } from "./PaymentsStore";
import { BookingStore } from "./BookingStore";

export class RootStore {
  paymentsStore: PaymentsStore;
  bookingStore: BookingStore;

  constructor() {
    this.paymentsStore = new PaymentsStore(this);
    this.bookingStore = new BookingStore(this);
  }
}

const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);
