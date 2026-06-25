# Tedd Grooming Companion App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React Native (Expo) companion app for Tedd Grooming with three tabs — Home, Catalog, Connect — backed by static product data mirrored from `shop/TEDD CATALOG.html`.

**Architecture:** A standalone Expo TypeScript project under `app/`, independent of the existing static HTML site. Bottom-tab navigation (React Navigation) with four screens (Home, Catalog, Product Detail, Connect). All product data is a static typed array in `src/data/products.ts`. No backend, no state management library — local component state only (current size selection per product).

**Tech Stack:** Expo SDK (managed workflow), TypeScript, React Navigation (`@react-navigation/native` + `@react-navigation/bottom-tabs` + `@react-navigation/native-stack`), Jest + `@testing-library/react-native` for tests.

## Global Constraints

- No cart/checkout/payments, no backend/API, no push notifications, no booking (per spec's "Out of scope").
- No physical store address/hours screen — third tab is "Connect" (social/marketplace links only).
- Dark theme: background `#080808`, gold accent `#c8a84b`.
- Fonts: Oswald (headings/labels), Inter (body), with system-font fallback.
- Product data and images are static/local, copied from `shop/` — no network calls for catalog data.
- Failed `Linking.openURL` calls are caught and ignored silently (no in-app error UI).
- This machine does not have Node.js/npm installed during plan authoring. Every "Run" step below must be executed by the user (or a future session) after installing Node.js — do not claim a step passed without actually seeing the output.

---

## File Structure

```
app/
  App.tsx
  app.json
  package.json
  tsconfig.json
  jest.config.js
  babel.config.js
  src/
    theme.ts
    data/
      products.ts
      products.test.ts
    navigation/
      RootNavigator.tsx
    screens/
      HomeScreen.tsx
      HomeScreen.test.tsx
      CatalogScreen.tsx
      CatalogScreen.test.tsx
      ProductDetailScreen.tsx
      ProductDetailScreen.test.tsx
      ConnectScreen.tsx
      ConnectScreen.test.tsx
  assets/
    logo.png
    products/
      styling-clay-60g.png
      styling-clay-120g.png
      hair-mousse-160ml.png
      grooming-fixer-120ml.png
      grooming-fixer-250ml.png
      pomade-classic-60g.png
      pomade-classic-150g.png
      pomade-fiber-parfum-60g.png
      pomade-fiber-parfum-150g.png
      pomade-fiber-mixfruit-60g.png
      pomade-fiber-mixfruit-150g.png
      moisturizing-fixer-150ml.png
      hairspray-420ml.png
      mattifying-dust-25g.png
```

---

### Task 1: Scaffold Expo project

**Files:**
- Create: `app/package.json`
- Create: `app/app.json`
- Create: `app/tsconfig.json`
- Create: `app/babel.config.js`
- Create: `app/App.tsx`

**Interfaces:**
- Produces: a runnable Expo project at `app/` with TypeScript configured. Later tasks add screens/navigation under `app/src/`.

- [ ] **Step 1: Create `app/package.json`**

```json
{
  "name": "tedd-grooming-app",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest"
  },
  "dependencies": {
    "expo": "~51.0.0",
    "expo-status-bar": "~1.12.1",
    "react": "18.2.0",
    "react-native": "0.74.5",
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/bottom-tabs": "^6.5.20",
    "@react-navigation/native-stack": "^6.9.26",
    "react-native-screens": "~3.31.1",
    "react-native-safe-area-context": "4.10.5",
    "@expo-google-fonts/oswald": "^0.2.3",
    "@expo-google-fonts/inter": "^0.2.3",
    "expo-font": "~12.0.10"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@testing-library/react-native": "^12.5.2",
    "@types/react": "~18.2.79",
    "jest": "^29.7.0",
    "jest-expo": "~51.0.3",
    "typescript": "~5.3.3",
    "react-test-renderer": "18.2.0"
  },
  "jest": {
    "preset": "jest-expo"
  },
  "private": true
}
```

- [ ] **Step 2: Create `app/app.json`**

```json
{
  "expo": {
    "name": "Tedd Grooming",
    "slug": "tedd-grooming-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/logo.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/logo.png",
      "resizeMode": "contain",
      "backgroundColor": "#080808"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "com.teddgrooming.app"
    }
  }
}
```

- [ ] **Step 3: Create `app/tsconfig.json`**

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
```

- [ ] **Step 4: Create `app/babel.config.js`**

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

- [ ] **Step 5: Create placeholder `app/App.tsx`**

```tsx
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#080808', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="light" />
      <Text style={{ color: '#c8a84b' }}>Tedd Grooming</Text>
    </View>
  );
}
```

- [ ] **Step 6: Install dependencies**

Run (in `app/`): `npm install`
Expected: install completes with no errors; `node_modules/` created.

- [ ] **Step 7: Verify the app boots**

Run (in `app/`): `npx expo start --web`
Expected: dev server starts and the web preview shows "Tedd Grooming" text on a black background.

- [ ] **Step 8: Commit**

```bash
git add app/package.json app/app.json app/tsconfig.json app/babel.config.js app/App.tsx
git commit -m "feat: scaffold Expo project for Tedd Grooming app"
```

---

### Task 2: Theme constants

**Files:**
- Create: `app/src/theme.ts`

**Interfaces:**
- Produces: `colors` object (`background`, `gold`, `textPrimary`, `textSecondary`) and `fonts` object (`heading`, `body`) — consumed by every screen task below.

- [ ] **Step 1: Create `app/src/theme.ts`**

```ts
export const colors = {
  background: '#080808',
  gold: '#c8a84b',
  textPrimary: '#eeeeee',
  textSecondary: '#888888',
  cardBackground: 'rgba(255,255,255,0.03)',
  cardBorder: 'rgba(255,255,255,0.07)',
};

