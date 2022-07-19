import { isThisTypeNode } from "typescript";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn; // number of days to sell
    this.quality = quality;
  }
}



export class Item_Wrapper {
  item: Item;
  constructor(item) {
    this.item = item;
  
  }
  public update(multiplier = -1): void {
    
    this.item.sellIn -= 1;
    // decrease 2 if item is expired else 1
    const amount = this.item.sellIn >= 0 ? 1 : 2;
    // default is to decrease by amount
    this.item.quality += multiplier * amount;
    
    // quality never negative
    this.item.quality = Math.max(0, this.item.quality);
    // quality exceeds 50
    this.item.quality = Math.min(50, this.item.quality);

  }
}

export class Aged_Brie extends Item_Wrapper {

  public update(): void {
    super.update(1);
  }

}

export class Sulfuras extends Item_Wrapper {
  
  public update(): void {
    //do nothing
    ;
  }
}

export class Backstage extends Item_Wrapper {

  public update(): void {
    if (this.item.sellIn <= 0){
      this.item.quality = 0;
    }
    else if (this.item.sellIn < 6) {
      this.item.quality += 3;
    }
    else if (this.item.sellIn < 11) {
      this.item.quality += 2;
    }
    else{
      this.item.quality += 1;
    }
    this.item.sellIn -= 1;
    this.item.quality = Math.min(50, this.item.quality);
  }
}

export class Conjured extends Item_Wrapper {

  public update(): void {
    super.update(-2);
  }
}

export class GildedRose {
  items: Array<Item>;

  modified_items: Array<Item_Wrapper>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.modified_items = Array<Item_Wrapper>();

    for (let i = 0; i < items.length; i ++){

      let modified_item: Item_Wrapper;

      if (this.items[i].name === 'Aged Brie'){
        modified_item = new Aged_Brie(this.items[i]);
      }
      else if (this.items[i].name === 'Sulfuras, Hand of Ragnaros'){
        modified_item = new Sulfuras(this.items[i]);
      }
      else if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert'){
        modified_item = new Backstage(this.items[i]);
      }
      else if (this.items[i].name === 'Conjured Mana Cake'){
        modified_item = new Conjured(this.items[i]);
      }
      else{
        modified_item = new Item_Wrapper(this.items[i]);
      }

      this.modified_items.push(modified_item);
    }
  }
  updateQuality(){
    // apply polymorphism
    for (let i = 0; i < this.modified_items.length; i++) {
      this.modified_items[i].update();
    }
    return this.items;
  }
}
