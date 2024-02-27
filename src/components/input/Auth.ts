import { computed, signal } from "@preact/signals-react";

interface sign {
        token: string | undefined;
        channel: { status: Number; message: String };
}

// Function to update the user signal

const storedUserDetail = localStorage.getItem("User Detail");

// Parse the stored user detail or set it to undefined
const parsedUserDetail: sign = storedUserDetail
  ? JSON.parse(storedUserDetail)
  : { signCon: undefined };

export const user = signal<sign | undefined>(parsedUserDetail);

export const updateUser = (newUserDetail: undefined) => {
  user.value = newUserDetail;
  localStorage.removeItem("User Detail")
};

export const isLoggedIn = computed(() => {
  return user.value !== undefined;
});

// Function to logout (set user to undefined)
export const logout = () => {
  updateUser(undefined);
};

// Example of logging out
// Call this function whenever you want to log out the user
// logout();
