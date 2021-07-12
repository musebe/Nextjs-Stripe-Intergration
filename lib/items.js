import { atom } from "recoil";

// Create a new recoil.js atom to keep track of the items in our cart
export const cartState = atom({
  key: "cartState",
  default: [],
});
