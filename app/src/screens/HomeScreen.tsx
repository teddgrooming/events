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
