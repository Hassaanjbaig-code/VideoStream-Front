import { useLogInMutation } from "../redux/FetchApi/SignIn/SignIn";
import { signal } from "@preact/signals-react";
import { SignInRequest } from "../vite-env";

export const isSign = signal<boolean>(false);

export async function AuthChecker({ email, password }: SignInRequest) {
  const [logIn, { isSuccess, isError, data, error }] = useLogInMutation();
  await logIn({ email, password });
  if (isSuccess && isError == false) {
    isSign.value = true;
    let store = {
      token: data?.data?.token,
      channel: data?.data?.channel,
    };
    localStorage.setItem("User Detail", JSON.stringify(store));
    return {
        data,
        isSign
    };
  } else {
    isSign.value = false;
    return {
      error,
      isSign,
    };
  }
}
