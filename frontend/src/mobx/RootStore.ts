import { createContext, useContext } from "react";
import { PaymentsStore } from "./PaymentsStore";

export class RootStore {
  paymentsStore: PaymentsStore;
  constructor() {
    this.paymentsStore = new PaymentsStore(this);
  }
}

const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);
