export type ShowcaseProduct = {
  id: string;
  name: string;
  meta: string;
  scent: string;
  accent: string;
  image: string;
};

// Mirrors app/src/data/products.ts — using the largest size's image for each product.
export const products: ShowcaseProduct[] = [
  {
    id: 'styling-clay',
    name: 'Styling Clay',
    meta: 'Firm Hold · Natural Finish',
    scent: 'Vanilla Musk Scent',
    accent: '#c8a84b',
    image: 'products/styling-clay-120g.png',
  },
  {
    id: 'hair-mousse',
    name: 'Hair Mousse',
    meta: 'Medium Hold · Wet Finish',
    scent: 'Parfum Scent',
    accent: '#1dd4c4',
    image: 'products/hair-mousse-160ml.png',
  },
  {
    id: 'grooming-fixer',
    name: 'Grooming Fixer',
    meta: 'Light Hold · Natural Finish',
    scent: 'Apple Spearmint',
    accent: '#27ae60',
    image: 'products/grooming-fixer-250ml.png',
  },
  {
    id: 'classic-pomade',
    name: 'Classic Pomade',
    meta: 'Control Hold · High Shine',
    scent: 'Grapeberry Scent',
    accent: '#c0392b',
    image: 'products/pomade-classic-150g.png',
  },
  {
    id: 'fixing-pomade-parfum',
    name: 'Fixing Pomade Parfum',
    meta: 'Strong Hold · Medium Shine',
    scent: 'Parfum Scent',
    accent: '#1dd4c4',
    image: 'products/pomade-fiber-parfum-150g.png',
  },
  {
    id: 'fixing-pomade-mixfruit',
    name: 'Fixing Pomade Mixfruit',
    meta: 'Medium Hold · Medium Shine',
    scent: 'Mix Fruit Scent',
    accent: '#e67e22',
    image: 'products/pomade-fiber-mixfruit-150g.png',
  },
  {
    id: 'moisturizing-fixer',
    name: 'Moisturizing Fixer',
    meta: 'Silky · Wet Finish',
    scent: 'Appleberry Scent',
    accent: '#c4527a',
    image: 'products/moisturizing-fixer-150ml.png',
  },
  {
    id: 'hair-spray',
    name: 'Hair Spray',
    meta: 'Strong Hold · High Shine',
    scent: 'Parfum Scent',
    accent: '#1dd4c4',
    image: 'products/hairspray-420ml.png',
  },
  {
    id: 'mattifying-dust',
    name: 'Mattifying Dust',
    meta: 'Firm Hold · Matte Finish',
    scent: 'Vanilla Scent',
    accent: '#e2d4a8',
    image: 'products/mattifying-dust-25g.png',
  },
];
