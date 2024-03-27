import { useDroppable } from "@dnd-kit/core";
import { Item } from "../../entities/item";
import { GridType } from "../../types";
import GridItem from "../Item/Item";
import styles from "./cell.module.css";

type CellProps = {
  cell: Item | null;
  parentId: GridType;
  index: number;
};

function Cell({ cell, parentId, index }: CellProps) {
  const { setNodeRef } = useDroppable({ id: `${parentId}-${index}` });

  return (
    <div className={styles.cell} ref={setNodeRef}>
      {cell && <GridItem {...cell} parentId={parentId} />}
    </div>
  );
}

export default Cell;