export const fonts = {
  heading: 'Oswald_600SemiBold',
  body: 'Inter_400Regular',
};
```

- [ ] **Step 2: Commit**

```bash
git add app/src/theme.ts
git commit -m "feat: add shared theme constants"
```

---

### Task 3: Product data

**Files:**
- Create: `app/src/data/products.ts`
- Test: `app/src/data/products.test.ts`
- Copy: 14 product images from `shop/images/` into `app/assets/products/` (same filenames), plus `shop/images/tedd-logo.png` into `app/assets/logo.png`

**Interfaces:**
- Produces:
  ```ts
  type ProductSize = { label: string; image: number };
  type Product = {
    id: string;
    name: string;
    meta: string;
    scent: string;
    accent: string;
    sizes: ProductSize[];
  };
  export const products: Product[];
  ```
  Consumed by `CatalogScreen`, `ProductDetailScreen`, and `RootNavigator`.

- [ ] **Step 1: Copy image assets**

Run:
```bash
mkdir -p app/assets/products
cp shop/images/tedd-logo.png app/assets/logo.png
cp shop/images/styling-clay-60g.png shop/images/styling-clay-120g.png \
   shop/images/hair-mousse-160ml.png \
   shop/images/grooming-fixer-120ml.png shop/images/grooming-fixer-250ml.png \
   shop/images/pomade-classic-60g.png shop/images/pomade-classic-150g.png \
   shop/images/pomade-fiber-parfum-60g.png shop/images/pomade-fiber-parfum-150g.png \
   shop/images/pomade-fiber-mixfruit-60g.png shop/images/pomade-fiber-mixfruit-150g.png \
   shop/images/moisturizing-fixer-150ml.png \
   shop/images/hairspray-420ml.png \
   shop/images/mattifying-dust-25g.png \
   app/assets/products/
```
Expected: 14 files now exist in `app/assets/products/`, 1 file at `app/assets/logo.png`.

- [ ] **Step 2: Write the failing test**

```ts
// app/src/data/products.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd app && npx jest src/data/products.test.ts`
Expected: FAIL — `Cannot find module './products'`

- [ ] **Step 3: Write minimal implementation**

```ts
// app/src/data/products.ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd app && npx jest src/data/products.test.ts`
Expected: PASS — 2 passed

