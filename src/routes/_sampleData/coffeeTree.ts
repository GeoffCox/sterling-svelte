export type CoffeeItem = {
  name: string;
  children?: CoffeeItem[];
};

export const coffeeTree: CoffeeItem[] = [
  {
    name: 'Coffee',
    children: [
      {
        name: 'Americano'
      },
      {
        name: 'Brewed',
        children: [
          {
            name: 'Light roast'
          },
          {
            name: 'Medium roast'
          },
          {
            name: 'Dark roast'
          },
          {
            name: 'House blend'
          }
        ]
      },
      {
        name: 'Cappuccino'
      },
      {
        name: 'Espresso'
      },
      {
        name: 'Latte'
      },
      {
        name: 'Macchiato'
      },
      {
        name: 'Mochas',
        children: [
          {
            name: 'Dark Chocolate Mocha'
          },
          {
            name: 'White Chocolate Mocha'
          },
          {
            name: 'Peppermint Chocolate Mocha'
          }
        ]
      }
    ]
  },
  {
    name: 'Tea',
    children: [
      { name: 'Chai' },
      { name: 'Citrus Blend' },
      { name: 'Earl Grey' },
      { name: 'English Breakfast' },
      { name: 'Lavender' },
      { name: 'Lemon Ginger' },
      { name: 'Orange Spice' },
      { name: 'Matcha' },
      { name: 'Mint' }
    ]
  },
  {
    name: 'Add-ins',
    children: [
      {
        name: 'Milks',
        children: [
          { name: 'Almond Milk' },
          { name: 'Fat Free  Milk' },
          { name: 'Non-dairy Creamer' },
          { name: 'Soy Milk' },
          { name: 'Two percent Milk' },
          { name: 'Whole Milk' }
        ]
      },
      {
        name: 'Syrups',
        children: [
          { name: 'Almond syrup' },
          { name: 'Hazelnut syrup' },
          { name: 'Irish Creme syrup' },
          { name: 'Vanilla syrup' }
        ]
      },
      {
        name: 'Toppings',
        children: [{ name: 'Caramel' }, { name: 'Cinnamon' }, { name: 'Vanilla Flakes' }]
      }
    ]
  }
];
