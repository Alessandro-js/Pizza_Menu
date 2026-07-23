import { ArtisanColors } from "@/constants/theme";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MENU_URLS } from "../api/menuApi";
import { useMenu } from "../contexts/MenuContext";

interface PizzaImage {
  image_id: string;
  object_key: string;
  order: number;
  created_at: string;
}

interface Menu {
  product_id: string;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_spicy: boolean;
  created_at: string;
  updated_at: string;
  images: PizzaImage[];
}

export default function PizzaDetail() {
  const { id } = useLocalSearchParams();
  const { menu } = useMenu();
  const pizza = (menu as Menu[]).find((p) => p.product_id === id);

  if (!pizza) return <Text>Pizza non trovata</Text>;

  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedDough, setSelectedDough] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);

  // const toggleExtra = (index: number) => {
  //   const next = [...selectedExtras];
  //   next[index] = !next[index];
  //   setSelectedExtras(next);
  // };

  const adjustQty = (val: number) => {
    setQuantity(Math.max(1, quantity + val));
  };

  const handleAddToCart = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dettaglio Pizza</Text>
        <TouchableOpacity style={styles.favButton}>
          <Text style={styles.favIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: MENU_URLS.menuImage + pizza.images[0].image_id }}
            style={styles.heroImage}
          />
          <View style={styles.bestSellerBadge}>
            <Text style={styles.bestSellerText}>BEST SELLER</Text>
          </View>
        </View>

        {/* Title & Rating */}
        <View style={styles.titleRow}>
          <View style={styles.titleLeft}>
            <Text style={styles.pizzaTitle}>{pizza.name}</Text>
            {/* <Text style={styles.pizzaSubtitle}>
              La regina della tradizione napoletana
            </Text> */}
          </View>
          <View style={styles.ratingBox}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </View>

        {/* Ingredients */}
        <Text style={styles.sectionLabel}>Ingredienti</Text>
        <Text style={styles.ingredientsText}>{pizza.description}</Text>

        {/* Size Selection
        <Text style={styles.sectionTitle}>Dimensione</Text>
        <View style={styles.sizeRow}>
          {SIZES.map((size, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.sizeButton, selectedSize === i && styles.sizeButtonActive]}
              onPress={() => setSelectedSize(i)}
            >
              <Text style={[styles.sizeLabel, selectedSize === i && styles.sizeLabelActive]}>
                {size.label}
              </Text>
              <Text style={[styles.sizeSub, selectedSize === i && styles.sizeSubActive]}>
                {size.sub}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {/*  */}
        {/* <Text style={styles.sectionTitle}>Scelta Impasto</Text>
        <View style={styles.doughList}>
          {DOUGHS.map((dough, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.doughItem, selectedDough === i && styles.doughItemActive]}
              onPress={() => setSelectedDough(i)}
            >
              <View style={styles.doughLeft}>
                <Text style={styles.doughIcon}>{dough.icon}</Text>
                <View>
                  <Text style={styles.doughLabel}>{dough.label}</Text>
                  <Text style={styles.doughSub}>{dough.sub}</Text>
                </View>
              </View>
              <View style={[styles.radio, selectedDough === i && styles.radioActive]}>
                {selectedDough === i && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Extras
        <Text style={styles.sectionTitle}>Aggiungi Extra</Text>
        <View style={styles.extrasList}>
          {EXTRAS.map((extra, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.extraItem, selectedExtras[i] && styles.extraItemChecked]}
              onPress={() => toggleExtra(i)}
            >
              <View style={[styles.checkbox, selectedExtras[i] && styles.checkboxActive]}>
                {selectedExtras[i] && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={styles.extraLabel}>{extra.label}</Text>
              <Text style={styles.extraPrice}>{extra.price}</Text>
            </TouchableOpacity>
          ))}
        </View>*/}
      </ScrollView>

      {/* Toast */}
      {toastVisible && (
        <View style={styles.toast}>
          <Text style={styles.toastIcon}>✅</Text>
          <Text style={styles.toastText}>Pizza aggiunta al carrello!</Text>
        </View>
      )}

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => adjustQty(-1)}
          >
            <Text style={styles.qtyButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => adjustQty(1)}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.cartButtonLabel}>AGGIUNGI</Text>
          <View style={styles.cartButtonRight}>
            <Text style={styles.cartButtonPrice}>€</Text>
            <Text style={styles.cartButtonIcon}>🛒</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArtisanColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: ArtisanColors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  backIcon: {
    fontSize: 22,
    color: ArtisanColors.primary,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: ArtisanColors.primary,
  },
  favButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  favIcon: {
    fontSize: 22,
    color: ArtisanColors.onSurfaceVariant,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 160,
  },
  heroContainer: {
    height: 280,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  bestSellerBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  bestSellerText: {
    color: ArtisanColors.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 24,
  },
  titleLeft: {
    flex: 1,
  },
  pizzaTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: ArtisanColors.onSurface,
    lineHeight: 34,
  },
  pizzaSubtitle: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    fontStyle: "italic",
    marginTop: 4,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ArtisanColors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  starIcon: {
    fontSize: 14,
  },
  ratingText: {
    fontWeight: "700",
    color: ArtisanColors.onSecondaryFixedVariant,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: ArtisanColors.onSurface,
    marginTop: 24,
    marginBottom: 8,
  },
  ingredientsText: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: ArtisanColors.onSurface,
    marginTop: 32,
    marginBottom: 16,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: ArtisanColors.outlineVariant,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    backgroundColor: ArtisanColors.surface,
  },
  sizeButtonActive: {
    borderColor: ArtisanColors.primary,
    backgroundColor: "rgba(178,1,18,0.05)",
  },
  sizeLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: ArtisanColors.onSurfaceVariant,
    marginBottom: 4,
  },
  sizeLabelActive: {
    color: ArtisanColors.primary,
  },
  sizeSub: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
  },
  sizeSubActive: {
    color: ArtisanColors.primary,
  },
  doughList: {
    gap: 8,
  },
  doughItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: ArtisanColors.surfaceContainerLow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  doughItemActive: {
    borderColor: ArtisanColors.outlineVariant,
  },
  doughLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  doughIcon: {
    fontSize: 22,
  },
  doughLabel: {
    fontWeight: "700",
    color: ArtisanColors.onSurface,
  },
  doughSub: {
    fontSize: 12,
    fontWeight: "600",
    color: ArtisanColors.onSurfaceVariant,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: ArtisanColors.outline,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: ArtisanColors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ArtisanColors.primary,
  },
  extrasList: {
    gap: 8,
  },
  extraItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: ArtisanColors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ArtisanColors.outlineVariant,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  extraItemChecked: {
    borderColor: ArtisanColors.primary,
    backgroundColor: "rgba(178,1,18,0.03)",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ArtisanColors.outline,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: ArtisanColors.primary,
    borderColor: ArtisanColors.primary,
  },
  checkMark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  extraLabel: {
    flex: 1,
    fontSize: 14,
    color: ArtisanColors.onSurface,
  },
  extraPrice: {
    fontWeight: "700",
    color: ArtisanColors.primary,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(252,249,248,0.9)",
    borderTopWidth: 1,
    borderTopColor: ArtisanColors.outlineVariant,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
    gap: 16,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ArtisanColors.surfaceContainerHigh,
    borderRadius: 20,
    height: 48,
    borderWidth: 1,
    borderColor: ArtisanColors.outlineVariant,
    padding: 4,
  },
  qtyButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  qtyButtonText: {
    fontSize: 20,
    color: ArtisanColors.primary,
    fontWeight: "600",
  },
  qtyValue: {
    width: 40,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    color: ArtisanColors.onSurface,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ArtisanColors.primary,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 24,
    shadowColor: ArtisanColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  cartButtonLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 2,
  },
  cartButtonRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  cartButtonPrice: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
  },
  cartButtonIcon: {
    fontSize: 18,
  },
  toast: {
    position: "absolute",
    top: 80,
    left: "50%",
    transform: [{ translateX: -100 }],
    backgroundColor: ArtisanColors.inverseSurface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 60,
  },
  toastIcon: {
    fontSize: 16,
  },
  toastText: {
    color: ArtisanColors.inverseOnSurface,
    fontWeight: "700",
  },
});
