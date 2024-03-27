import { DndContext, DragEndEvent } from "@dnd-kit/core";
import styles from "./app.module.css";
import Grid from "./components/Grid/Grid";
import MoneyCounter from "./components/MoneyCounter/MoneyCounter";
import { useStoreMap, useUnit } from "effector-react";
import { $inventory, $vendor } from "./entities/inventory";
import { GridType } from "./types";
import { DraggableItemPaylaod } from "./components/Item/Item";

function App() {
  const vendorGrid = useStoreMap($vendor, (state) => state.grid);
  const inventoryGrid = useStoreMap($inventory, (state) => state.grid);

  const vendor = useUnit($vendor);
  const inventory = useUnit($inventory);

  function onDragEnd(e: DragEndEvent) {
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

  return (
    <div className={styles.container}>
      <MoneyCounter />
      <div className={styles.gridContainer}>
        <DndContext onDragEnd={onDragEnd}>
          <Grid grid={inventoryGrid} id={GridType.Inventory} />
          <Grid grid={vendorGrid} id={GridType.Vendor} />
        </DndContext>
      </div>
    </div>
  );
}

export default App;
