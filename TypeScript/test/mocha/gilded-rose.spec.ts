import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';


describe('Normal Item', () => {
  it('should decrease one nonspecial case', () => {
    const gildedRose = new GildedRose([new Item('foo', 2, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
    expect(items[0].sellIn).to.equal(1);
  });
  it('quality always larger than 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(1);
  });
  it('quality decrease by 1 as fast at 1', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(5);
    expect(items[0].sellIn).to.equal(0);
  });

  it('quality decrease twice as fast at 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
    expect(items[0].sellIn).to.equal(-1);
  });
  it('quality decrease twice as fast at -1', () => {
    const gildedRose = new GildedRose([new Item('foo', -1, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
    expect(items[0].sellIn).to.equal(-2);
  });

});


describe('Sulfuras', () => {
  it('should stay same negative', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(-1);
  });
  it('should stay same zero', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(0);
  });
  it('should stay same positive', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(1);
  });


});

describe('Aged_Brie', () => {
  it('should inc one nonspecial case', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(31);
    expect(items[0].sellIn).to.equal(1);
  });
  it('should inc twice  at 0', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
    expect(items[0].sellIn).to.equal(-1);
  });
  it('should inc twice  at -1', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -1, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
    expect(items[0].sellIn).to.equal(-2);
  });

  it('should not exceed 50 1', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(-2);
  });

  it('should not exceed 50 2', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(-2);
  });

  it('should not exceed 50 3', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(1);
  });




});

describe('Backstage', () => {
  it('sellin 1 should be increase by 3', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 1, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(33);
    expect(items[0].sellIn).to.equal(0);
  });
  it('sellin 0 should be 0', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-1);
  });
  it('selling 11 increase by 1', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(31);
    expect(items[0].sellIn).to.equal(10);
  });

  it('selling 10 increase by 2', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
    expect(items[0].sellIn).to.equal(9);
  });

  it('selling 6 increase by 2', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
    expect(items[0].sellIn).to.equal(5);
  });

  it('selling 5 increase by 3', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(33);
    expect(items[0].sellIn).to.equal(4);
  });

  it('selling 30  increase by 1 dont exceed 50', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 30, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(29);
  });

});


describe('Conjured Mana Cake', () => {

  it('selling 30  decrease by 2', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 30, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(23);
    expect(items[0].sellIn).to.equal(29);
  });

  it('selling 1  decrease by 2 dont go below 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(0);
  });

  it('selling 0  decrease by 4', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
    expect(items[0].sellIn).to.equal(-1);
  });

  it('selling -1  decrease by 4', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -1, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
    expect(items[0].sellIn).to.equal(-2);
  });

  it('selling -1  decrease by 4 dont go below 0 case 1', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-2);
  });

  it('selling -1  decrease by 4 dont go below 0 case 2', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-2);
  });

  it('selling -1  decrease by 4 dont go below 0 case 3', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-2);
  });


});
