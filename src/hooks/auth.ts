import { signal } from "@preact/signals-react";
import { user } from "../components/input/Auth";

export const isSign = signal<boolean>(false);

interface signUpStore {
    token: string | undefined;
    channel: {
      status: number;
      message: string;
    };
}

export const signUpStore = (store: signUpStore) => {
  localStorage.setItem("User Detail", JSON.stringify(store));
  user.value = store
};
