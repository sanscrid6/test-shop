import styles from "./grid.module.css";
import { Item } from "../../entities/item";
import GridItem from "../Item/Item";
import { useDroppable } from "@dnd-kit/core";
import { GridType } from "../../types";

type GridProps = {
  id: GridType;
  grid: Array<Array<Item | null>>;
  overlayText?: string;
};

function Grid({ grid, id, overlayText }: GridProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className={styles.container}>
      {overlayText && <div className={styles.overlay}>{overlayText}</div>}
      <div className={styles.gridContainer} ref={setNodeRef}>
        {grid.flat().map((cell, index) => {
          return (
            <div key={index} className={styles.cell}>
              {cell && <GridItem {...cell} parentId={id} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
