import { ArtisanColors } from "@/constants/theme";
import { Link } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MENU_URLS } from "../api/menuApi";
import { useCart } from "../contexts/CartContext";
import { useMenu } from "../contexts/MenuContext";
import { Menu } from "../interface/interface";

const CATEGORIES = [
  "Pizze Classiche",
  "Speciali",
  "Gourmet",
  "Bevande",
  "Dolci",
];

export default function MenuScreen() {
  const { menu } = useMenu();
  const { items } = useCart();
  const { totalPrice } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              {/* <Image source={CHEF_IMAGE} style={styles.avatar}/> */}
            </View>
            <Text style={styles.greeting}>Ciao, Luigi!</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Search
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Cerca la tua pizza..."
              placeholderTextColor={ArtisanColors.outline}
            />
          </View> */}
        {/* <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity> */}
        {/* </View> */}

        {/* Categories
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.categoryChip,
                i === 0 && styles.categoryChipActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  i === 0 && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

        {/* Pizza List */}
        {menu && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.pizzaList}
          >
            {(menu as Menu[]).map((pizza) => (
              <Link
                key={pizza.product_id}
                href={`/pizza/${pizza.product_id}`}
                asChild
              >
                <TouchableOpacity style={styles.pizzaCard} activeOpacity={0.7}>
                  <Image
                    source={{
                      uri: MENU_URLS.menuImage + pizza.images[0].image_id,
                    }}
                    style={styles.pizzaImage}
                  />
                  <View style={styles.pizzaContent}>
                    <View style={styles.pizzaHeader}>
                      <Text style={styles.pizzaName}>{pizza.name}</Text>
                    </View>
                    <Text style={styles.pizzaDesc} numberOfLines={2}>
                      {pizza.description}
                    </Text>
                    <View style={styles.pizzaBottom}>
                      <Text style={styles.pizzaPrice}>{pizza.price}€</Text>
                      {/* <TouchableOpacity
                        style={styles.addButton}
                      >
                        <Text style={styles.addButtonText}>+</Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        )}
        {/* Sticky Cart Button */}
        <View style={styles.cartBar}>
          <Link href="/cart" asChild>
            <TouchableOpacity style={styles.cartButton}>
              <Text style={styles.cartIcon}>🛒</Text>
              <Text style={styles.cartLabel}>
                {" "}
                {items.length} {items.length === 1 ? "Articolo" : "Articoli"}
              </Text>
              <View style={styles.cartSpacer} />
              <Text style={styles.cartTotal}>{totalPrice}</Text>
              <Text style={styles.cartArrow}>→</Text>
            </TouchableOpacity>
          </Link>
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
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ArtisanColors.surfaceContainerLow,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: ArtisanColors.outlineVariant,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: ArtisanColors.outline,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: ArtisanColors.onSurface,
  },
  filterButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ArtisanColors.surfaceContainerLow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ArtisanColors.outlineVariant,
  },
  filterIcon: {
    fontSize: 20,
    color: ArtisanColors.primary,
  },
  categoriesRow: {
    paddingHorizontal: 16,
    gap: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: ArtisanColors.surfaceContainerHigh,
  },
  categoryChipActive: {
    backgroundColor: ArtisanColors.primary,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: ArtisanColors.onSurfaceVariant,
  },
  categoryChipTextActive: {
    color: ArtisanColors.onPrimary,
  },
  pizzaList: {
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 140,
  },
  pizzaCard: {
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
  pizzaImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  pizzaContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  pizzaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  pizzaName: {
    fontSize: 20,
    fontWeight: "600",
    color: ArtisanColors.onSurface,
    flex: 1,
  },
  pizzaTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagPrimary: {
    backgroundColor: "rgba(178,1,18,0.1)",
  },
  tagSecondary: {
    backgroundColor: "rgba(27,109,36,0.1)",
  },
  tagTertiary: {
    backgroundColor: "rgba(91,87,75,0.1)",
  },
  pizzaTagText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  tagTextPrimary: {
    color: ArtisanColors.primary,
  },
  tagTextSecondary: {
    color: ArtisanColors.secondary,
  },
  tagTextTertiary: {
    color: ArtisanColors.tertiary,
  },
  pizzaDesc: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    marginTop: 4,
  },
  pizzaBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  pizzaPrice: {
    fontSize: 24,
    fontWeight: "600",
    color: ArtisanColors.primary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ArtisanColors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "300",
  },
  cartBar: {
    position: "absolute",
    bottom: 36,
    left: 16,
    right: 16,
    alignItems: "center",
    zIndex: 40,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ArtisanColors.primary,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 24,
    width: "100%",
    shadowColor: ArtisanColors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  cartIcon: {
    fontSize: 18,
  },
  cartLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 8,
  },
  cartSpacer: {
    flex: 1,
  },
  cartTotal: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginRight: 16,
  },
  cartArrow: {
    color: "#fff",
    fontSize: 20,
  },
});
