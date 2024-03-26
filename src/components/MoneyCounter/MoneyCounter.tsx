import { useUnit } from "effector-react";
import styles from "./counter.module.css";
import { $money, decreaseMoney, increaseMoney } from "../../entities/money";

function MoneyCounter() {
  const money = useUnit($money);
  const delta = 10;

  function increaseHandler() {
    increaseMoney(delta);
  }

  function decreaseHandler() {
    decreaseMoney(delta);
  }

  return (
    <div className={styles.container}>
      <div
        role="button"
        onClick={decreaseHandler}
        className={styles.minusButton}
      >
        -
      </div>
      <p>{money}</p>
      <div role="button" onClick={increaseHandler} className={styles.addButton}>
        +
      </div>
    </div>
  );
}

export default MoneyCounter;