- [ ] **Step 5: Commit**

```bash
git add app/assets/logo.png app/assets/products app/src/data/products.ts app/src/data/products.test.ts
git commit -m "feat: add static product catalog data and assets"
```

---

### Task 4: Connect screen (social/marketplace links)

**Files:**
- Create: `app/src/screens/ConnectScreen.tsx`
- Test: `app/src/screens/ConnectScreen.test.tsx`

**Interfaces:**
- Consumes: `colors`, `fonts` from `../theme`
- Produces: `export default function ConnectScreen(): JSX.Element` — a screen component mounted by `RootNavigator` (Task 6) under the "Connect" tab.

- [ ] **Step 1: Write the failing test**

```tsx
// app/src/screens/ConnectScreen.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import * as Linking from 'expo-linking';
import ConnectScreen from './ConnectScreen';

jest.mock('expo-linking', () => ({ openURL: jest.fn(() => Promise.resolve()) }));

test('renders all 7 connect links', () => {
  const { getByText } = render(<ConnectScreen />);
  ['TikTok', 'Instagram', 'YouTube', 'Facebook', 'WhatsApp', 'Shopee', 'Lazada', 'Website'].forEach(
    (label) => expect(getByText(label)).toBeTruthy()
  );
});

test('tapping Website opens the correct URL', () => {
  const { getByText } = render(<ConnectScreen />);
  fireEvent.press(getByText('Website'));
  expect(Linking.openURL).toHaveBeenCalledWith('https://www.teddgrooming.com');
});

test('tapping WhatsApp opens the correct URL', () => {
  const { getByText } = render(<ConnectScreen />);
  fireEvent.press(getByText('WhatsApp'));
  expect(Linking.openURL).toHaveBeenCalledWith('https://wa.me/601164008983');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd app && npx jest src/screens/ConnectScreen.test.tsx`
Expected: FAIL — `Cannot find module './ConnectScreen'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// app/src/screens/ConnectScreen.tsx
import * as Linking from 'expo-linking';
import { Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

type LinkItem = { label: string; url: string };

const links: LinkItem[] = [
  { label: 'TikTok', url: 'https://www.tiktok.com/@teddgrooming' },
  { label: 'Instagram', url: 'https://www.instagram.com/teddgrooming/' },
  { label: 'YouTube', url: 'https://www.youtube.com/@thegainculture' },
  { label: 'Facebook', url: 'https://www.facebook.com/teddgroomingcompany/' },
  { label: 'WhatsApp', url: 'https://wa.me/601164008983' },
  { label: 'Shopee', url: 'https://shopee.com.my/teddgrooming' },
  { label: 'Lazada', url: 'https://www.lazada.com.my/jtaoffmk/?q=All-Products&from=wangpu&langFlag=en&pageTypeId=2' },
  { label: 'Website', url: 'https://www.teddgrooming.com' },
];

function openLink(url: string) {
  Linking.openURL(url).catch(() => {});
}

export default function ConnectScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {links.map((link) => (
        <Pressable key={link.label} style={styles.button} onPress={() => openLink(link.url)}>
          <Text style={styles.label}>{link.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 10 },
  button: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  label: {
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
```

- [ ] **Step 4: Install `expo-linking` if missing**

Run: `cd app && npm install expo-linking`
Expected: added to `package.json` dependencies.

- [ ] **Step 5: Run test to verify it passes**

Run: `cd app && npx jest src/screens/ConnectScreen.test.tsx`
Expected: PASS — 3 passed

- [ ] **Step 6: Commit**

```bash
git add app/src/screens/ConnectScreen.tsx app/src/screens/ConnectScreen.test.tsx app/package.json app/package-lock.json
git commit -m "feat: add Connect screen with social/marketplace links"
```

---

### Task 5: Catalog screen

**Files:**
- Create: `app/src/screens/CatalogScreen.tsx`
- Test: `app/src/screens/CatalogScreen.test.tsx`

