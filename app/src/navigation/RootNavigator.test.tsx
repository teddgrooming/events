import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RootNavigator from './RootNavigator';

test('navigating Home -> Catalog -> a product detail shows that product', async () => {
  const { getByText } = render(<RootNavigator />);
  fireEvent.press(getByText('Browse Catalog'));
  await waitFor(() => expect(getByText('Hair Spray')).toBeTruthy());
  fireEvent.press(getByText('Hair Spray'));
  await waitFor(() => expect(getByText('Strong Hold · High Shine')).toBeTruthy());
});
