import { render, fireEvent } from '@testing-library/react-native';
import * as Linking from 'expo-linking';
import ConnectScreen from './ConnectScreen';

jest.mock('expo-linking', () => ({ openURL: jest.fn(() => Promise.resolve()) }));

test('renders all 8 connect links', () => {
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