**Interfaces:**
- Consumes: `products` from `../data/products`; `colors`, `fonts` from `../theme`; navigation prop typed as `{ navigation: { navigate: (screen: 'ProductDetail', params: { id: string }) => void } }`
- Produces: `export default function CatalogScreen({ navigation }): JSX.Element`, and a per-card size toggle that updates the displayed image without navigating.

- [ ] **Step 1: Write the failing test**

```tsx
// app/src/screens/CatalogScreen.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import CatalogScreen from './CatalogScreen';

test('renders a card for every product', () => {
  const navigate = jest.fn();
  const { getByText } = render(<CatalogScreen navigation={{ navigate }} />);
  expect(getByText('Styling Clay')).toBeTruthy();
  expect(getByText('Mattifying Dust')).toBeTruthy();
});

test('tapping a product card navigates to ProductDetail with its id', () => {
  const navigate = jest.fn();
  const { getByText } = render(<CatalogScreen navigation={{ navigate }} />);
  fireEvent.press(getByText('Hair Spray'));
  expect(navigate).toHaveBeenCalledWith('ProductDetail', { id: 'hair-spray' });
});

test('tapping a size pill does not navigate', () => {
  const navigate = jest.fn();
  const { getByText } = render(<CatalogScreen navigation={{ navigate }} />);
  fireEvent.press(getByText('120g'));
  expect(navigate).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd app && npx jest src/screens/CatalogScreen.test.tsx`
Expected: FAIL — `Cannot find module './CatalogScreen'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// app/src/screens/CatalogScreen.tsx
import { useState } from 'react';
import { FlatList, Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { products } from '../data/products';
import { colors, fonts } from '../theme';

type Props = {
  navigation: { navigate: (screen: 'ProductDetail', params: { id: string }) => void };
};

export default function CatalogScreen({ navigation }: Props) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<Record<string, number>>({});

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={products}
      keyExtractor={(p) => p.id}
      renderItem={({ item }) => {
        const sizeIndex = selectedSizeIndex[item.id] ?? 0;
        return (
          <Pressable
            style={[styles.card, { borderColor: item.accent }]}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
          >
            <Image source={item.sizes[sizeIndex].image} style={styles.image} resizeMode="contain" />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.meta}</Text>
            <Text style={[styles.badge, { color: item.accent, borderColor: item.accent }]}>{item.scent}</Text>
            <View style={styles.sizes}>
              {item.sizes.map((size, index) => (
                <Pressable
                  key={size.label}
                  style={[
                    styles.sizeBtn,
                    index === sizeIndex && { borderColor: item.accent, backgroundColor: 'rgba(255,255,255,0.08)' },
                  ]}
                  onPress={() => setSelectedSizeIndex((prev) => ({ ...prev, [item.id]: index }))}
                >
                  <Text style={styles.sizeLabel}>{size.label}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, gap: 14 },
  card: {
    borderWidth: 2,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
  },
  image: { width: 140, height: 140, marginBottom: 10 },
  name: { color: colors.textPrimary, fontFamily: fonts.heading, fontSize: 16 },
  meta: { color: colors.textSecondary, fontFamily: fonts.body, fontSize: 12, marginTop: 4 },
  badge: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 10,
    fontFamily: fonts.body,
    textTransform: 'uppercase',
  },
  sizes: { flexDirection: 'row', gap: 6, marginTop: 10 },
  sizeBtn: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sizeLabel: { color: colors.textPrimary, fontFamily: fonts.heading, fontSize: 12 },
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd app && npx jest src/screens/CatalogScreen.test.tsx`
Expected: PASS — 3 passed

- [ ] **Step 5: Commit**

```bash
git add app/src/screens/CatalogScreen.tsx app/src/screens/CatalogScreen.test.tsx
git commit -m "feat: add Catalog screen with product grid and size toggles"
```

---

### Task 6: Product detail screen

**Files:**
- Create: `app/src/screens/ProductDetailScreen.tsx`
- Test: `app/src/screens/ProductDetailScreen.test.tsx`

