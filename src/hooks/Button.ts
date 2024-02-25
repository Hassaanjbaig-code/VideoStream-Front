import { signal } from "@preact/signals-react";
import React from "react";

export let buttonValue = signal<String | undefined>("");

export function EventHandlerButton(name: string | undefined): void {
    switch (name) {
        case "Like":
          Like();
          break;
        case "Subscribe":
          Subscribe();
          break;
        case "Dislike":
          Dislike();
          break;
        default:
          break;
      }
}

function Like() {
  console.log("Function of Like");
}

function Subscribe() {
  console.log("Function of Subscribe");
}
function Dislike() {
  console.log("Function of Dislike");
}
