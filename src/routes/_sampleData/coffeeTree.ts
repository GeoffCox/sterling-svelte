export type CoffeeNode = {
  name: string;
  children?: CoffeeNode[];
};

export const coffeeTree: CoffeeNode[] = [
  {
    name: 'Coffees',
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
    name: 'Add-ins',
    children: [
      {
        name: 'Milks',
        children: [
          { name: 'Almond mile' },
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