**Interfaces:**
- Consumes: `products` from `../data/products`; route prop typed as `{ route: { params: { id: string } } }`
- Produces: `export default function ProductDetailScreen({ route }): JSX.Element`, rendered by `RootNavigator` (Task 7) for the `ProductDetail` stack route.

- [ ] **Step 1: Write the failing test**

```tsx
// app/src/screens/ProductDetailScreen.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import ProductDetailScreen from './ProductDetailScreen';

test('renders the requested product name, meta, and scent', () => {
  const { getByText } = render(
    <ProductDetailScreen route={{ params: { id: 'classic-pomade' } }} />
  );
  expect(getByText('Classic Pomade')).toBeTruthy();
  expect(getByText('Control Hold · High Shine')).toBeTruthy();
  expect(getByText('Grapeberry Scent')).toBeTruthy();
});

test('renders a size pill per available size', () => {
  const { getByText } = render(
    <ProductDetailScreen route={{ params: { id: 'classic-pomade' } }} />
  );
  expect(getByText('60g')).toBeTruthy();
  expect(getByText('150g')).toBeTruthy();
});

test('tapping a size pill switches the active selection', () => {
  const { getByText } = render(
    <ProductDetailScreen route={{ params: { id: 'classic-pomade' } }} />
  );
  fireEvent.press(getByText('150g'));
  expect(getByText('150g').props.style).toEqual(
    expect.objectContaining({ color: '#1a1a1a' })
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd app && npx jest src/screens/ProductDetailScreen.test.tsx`
Expected: FAIL — `Cannot find module './ProductDetailScreen'`

- [ ] **Step 3: Write minimal implementation**

Note: the third test asserts on a flattened style object; React Native Testing
Library flattens array styles for `.props.style` when using `StyleSheet.flatten`
internally only if the component itself passes a flattened object. To keep the
test meaningful and simple, the component applies the "active" text color
directly as an object (not via array merge) when selected.

```tsx
// app/src/screens/ProductDetailScreen.tsx
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';
import { products } from '../data/products';
import { colors, fonts } from '../theme';

type Props = {
  route: { params: { id: string } };
};

export default function ProductDetailScreen({ route }: Props) {
  const product = products.find((p) => p.id === route.params.id);
  const [sizeIndex, setSizeIndex] = useState(0);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={product.sizes[sizeIndex].image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.meta}>{product.meta}</Text>
      <Text style={[styles.badge, { color: product.accent, borderColor: product.accent }]}>
        {product.scent}
      </Text>
      <View style={styles.sizes}>
        {product.sizes.map((size, index) => {
          const active = index === sizeIndex;
          return (
            <Pressable
              key={size.label}
              style={[
                styles.sizeBtn,
                active && { borderColor: product.accent, backgroundColor: product.accent },
              ]}
              onPress={() => setSizeIndex(index)}
            >
              <Text style={active ? styles.sizeLabelActive : styles.sizeLabel}>{size.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, alignItems: 'center' },
  image: { width: 220, height: 220, marginBottom: 16 },
  name: { color: colors.textPrimary, fontFamily: fonts.heading, fontSize: 22 },
  meta: { color: colors.textSecondary, fontFamily: fonts.body, fontSize: 14, marginTop: 6 },
  badge: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 11,
    fontFamily: fonts.body,
    textTransform: 'uppercase',
  },
  sizes: { flexDirection: 'row', gap: 10, marginTop: 20 },
  sizeBtn: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  sizeLabel: { color: colors.textPrimary, fontFamily: fonts.heading, fontSize: 14 },
  sizeLabelActive: { color: '#1a1a1a', fontFamily: fonts.heading, fontSize: 14 },
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd app && npx jest src/screens/ProductDetailScreen.test.tsx`
Expected: PASS — 3 passed

- [ ] **Step 5: Commit**

```bash
git add app/src/screens/ProductDetailScreen.tsx app/src/screens/ProductDetailScreen.test.tsx
git commit -m "feat: add Product Detail screen with size selection"
```

---

### Task 7: Home screen

**Files:**
- Create: `app/src/screens/HomeScreen.tsx`
- Test: `app/src/screens/HomeScreen.test.tsx`

