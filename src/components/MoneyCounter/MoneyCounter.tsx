import { useUnit } from "effector-react";
import styles from "./counter.module.css";
import {
  $money,
  decreaseMoney,
  increaseMoney,
  setMoney,
} from "../../entities/money";
import { useRef } from "react";
import { clamp } from "../../utils/math-utils";

function MoneyCounter() {
  const money = useUnit($money);
  const ref = useRef<HTMLInputElement | null>(null);

  const delta = 10;

  function increaseHandler() {
    increaseMoney(delta);
  }

  function decreaseHandler() {
    decreaseMoney(delta);
  }

  function enterMoneyHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.toLowerCase() === "enter") {
      setMoney(clamp(+(ref.current?.value ?? 0), 0, 10000000));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.moneyContainer}>
        <div
          role="button"
          onClick={decreaseHandler}
          className={styles.minusButton}
        >
          -
        </div>
        <p>Money {money}</p>
        <div
          role="button"
          onClick={increaseHandler}
          className={styles.addButton}
        >
          +
        </div>
      </div>
      <input onKeyUp={enterMoneyHandler} type="number" ref={ref} />
    </div>
  );
}

export default MoneyCounter;
