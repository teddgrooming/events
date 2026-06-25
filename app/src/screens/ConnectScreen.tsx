import * as Linking from 'expo-linking';
import { Pressable, ScrollView, Text, StyleSheet } from 'react-native';
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
