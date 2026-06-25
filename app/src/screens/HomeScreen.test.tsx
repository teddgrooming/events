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
