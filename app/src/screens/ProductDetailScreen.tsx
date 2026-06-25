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
  sizeLabelActive: { color: colors.activeLabelText, fontFamily: fonts.heading, fontSize: 14 },
});
