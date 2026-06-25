export type ProductSize = { label: string; image: number };

export type Product = {
  id: string;
  name: string;
  meta: string;
  scent: string;
  accent: string;
  sizes: ProductSize[];
};

export const products: Product[] = [
  {
    id: 'styling-clay',
    name: 'Styling Clay',
    meta: 'Firm Hold · Natural Finish',
    scent: 'Vanilla Musk Scent',
    accent: '#c8a84b',
    sizes: [
      { label: '60g', image: require('../../assets/products/styling-clay-60g.png') },
      { label: '120g', image: require('../../assets/products/styling-clay-120g.png') },
    ],
  },
  {
    id: 'hair-mousse',
    name: 'Hair Mousse',
    meta: 'Medium Hold · Wet Finish',
    scent: 'Parfum Scent',
    accent: '#1dd4c4',
    sizes: [
      { label: '160ml', image: require('../../assets/products/hair-mousse-160ml.png') },
    ],
  },
  {
    id: 'grooming-fixer',
    name: 'Grooming Fixer',
    meta: 'Light Hold · Natural Finish',
    scent: 'Apple Spearmint',
    accent: '#27ae60',
    sizes: [
      { label: '120ml', image: require('../../assets/products/grooming-fixer-120ml.png') },
      { label: '250ml', image: require('../../assets/products/grooming-fixer-250ml.png') },
    ],
  },
  {
    id: 'classic-pomade',
    name: 'Classic Pomade',
    meta: 'Control Hold · High Shine',
    scent: 'Grapeberry Scent',
    accent: '#c0392b',
    sizes: [
      { label: '60g', image: require('../../assets/products/pomade-classic-60g.png') },
      { label: '150g', image: require('../../assets/products/pomade-classic-150g.png') },
    ],
  },
  {
    id: 'fixing-pomade-parfum',
    name: 'Fixing Pomade Parfum',
    meta: 'Strong Hold · Medium Shine',
    scent: 'Parfum Scent',
    accent: '#1dd4c4',
    sizes: [
      { label: '60g', image: require('../../assets/products/pomade-fiber-parfum-60g.png') },
      { label: '150g', image: require('../../assets/products/pomade-fiber-parfum-150g.png') },
    ],
  },
  {
    id: 'fixing-pomade-mixfruit',
    name: 'Fixing Pomade Mixfruit',
    meta: 'Medium Hold · Medium Shine',
    scent: 'Mix Fruit Scent',
    accent: '#e67e22',
    sizes: [
      { label: '60g', image: require('../../assets/products/pomade-fiber-mixfruit-60g.png') },
      { label: '150g', image: require('../../assets/products/pomade-fiber-mixfruit-150g.png') },
    ],
  },
  {
    id: 'moisturizing-fixer',
    name: 'Moisturizing Fixer',
    meta: 'Silky · Wet Finish',
    scent: 'Appleberry Scent',
    accent: '#c4527a',
    sizes: [
      { label: '150ml', image: require('../../assets/products/moisturizing-fixer-150ml.png') },
    ],
  },
  {
    id: 'hair-spray',
    name: 'Hair Spray',
    meta: 'Strong Hold · High Shine',
    scent: 'Parfum Scent',
    accent: '#1dd4c4',
    sizes: [
      { label: '420ml', image: require('../../assets/products/hairspray-420ml.png') },
    ],
  },
  {
    id: 'mattifying-dust',
    name: 'Mattifying Dust',
    meta: 'Firm Hold · Matte Finish',
    scent: 'Vanilla Scent',
    accent: '#e2d4a8',
    sizes: [
      { label: '25g', image: require('../../assets/products/mattifying-dust-25g.png') },
    ],
  },
];
