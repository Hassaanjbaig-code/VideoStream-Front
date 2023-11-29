import { computed, signal } from "@preact/signals-react";


export const user = signal(localStorage.getItem("User Detail") || null)
export const isLoggedIn = computed(() => {
    return user.value !== null 
})

