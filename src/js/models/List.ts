interface Item {
  id: string;
  count: number;
  ingredient: string;
  unit: string;
}

export default class List {
  private items: Array<any>;

  constructor(items: Array<any>) {
    this.items = items;
  }

  getUniqId: Function = () =>
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9);

  addItems = (count: number, ingredient: string, unit: string) => {
    const item: Item = {
      id: this.getUniqId(),
      count,
      ingredient,
      unit
    };
    this.items.push(item);
    return item;
  };

  deleteItem = (id: string) => {
    const index = this.items.findIndex(el => el.id === id);
    this.items.splice(index, 1);
  };

  updateCount = (id: string, newCount: number) =>
    (this.items.find(el => el.id === id).count = newCount);
}
