import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import styles from "./app.module.css";
import Grid from "./components/Grid/Grid";
import MoneyCounter from "./components/MoneyCounter/MoneyCounter";
import { useStoreMap, useUnit } from "effector-react";
import { $inventory, $vendor } from "./entities/inventory";
import { GridType } from "./types";
import { DraggableItemPaylaod } from "./components/Item/Item";
import { useState } from "react";
import { Item } from "./entities/item";

function App() {
  const vendorGrid = useStoreMap($vendor, (state) => state.grid);
  const inventoryGrid = useStoreMap($inventory, (state) => state.grid);

  const vendor = useUnit($vendor);
  const inventory = useUnit($inventory);

  const [currentItem, setCurrentItem] = useState<{
    item: Item;
    parentId: GridType;
  } | null>(null);
  const [overlay, setOverlay] = useState<GridType | null>(null);

  function onDragEndHandler(e: DragEndEvent) {
    setCurrentItem(null);

    if (!e.over) return;

    const data = e.active.data.current as DraggableItemPaylaod;

    if (e.over.id === data.parentId) return;

    if (e.over.id === GridType.Inventory) {
      const item = vendorGrid.flat().find((cell) => cell?.id === e.active.id);
      if (!item) return;

      if (inventory.buy(item)) {
        vendor.sell(item);
      }
    }

    if (e.over.id === GridType.Vendor) {
      const item = inventoryGrid
        .flat()
        .find((cell) => cell?.id === e.active.id);
      if (!item) return;

      if (inventory.sell(item)) {
        vendor.buy(item);
      }
    }
  }

  function onDragStartHandler(e: DragStartEvent) {
    const item = [...vendorGrid.flat(), ...inventoryGrid.flat()].find(
      (cell) => cell?.id === e.active.id,
    ) as Item;
    const parentId = (e.active.data.current as DraggableItemPaylaod).parentId;
    setCurrentItem({ item, parentId });
  }

  function onDragOverHandler(e: DragOverEvent) {
    if (e.over) {
      setOverlay(e.over.id as GridType);
    } else {
      setOverlay(null);
    }
  }

  return (
    <div className={styles.container}>
      <MoneyCounter />
      <div className={styles.gridContainer}>
        <DndContext
          onDragEnd={onDragEndHandler}
          onDragOver={onDragOverHandler}
          onDragStart={onDragStartHandler}
        >
          <Grid
            grid={inventoryGrid}
            id={GridType.Inventory}
            overlayText={
              overlay === GridType.Inventory &&
              currentItem?.parentId === GridType.Vendor
                ? `Buy ${currentItem?.item.name} for ${currentItem?.item.price} $`
                : undefined
            }
          />
          <Grid
            grid={vendorGrid}
            id={GridType.Vendor}
            overlayText={
              overlay === GridType.Vendor &&
              currentItem?.parentId === GridType.Inventory
                ? `Sell ${currentItem?.item.name} for ${currentItem?.item.price} $`
                : undefined
            }
          />
        </DndContext>
      </div>
    </div>
  );
}

export default App;
