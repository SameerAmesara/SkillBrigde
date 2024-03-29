import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class AppStore {
  mentors: { id: string; name: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addMentor = (mentor: { id: string; name: string }) => {
    this.mentors.push(mentor);
  };

  getMentors() {
    return this.mentors.slice();
  }
}

export const appStore = new AppStore();
export const appStoreContext = createContext(appStore);