**Interfaces:**
- Consumes: `colors`, `fonts` from `../theme`; navigation prop typed as `{ navigation: { navigate: (screen: 'Catalog' | 'Connect') => void } }`
- Produces: `export default function HomeScreen({ navigation }): JSX.Element`

- [ ] **Step 1: Write the failing test**

```tsx
// app/src/screens/HomeScreen.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

test('renders brand name and two nav buttons', () => {
  const navigate = jest.fn();
  const { getByText } = render(<HomeScreen navigation={{ navigate }} />);
  expect(getByText('Tedd Grooming Company')).toBeTruthy();
  expect(getByText('Browse Catalog')).toBeTruthy();
  expect(getByText('Connect With Us')).toBeTruthy();
});

test('tapping Browse Catalog navigates to Catalog tab', () => {
  const navigate = jest.fn();
  const { getByText } = render(<HomeScreen navigation={{ navigate }} />);
  fireEvent.press(getByText('Browse Catalog'));
  expect(navigate).toHaveBeenCalledWith('Catalog');
});

test('tapping Connect With Us navigates to Connect tab', () => {
  const navigate = jest.fn();
  const { getByText } = render(<HomeScreen navigation={{ navigate }} />);
  fireEvent.press(getByText('Connect With Us'));
  expect(navigate).toHaveBeenCalledWith('Connect');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd app && npx jest src/screens/HomeScreen.test.tsx`
Expected: FAIL — `Cannot find module './HomeScreen'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// app/src/screens/HomeScreen.tsx
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

type Props = {
  navigation: { navigate: (screen: 'Catalog' | 'Connect') => void };
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.tagline}>Tedd Grooming Company</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Catalog')}>
        <Text style={styles.buttonLabel}>Browse Catalog</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Connect')}>
        <Text style={styles.buttonLabel}>Connect With Us</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', gap: 16 },
  logo: { width: 220, height: 120 },
  tagline: { color: colors.textSecondary, fontFamily: fonts.body, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' },
  button: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
  },
  buttonLabel: { color: colors.gold, fontFamily: fonts.heading, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase' },
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd app && npx jest src/screens/HomeScreen.test.tsx`
Expected: PASS — 3 passed

- [ ] **Step 5: Commit**

```bash
git add app/src/screens/HomeScreen.tsx app/src/screens/HomeScreen.test.tsx
git commit -m "feat: add Home screen with nav shortcuts"
```

---

### Task 8: Root navigator wiring (bottom tabs + stack)

**Files:**
- Create: `app/src/navigation/RootNavigator.tsx`
- Modify: `app/App.tsx`

**Interfaces:**
- Consumes: `HomeScreen`, `CatalogScreen`, `ProductDetailScreen`, `ConnectScreen` (all default exports from Task 4–7)
- Produces: `export default function RootNavigator(): JSX.Element` — mounted directly by `App.tsx`. Tab names: `'Home' | 'Catalog' | 'Connect'`. Catalog tab is a native-stack with routes `'CatalogHome' | 'ProductDetail'`.

This task wires screens together; it is verified by a navigation smoke test rather than unit tests of each screen (already covered in Tasks 4–7).

- [ ] **Step 1: Write the failing test**

