import { Item } from "../item";
import { $money, decreaseMoney, increaseMoney } from "../money";

export class Inventory {
  constructor(
    public readonly isVendor: boolean,
    public grid: Array<Array<Item | null>>,
  ) {}

  //   public readonly grid: Array<Array<Item | null>> = [
  //     [null, null, null],
  //     [null, null, null],
  //     [null, null, null],
  //   ];

  sell(item: Item) {
    const grid = this.grid;

    try {
      const [i, j] = this.getBy((cell) => cell?.id === item.id);
      grid[i][j] = null;

      !this.isVendor && increaseMoney(item.price);

      return true;
    } catch (error) {
      return false;
    }
  }

  buy(item: Item) {
    if (!this.isVendor) {
      if (item.price > $money.getState()) {
        return false;
      }
      decreaseMoney(item.price);
    }

    try {
      const [i, j] = this.getBy((item) => !item);
      this.grid[i][j] = item;

      return true;
    } catch (error) {
      return false;
    }
  }

  private getBy(predicate: (item: Item | null) => boolean) {
    const grid = this.grid;

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
