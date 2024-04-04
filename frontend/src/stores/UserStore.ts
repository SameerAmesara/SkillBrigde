import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { UserDetails } from "../models/UserDetatils.model";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
const USERS_URL = `${BASE_URL}/user`;

/**
 * Manages the user state within the application, including user details.
 */
export class UserStore {
  rootStore: RootStore;
  userDetails: UserDetails = {
    email: "",
    firstName: "",
    lastName: "",
    image: "",
    uid: "",
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  /**
   * Fetches the details of the current user from the backend API and updates the store's state.
   * This method uses the user ID stored in the session storage to request user details,
   * then updates the `userDetails` property with the fetched data.
   *
   * @throws An error if the request fails, including network issues or if the user ID does not exist.
   */
  async fetchUserDetails() {
    const userId = sessionStorage.getItem("userId");
    await axios
      .get<UserDetails>(`${USERS_URL}/${userId}`)
      .then((response) => {
        this.userDetails = { ...response.data };
      })
      .catch((error: AxiosError<{ message: string }, unknown>) => {
        throw new Error(
          error?.response?.data?.message ?? "Failed to fetch user details"
        );
      });
  }
}
