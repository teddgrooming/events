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
                    index === sizeIndex && { borderColor: item.accent, backgroundColor: colors.activeChipBackground },
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
    borderColor: colors.inactiveBorder,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sizeLabel: { color: colors.textPrimary, fontFamily: fonts.heading, fontSize: 12 },
});
