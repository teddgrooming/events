import { products } from './products';

test('contains all 9 catalog products with required fields', () => {
  expect(products).toHaveLength(9);
  const names = products.map((p) => p.name);
  expect(names).toEqual([
    'Styling Clay',
    'Hair Mousse',
    'Grooming Fixer',
    'Classic Pomade',
    'Fixing Pomade Parfum',
    'Fixing Pomade Mixfruit',
    'Moisturizing Fixer',
    'Hair Spray',
    'Mattifying Dust',
  ]);
  products.forEach((p) => {
    expect(p.id).toBeTruthy();
    expect(p.meta).toBeTruthy();
    expect(p.scent).toBeTruthy();
    expect(p.accent).toMatch(/^#[0-9a-f]{6}$/i);
    expect(p.sizes.length).toBeGreaterThan(0);
  });
});

test('Styling Clay has two sizes: 60g and 120g', () => {
  const clay = products.find((p) => p.id === 'styling-clay');
  expect(clay?.sizes.map((s) => s.label)).toEqual(['60g', '120g']);
});
