import styles from "./item.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "../../entities/item";
import { GridType } from "../../types";

type GridItemProps = Item & {
  parentId: GridType;
};

export type DraggableItemPaylaod = {
  parentId: GridType;
};

function GridItem({ id, image, parentId }: GridItemProps) {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id,
    data: {
      parentId,
    },
  });

  const scale = 1.1;

  if (transform) {
    transform.scaleX = scale;
    transform.scaleY = scale;
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    //transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0) scaleX(3.075) scaleY(3.075)`,
  };

  return (
    <div
      className={styles.item}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img src={image} className={styles.image} />
    </div>
  );
}

export default GridItem;
