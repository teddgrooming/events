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
