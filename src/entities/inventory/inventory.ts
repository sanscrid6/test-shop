import {
  StoreWritable,
  createEvent,
  createStore,
  EventCallable,
} from "effector";
import { Item } from "../item";
import { $money, decreaseMoney, increaseMoney } from "../money";

type Grid = Array<Array<Item | null>>;

export class Inventory {
  public readonly $grid: StoreWritable<Grid>;

  private readonly setGrid: EventCallable<Grid>;

  constructor(
    public readonly isVendor: boolean,
    grid: Array<Array<Item | null>>,
  ) {
    this.$grid = createStore(grid);
    this.setGrid = createEvent<Grid>();
    this.$grid.on(this.setGrid, (_, data) => data);
  }

  sell(item: Item) {
    const grid = this.$grid.getState();

    try {
      const [i, j] = this.getIdxBy((cell) => cell?.id === item.id);
      grid[i][j] = null;

      !this.isVendor && increaseMoney(item.price);
      this.setGrid([...grid]);

      return true;
    } catch (error) {
      return false;
    }
  }

  swap(from: [number, number], to: [number, number]) {
    const grid = this.$grid.getState();

    [grid[from[0]][from[1]], grid[to[0]][to[1]]] = [
      grid[to[0]][to[1]],
      grid[from[0]][from[1]],
    ];

    this.setGrid([...grid]);
  }

  buy(item: Item) {
    if (!this.isVendor) {
      if (item.price > $money.getState()) {
        return false;
      }
      decreaseMoney(item.price);
    }

    try {
      const grid = this.$grid.getState();
      const [i, j] = this.getIdxBy((item) => !item);
      grid[i][j] = item;
      this.setGrid([...grid]);

      return true;
    } catch (error) {
      return false;
    }
  }

  getIdxBy(predicate: (item: Item | null) => boolean): [number, number] {
    const grid = this.$grid.getState();

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (predicate(grid[i][j])) {
          return [i, j];
        }
      }
    }

    throw new Error("cant find empty place");
  }
}
