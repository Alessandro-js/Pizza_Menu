import { ArtisanColors } from "@/constants/theme";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROMO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCt9ZrZjJQOjySTZH5DMKAFUXfULUtmlS-yqo44v1PnHnwD38_fw3ee8w6VoEL6Bqs9On_DCZDc5-px89q7L1tHVxZjK_JSL0W9Q9XhJyGTHBFlb63Oj4-YlRjJwS_P1wSqRxWAerYIt7CAn7rKjCMqdVyFs7lMfgkiAgAXHPpmQQt_4aU7__nO7aH3eBxXIxyXstStXl6tqh6RM1Zy8TQpCr30OaKpJIpvl-TDfXwHiuPIG9ShML_-_jhBrnmKdw2Rib006Z8VJw";
const CHEF_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDEtd1iOEbCTRfF0LhI5TIxUZyREqYtRjUbegItmLqTm-6D8Od8VfFButa-7xoHjryp_qa1fij-3CowglbhUZo-UDmoHzr62xZMVEwRpe76Ynj4BBlPuK1KHWMyHAcei11Ut_lqfAKP_7td1K5rpS0_ZCuNyVTDX-AIdJt5D-yrDMWRCzVyOUNPO0WNVnNr1MzQoulsA72x5Rm_7WqV2SEuapnPtAykLW9-0H7W0kfWXKz4c7bACE2YngqxYbQ2bY3hL-1sBDejrA";
const LOGO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAAg9uOCvJMVEeTkFXPQu7felJxFTPDAeZP-VeLxsj19AXaWPsPys9twPClfdsPvr1PBFIpcIArdAlMgB5p2RSdL3CKmz0tsX6pEu5ow6vSLAfIwvMTIIhh3nhT8IP11JDifN3PM5cLGtdbTEqr8EgJofax1hi3ByrPWhHtbcLwPKqgycTOkv_x-QHeUpUeT_rHtHZb7ZDTJ9xIw5NIr3MsRGLTWMnFHGXpa10f5HGmrpZ-gKWmFQAmM6T10HUtrxmc5Tpp79aVoA";

const PIZZA1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBcYy0tTjonXSPxNCyF0uMeldRhw8zuroNEEZzilgPa3lnrYDGVvLdMRjllkYRuNfFSo7RDP-m8LZyrEqK5Nll3mDe1-IzFKnhkcil4pFgyWexlPiVPpQD7qFwpvVE-CsBe5VH7VsbzLVP3-EDljZebC9T2qMUGoo4vxRIK6Cl_jA3rCKKo8AJX1SmOXYiFs_atLWy-2UIiJpVl2_RuJEV75dz3XiqJFSkZ9CEnHDmHiz_C-9MgjrK5tkmPfG4rqXgwuE6ly6wo4A";
const PIZZA2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuARvfLFL6Iqn1KbZhq32zALfRs1IrvwDrUHou1fAk8JOeRcbHMRDnBTkF_UMGWpEu_rESz2DXZdEuFAQNMmKmAM9ikkQwC8-WnfwkaVE-3r-91asm2RJl2fB6-8Ef5WAVSxMbPAP6ZXkoIlUJjsFkDXZHcSVKOHrAs2GwRUeRlL7KMMjdc1HkbPhoAnAmv26m-cclV5h-Mo9I3Ld_cvL37cNNv9JVNc6SpPPXI4Kzsz1-YuGEM2KHHal4RIPOjBBL5W3Zo5LffJjw";
const ORDER1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDHUajNyv7s4CEKPOZatyDSmIJBiq1UpqVYhxCwlmRGpKC18sUQjLDbJdFjYvntUWVEtL5fMllTdfb5_BCOSI8PLPSZO7LO03J11yfH08y_Vhbr1JQ_WKBCN955-TUWHAat_BV-DTYp5nF_EuYGHpUiwn-8m45zoUB9kpBlROApznXwjxQbdKVaI3MXZ3FtsMecCpZ2NhjZE2xl_b7L0RBzj9H69B7Ph7tZYY2MNBS8T-LEcwBvHb8-0ZajNf26wZscRLM5Iemj_w";
const ORDER2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCE5KzITUg5jP-fd2AOkfLoE-Ng-SPAOvkFDrVddyepldjPRmTuImZDxLZNSrN-x2zoiCeFEnQnhSniurpqC6kUlfc9CaCFWcV3wvZfab_1YaIksaLnslFiqVo3wxAcxSFd7biJbfcdONpr5caMFOfWPXHcG1iZ6saT508ODxHIshUeACYAcICLyyA5dNOHQ0vJ53-LanutxjkrFZch9BRrUOAjlf29bOPYRWfOZf4A1xuVDme7uDL4HOowIr_L87X-fSpdSVS6iA";

