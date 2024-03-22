import { signal } from "@preact/signals-react";

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
};
