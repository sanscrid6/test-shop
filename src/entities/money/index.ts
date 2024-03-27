import { createEvent, createStore } from "effector";

export const $money = createStore<number>(100);
export const increaseMoney = createEvent<number>();
export const decreaseMoney = createEvent<number>();
export const setMoney = createEvent<number>();

$money
  .on(increaseMoney, (state, data) => state + data)
  .on(decreaseMoney, (state, data) => (state - data < 0 ? 0 : state - data))
  .on(setMoney, (_, data) => data);