```tsx
// app/src/navigation/RootNavigator.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RootNavigator from './RootNavigator';

test('navigating Home -> Catalog -> a product detail shows that product', async () => {
  const { getByText } = render(<RootNavigator />);
  fireEvent.press(getByText('Browse Catalog'));
  await waitFor(() => expect(getByText('Hair Spray')).toBeTruthy());
  fireEvent.press(getByText('Hair Spray'));
  await waitFor(() => expect(getByText('Strong Hold · High Shine')).toBeTruthy());
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd app && npx jest src/navigation/RootNavigator.test.tsx`
Expected: FAIL — `Cannot find module './RootNavigator'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// app/src/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ConnectScreen from '../screens/ConnectScreen';
import { colors } from '../theme';

export type CatalogStackParamList = {
  CatalogHome: undefined;
  ProductDetail: { id: string };
};

const Tab = createBottomTabNavigator();
const CatalogStack = createNativeStackNavigator<CatalogStackParamList>();

function CatalogStackNavigator() {
  return (
    <CatalogStack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textPrimary }}>
      <CatalogStack.Screen name="CatalogHome" component={CatalogScreen} options={{ title: 'Catalog' }} />
      <CatalogStack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product' }} />
    </CatalogStack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.cardBorder },
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Catalog" component={CatalogStackNavigator} />
        <Tab.Screen name="Connect" component={ConnectScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

Note: `HomeScreen`'s `navigation.navigate('Catalog')` call works as-is because
tab navigators accept a bare tab name; React Navigation resolves it to that
tab's initial route (`CatalogHome`).

- [ ] **Step 4: Update `app/App.tsx`**

```tsx
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <RootNavigator />
    </>
  );
}
```

- [ ] **Step 5: Install navigation dependencies if missing**

Run: `cd app && npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context`
Expected: added to `package.json` dependencies (already listed in Task 1's `package.json`; this step ensures lockfile is in sync if Task 1 was scaffolded via `npm install` before this task existed).

- [ ] **Step 6: Run test to verify it passes**

Run: `cd app && npx jest src/navigation/RootNavigator.test.tsx`
Expected: PASS — 1 passed

- [ ] **Step 7: Run the full test suite**

Run: `cd app && npx jest`
Expected: all test files pass (products, ConnectScreen, CatalogScreen, ProductDetailScreen, HomeScreen, RootNavigator).

- [ ] **Step 8: Commit**

```bash
git add app/src/navigation/RootNavigator.tsx app/src/navigation/RootNavigator.test.tsx app/App.tsx app/package.json app/package-lock.json
git commit -m "feat: wire bottom-tab navigation across all screens"
```

---

### Task 9: Manual verification in Expo

**Files:** none (manual QA pass, no code changes expected unless a bug is found)

- [ ] **Step 1: Start the app**

Run: `cd app && npx expo start --web`
Expected: dev server starts; web preview opens.

- [ ] **Step 2: Verify Home screen**

Confirm: logo and "Tedd Grooming Company" tagline render; "Browse Catalog" and "Connect With Us" buttons are visible and tappable.

- [ ] **Step 3: Verify Catalog screen**

Confirm: all 9 product cards render with images, names, meta, scent badges, and size pills; tapping a size pill swaps the image without navigating; tapping the card body navigates to that product's detail screen.

- [ ] **Step 4: Verify Product Detail screen**

Confirm: correct product name/meta/scent/image shown for several different products reached from the catalog; size pills switch the active size and image.

- [ ] **Step 5: Verify Connect screen**

Confirm: all 8 link buttons render; tapping one attempts to open the corresponding URL (in web preview this opens a new browser tab — confirm the URL matches the one listed in Task 4's `links` array).

- [ ] **Step 6: Fix any issues found, otherwise no commit needed for this task**

If any visual or functional bug is found, fix it in the relevant screen file from Tasks 4–8, re-run that screen's test file, and commit the fix with message `fix: <short description>`.

---

## Self-Review Notes

- **Spec coverage:** Home/Catalog/ProductDetail/Connect screens (Task 4–8), static product data sourced from `shop/TEDD CATALOG.html` (Task 3), dark theme + gold accent + per-product accent colors (Task 2, applied throughout), Oswald/Inter fonts (Task 2, referenced in all screen styles), Connect screen replacing "Store Info" with social/marketplace links only (Task 4), `Linking.openURL` with silent-catch error handling (Task 4), no cart/checkout/backend/booking/notifications anywhere in the plan — all covered.
- **Placeholder scan:** no TBD/TODO markers; every step has complete, runnable code.
- **Type consistency:** `Product`/`ProductSize` types defined once in Task 3 and reused by name (not redefined) in Tasks 5–6; navigation param types (`'ProductDetail', { id: string }`, `'Catalog' | 'Connect'`) match between `HomeScreen`, `CatalogScreen`, and `RootNavigator`'s `CatalogStackParamList`.
