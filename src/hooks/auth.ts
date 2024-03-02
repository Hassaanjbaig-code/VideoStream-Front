import { useLogInMutation } from "../redux/FetchApi/SignIn/SignIn";
import { signal } from "@preact/signals-react";
import { SignInRequest } from "../vite-env";

export const isSign = signal<boolean>(false);

export async function AuthChecker({
  email,
  password,
}: SignInRequest): Promise<any> {
  const [logIn] = useLogInMutation();
  // await logIn({ email, password });
  // if(isLoading) return {data, isSign, isLoading}
  // if (isSuccess && isError == false) {
  //   isSign.value = true;
  //   localStorage.setItem("User Detail", JSON.stringify(data));
  //   return {
  //       data,
  //       isSign,
  //       isLoading
  //   };
  // } else {
  //   isSign.value = false;
  //   return {
  //     error,
  //     isSign,
  //     isLoading
  //   };
  // }
  try {
    const { data } = await logIn({ email, password });
    // Process data and return appropriate values
    localStorage.setItem("User Detail", JSON.stringify(data));
    return {
      data,
      isSign: true,
      isLoading: false,
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      error,
      isSign: false,
      isLoading: false,
    };
  }
}
