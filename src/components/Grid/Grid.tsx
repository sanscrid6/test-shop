import styles from "./grid.module.css";
import { Item } from "../../entities/item";
import { GridType } from "../../types";
import Cell from "../cell/Cell";

type GridProps = {
  id: GridType;
  grid: Array<Array<Item | null>>;
  overlayText?: string;
};

function Grid({ grid, id, overlayText }: GridProps) {
  return (
    <div className={styles.container}>
      {overlayText && <div className={styles.overlay}>{overlayText}</div>}
      <div className={styles.gridContainer}>
        {grid.flat().map((cell, index) => {
          return <Cell key={index} cell={cell} parentId={id} index={index} />;
        })}
      </div>
    </div>
  );
}

export default Grid;
