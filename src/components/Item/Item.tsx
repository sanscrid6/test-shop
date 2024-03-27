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
  const { setNodeRef, attributes, listeners, transform, active } = useDraggable(
    {
      id,
      data: {
        parentId,
      },
    },
  );

  const scale = 1.1;

  if (transform) {
    transform.scaleX = scale;
    transform.scaleY = scale;
  }

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    position: "absolute",
    zIndex: active?.id === id ? 100 : 1,
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
