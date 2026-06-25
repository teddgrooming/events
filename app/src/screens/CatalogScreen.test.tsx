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
