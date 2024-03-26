import styles from "./app.module.css";
import Grid from "./components/Grid/Grid";
import MoneyCounter from "./components/MoneyCounter/MoneyCounter";

function App() {
  return (
    <div className={styles.container}>
      <MoneyCounter />
      <div className={styles.gridContainer}>
        <Grid />
        <Grid />
      </div>
    </div>
  );
}

export default App;