const CATEGORIES = [
  { icon: "🍕", label: "Pizze", active: true },
  { icon: "🍔", label: "Hamburger", active: false },
  { icon: "🥤", label: "Bevande", active: false },
  { icon: "🍰", label: "Dolci", active: false },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 64, 256);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.avatarContainer}>
                <Image source={CHEF_IMAGE} style={styles.avatar} />
              </View>
              <Text style={styles.greeting}>Ciao, Luigi!</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>🔔</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <Image source={LOGO_IMAGE} style={styles.logo} />
            </View>
          </View>

          {/* Search Bar
          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrapper}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Cerca la tua pizza preferita..."
                placeholderTextColor={ArtisanColors.outline}
              />
            </View>
          </View> */}

          {/* Promo Banner */}
          <View style={styles.promoContainer}>
            <View style={styles.promoBanner}>
              <Image source={PROMO_IMAGE} style={styles.promoImage} />
              <View style={styles.promoOverlay} />
              <View style={styles.promoContent}>
                <View style={styles.promoBadge}>
                  <Text style={styles.promoBadgeText}>Offerta limitata</Text>
                </View>
                <Text style={styles.promoTitle}>Sconto 20%</Text>
                <Text style={styles.promoSubtitle}>sulla tua prima pizza</Text>
                <Link href="/menu" asChild>
                  <TouchableOpacity style={styles.promoButton}>
                    <Text style={styles.promoButtonText}>Ordina Ora</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>

          {/* Categories
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorie</Text>
            {/* <TouchableOpacity>
              <Text style={styles.seeAll}>Vedi tutte</Text>
            </TouchableOpacity> 
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}
          >
            {CATEGORIES.map((cat, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.categoryItem,
                  cat.active && styles.categoryItemActive,
                ]}
              >
                <View
                  style={[
                    styles.categoryIconBox,
                    cat.active && styles.categoryIconBoxActive,
                  ]}
                >
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                </View>
                <Text
                  style={[
                    styles.categoryLabel,
                    cat.active && styles.categoryLabelActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView> */}

          {/* Recommended */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Consigliati per te</Text>
            {/* <Text style={styles.filterIcon}>⚙️</Text> */}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedRow}
          >
            <View style={[styles.pizzaCard, { width: cardWidth }]}>
              <View style={styles.pizzaImageContainer}>
                <Image source={PIZZA1} style={styles.pizzaImage} />
                <View style={styles.favoriteBadge}>
                  <Text style={styles.favoriteIcon}>❤️</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.starIcon}>⭐</Text>
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
              </View>
              <View style={styles.pizzaInfo}>
                <Text style={styles.pizzaName}>Margherita D.O.P.</Text>
                <Text style={styles.pizzaDesc} numberOfLines={1}>
                  Mozzarella di bufala, basilico, pomodoro
                </Text>
                <View style={styles.pizzaBottom}>
                  <Text style={styles.pizzaPrice}>€9,50</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.pizzaCard, { width: cardWidth }]}>
              <View style={styles.pizzaImageContainer}>
                <Image source={PIZZA2} style={styles.pizzaImage} />
                <View style={styles.favoriteBadge}>
                  <Text style={styles.favoriteIconOutline}>♡</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.starIcon}>⭐</Text>
                  <Text style={styles.ratingText}>4.7</Text>
                </View>
              </View>
              <View style={styles.pizzaInfo}>
                <Text style={styles.pizzaName}>Diavola Gourmet</Text>
                <Text style={styles.pizzaDesc} numberOfLines={1}>
                  Salame piccante, olive, miele, peperoncino
                </Text>
                <View style={styles.pizzaBottom}>
                  <Text style={styles.pizzaPrice}>€11,00</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Last Orders */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ultimi ordini</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Cronologia</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ordersList}>
            <Link href="/orders" asChild>
              <TouchableOpacity style={styles.orderItem}>
                <Image source={ORDER1} style={styles.orderImage} />
                <View style={styles.orderInfo}>
                  <View style={styles.orderTop}>
                    <Text style={styles.orderName}>Napoletana Tradizione</Text>
                    <Text style={styles.orderPrice}>€12,50</Text>
                  </View>
                  <Text style={styles.orderDate}>15 Maggio • 2 Articoli</Text>
                  <View style={styles.orderActions}>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>Dettagli</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reorderButton}>
                      <Text style={styles.reorderIcon}>🔄</Text>
                      <Text style={styles.reorderText}>Ripeti</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
            <Link href="/orders" asChild>
              <TouchableOpacity style={styles.orderItem}>
                <Image source={ORDER2} style={styles.orderImage} />
                <View style={styles.orderInfo}>
                  <View style={styles.orderTop}>
                    <Text style={styles.orderName}>Burger Artisan</Text>
                    <Text style={styles.orderPrice}>€14,00</Text>
                  </View>
                  <Text style={styles.orderDate}>10 Maggio • 1 Articolo</Text>
                  <View style={styles.orderActions}>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>Dettagli</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reorderButton}>
                      <Text style={styles.reorderIcon}>🔄</Text>
                      <Text style={styles.reorderText}>Ripeti</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArtisanColors.background,
  },
  scrollContent: {
    paddingBottom: 100,
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    borderRadius: 20,
  },
  iconText: {
    fontSize: 20,
    color: ArtisanColors.onSurfaceVariant,
  },
  separator: {
    width: 1,
    height: 32,
    backgroundColor: ArtisanColors.outlineVariant,
    marginHorizontal: 4,
  },
  logo: {
    width: 32,
    height: 32,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ArtisanColors.surfaceContainerLowest,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: ArtisanColors.onSurface,
  },
  promoContainer: {
    paddingHorizontal: 14,
    marginBottom: 24,
    marginTop: 10,
  },
  promoBanner: {
    height: 176,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  promoImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ArtisanColors.primary,
    opacity: 0.85,
  },
  promoContent: {
    position: "absolute",
    left: 24,
    top: 24,
    right: 24,
    bottom: 24,
    justifyContent: "center",
  },
  promoBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  promoBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  promoTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 34,
  },
  promoSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 16,
  },
  promoButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: ArtisanColors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: ArtisanColors.onSurface,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: "600",
    color: ArtisanColors.primary,
  },
  filterIcon: {
    fontSize: 18,
    color: ArtisanColors.outline,
  },
  categoriesRow: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 24,
  },
  categoryItem: {
    alignItems: "center",
    padding: 12,
    backgroundColor: ArtisanColors.surfaceContainerLow,
    borderRadius: 16,
    minWidth: 84,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryItemActive: {
    backgroundColor: "rgba(178,1,18,0.05)",
    borderColor: "rgba(178,1,18,0.2)",
  },
  categoryIconBox: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIconBoxActive: {
    backgroundColor: ArtisanColors.primary,
  },
  categoryIcon: {
    fontSize: 22,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: ArtisanColors.onSurfaceVariant,
  },
  categoryLabelActive: {
    color: ArtisanColors.primary,
  },
  recommendedRow: {
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 24,
  },
  pizzaCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  pizzaImageContainer: {
    height: 176,
    position: "relative",
  },
  pizzaImage: {
    width: "100%",
    height: "100%",
  },
  favoriteBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favoriteIcon: {
    fontSize: 16,
  },
  favoriteIconOutline: {
    fontSize: 16,
    color: ArtisanColors.outline,
  },
  ratingBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: ArtisanColors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  starIcon: {
    fontSize: 10,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  pizzaInfo: {
    padding: 16,
  },
  pizzaName: {
    fontSize: 20,
    fontWeight: "600",
    color: ArtisanColors.onSurface,
    marginBottom: 4,
  },
  pizzaDesc: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    marginBottom: 16,
  },
  pizzaBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pizzaPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: ArtisanColors.primary,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: ArtisanColors.primaryContainer,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  ordersList: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 32,
  },
  orderItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: ArtisanColors.surfaceContainer,
  },
  orderImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  orderInfo: {
    flex: 1,
    minWidth: 0,
  },
  orderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderName: {
    fontSize: 20,
    fontWeight: "600",
    color: ArtisanColors.onSurface,
    flex: 1,
  },
  orderPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: ArtisanColors.onSurfaceVariant,
  },
  orderDate: {
    fontSize: 14,
    color: ArtisanColors.outline,
    marginBottom: 8,
  },
  orderActions: {
    flexDirection: "row",
    gap: 8,
  },
  detailsButton: {
    backgroundColor: ArtisanColors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: ArtisanColors.onSurfaceVariant,
  },
  reorderButton: {
    backgroundColor: "rgba(27,109,36,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reorderIcon: {
    fontSize: 12,
  },
  reorderText: {
    fontSize: 12,
    fontWeight: "700",
    color: ArtisanColors.secondary,
  },
});
