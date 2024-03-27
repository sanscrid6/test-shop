import styles from "./grid.module.css";
import { Item } from "../../entities/item";
import GridItem from "../Item/Item";
import { useDroppable } from "@dnd-kit/core";
import { GridType } from "../../types";

type GridProps = {
  id: GridType;
  grid: Array<Array<Item | null>>;
};

function Grid({ grid, id }: GridProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className={styles.container} ref={setNodeRef}>
      {grid.flat().map((cell, index) => {
        return (
          <div key={index} className={styles.cell}>
            {cell && <GridItem {...cell} parentId={id} />}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
