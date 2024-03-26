import styles from "./grid.module.css";

function Grid() {
  const items = new Array(9).fill({});

  return (
    <div className={styles.container}>
      {items.map((cell) => {
        return <div className={styles.cell}></div>;
      })}
    </div>
  );
}

export default Grid;
