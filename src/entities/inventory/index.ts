import { createStore } from "effector";
import { Inventory } from "./inventory";
import { items } from "../item";

const vendorGrid = [
  [items[2], items[3], items[4]],
  [items[5], null, null],
  [null, null, null],
];

const inventoryGrid = [
  [items[1], items[0], null],
  [null, null, null],
  [null, null, null],
];

export const $vendor = createStore(new Inventory(true, vendorGrid));
export const $inventory = createStore(new Inventory(false, inventoryGrid));
