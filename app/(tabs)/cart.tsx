import { ArtisanColors } from "@/constants/theme";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MENU_URLS } from "../api/menuApi";
import { useCart } from "../contexts/CartContext";

const DELIVERY_FEE = 2.5;

export default function CartScreen() {
  // const [items, setItems] = useState(CART_ITEMS);

  // const updateQty = (index: number, delta: number) => {
  //   setItems((prev) =>
  //     prev.map((item, i) =>
  //       i === index ? { ...item, qty: Math.max(1, item.qty + delta) } : item
  //     )
  //   );
  // };

  // const removeItem = (index: number) => {
  //   setItems((prev) => prev.filter((_, i) => i !== index));
  // };

  // const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  // const total = subtotal + DELIVERY_FEE;
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [discont, setDiscount] = useState("");

  const subtotal = cartTotal;
  const total = subtotal + (cartTotal ? DELIVERY_FEE : 0);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              {/* <Image source={CHEF_IMAGE} style={styles.avatar} /> */}
            </View>
            <Text style={styles.greeting}>Ciao, Luigi!</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.pageTitle}>Il Tuo Carrello</Text>
          <Text style={styles.pageSubtitle}>
            {items.length === 0
              ? "Il carrello è vuoto"
              : `Hai ${items.length} specialità pronte per l'ordine`}
          </Text>

          {/* Cart Items */}
          <View style={styles.itemsList}>
            {items.map((item, i) => (
              <View key={item.product_id} style={styles.cartItem}>
                <Image
                  source={{
                    uri: MENU_URLS.menuImage + item.images[0]?.image_id,
                  }}
                  style={styles.itemImage}
                />
                <View style={styles.itemContent}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.product_id)}
                    >
                      <Text style={styles.deleteIcon}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemDesc}>{item.description}</Text>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemPrice}>
                      €{(item.price * item.qty).toFixed(2)}
                    </Text>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.product_id, -1)}
                      >
                        <Text style={styles.qtyButtonText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyValue}>{item.qty}</Text>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.product_id, 1)}
                      >
                        <Text style={styles.qtyButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Promo Code */}
          <View style={styles.promoSection}>
            <Text style={styles.promoLabel}>Hai un codice sconto?</Text>
            <View style={styles.promoRow}>
              <TextInput
                style={styles.promoInput}
                value={discont}
                onChangeText={setDiscount}
                placeholder="Esempio: PIZZA10"
                placeholderTextColor={ArtisanColors.outline}
              />
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Applica</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Summary */}
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotale</Text>
              <Text style={styles.summaryValue}>€{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Costo Consegna</Text>
              <Text style={styles.summaryValue}>
                €{DELIVERY_FEE.toFixed(2)}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Totale</Text>
              <Text style={styles.totalValue}>€{total.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Checkout Button */}
        <View style={styles.checkoutBar}>
          <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
            <Text style={styles.checkoutText}>Procedi al pagamento</Text>
            <Text style={styles.checkoutArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: ArtisanColors.outlineVariant,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: ArtisanColors.primary,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 20,
    color: ArtisanColors.onSurfaceVariant,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: ArtisanColors.onSurface,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    marginBottom: 24,
  },
  itemsList: {
    gap: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: ArtisanColors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: ArtisanColors.outlineVariant,
  },
  itemImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: ArtisanColors.onSurface,
    flex: 1,
  },
  deleteIcon: {
    fontSize: 16,
  },
  itemDesc: {
    fontSize: 13,
    color: ArtisanColors.onSurfaceVariant,
    marginTop: 4,
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  itemPrice: {
    fontWeight: "700",
    color: ArtisanColors.primary,
    fontSize: 16,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ArtisanColors.surfaceContainerLow,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  qtyButtonText: {
    fontSize: 16,
    color: ArtisanColors.onSurface,
  },
  qtyValue: {
    paddingHorizontal: 16,
    fontWeight: "700",
    color: ArtisanColors.onSurface,
  },
  promoSection: {
    marginTop: 32,
    backgroundColor: ArtisanColors.surfaceContainerLow,
    borderRadius: 12,
    padding: 16,
  },
  promoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: ArtisanColors.onSurfaceVariant,
    marginBottom: 8,
  },
  promoRow: {
    flexDirection: "row",
    gap: 8,
  },
  promoInput: {
    flex: 1,
    backgroundColor: ArtisanColors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: ArtisanColors.outline,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: ArtisanColors.onSurface,
  },
  promoButton: {
    backgroundColor: ArtisanColors.inverseSurface,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  promoButtonText: {
    color: ArtisanColors.inverseOnSurface,
    fontWeight: "700",
  },
  summary: {
    marginTop: 32,
    gap: 12,
    marginBottom: 40,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 16,
    color: ArtisanColors.onSurfaceVariant,
  },
  summaryValue: {
    fontSize: 16,
    color: ArtisanColors.onSurfaceVariant,
  },
  divider: {
    height: 1,
    backgroundColor: ArtisanColors.outlineVariant,
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 24,
    fontWeight: "600",
    color: ArtisanColors.onSurface,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "600",
    color: ArtisanColors.primary,
  },
  checkoutBar: {
    position: "absolute",
    bottom: 96,
    left: 16,
    right: 16,
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    backgroundColor: ArtisanColors.primary,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  checkoutArrow: {
    color: "#fff",
    fontSize: 18,
  },
});
