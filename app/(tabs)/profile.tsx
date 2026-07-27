import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArtisanColors } from '@/constants/theme';
import { Image } from 'expo-image';
import { useAuth } from '../contexts/AuthContext';

const CHEF_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEtd1iOEbCTRfF0LhI5TIxUZyREqYtRjUbegItmLqTm-6D8Od8VfFButa-7xoHjryp_qa1fij-3CowglbhUZo-UDmoHzr62xZMVEwRpe76Ynj4BBlPuK1KHWMyHAcei11Ut_lqfAKP_7td1K5rpS0_ZCuNyVTDX-AIdJt5D-yrDMWRCzVyOUNPO0WNVnNr1MzQoulsA72x5Rm_7WqV2SEuapnPtAykLW9-0H7W0kfWXKz4c7bACE2YngqxYbQ2bY3hL-1sBDejrA';

const MENU_ITEMS = [
  { icon: '👤', label: 'I miei dati', subtitle: 'Nome, email, telefono' },
  { icon: '📍', label: 'Indirizzi salvati', subtitle: 'Casa, Ufficio' },
  { icon: '💳', label: 'Metodi di pagamento', subtitle: 'Carte e contanti' },
  { icon: '🎁', label: 'Punti Fidelity', subtitle: '230 punti accumulati' },
  { icon: '❤️', label: 'Preferiti', subtitle: '4 pizze salvate' },
  { icon: '⚙️', label: 'Impostazioni', subtitle: 'Notifiche, lingua, tema' },
  { icon: '❓', label: 'Aiuto e supporto', subtitle: 'FAQ, contattaci' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Image source={CHEF_IMAGE} style={styles.avatarImage} />
          </View>
          <Text style={styles.profileName}>Luigi Romano</Text>
          <Text style={styles.profileEmail}>luigi@pizzeriaartisan.it</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Modifica Profilo</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Ordini</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>€1.250</Text>
            <Text style={styles.statLabel}>Speso</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>230</Text>
            <Text style={styles.statLabel}>Punti</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIcon}>
                  <Text style={styles.menuItemIconText}>{item.icon}</Text>
                </View>
                <View>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Esci</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Artisan Crust v1.0.0</Text>
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
    paddingTop: 32,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  avatarLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: ArtisanColors.outlineVariant,
    marginBottom: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: ArtisanColors.onSurface,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: ArtisanColors.primary,
  },
  editButtonText: {
    color: ArtisanColors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: ArtisanColors.surfaceContainerLowest,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: ArtisanColors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: ArtisanColors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: ArtisanColors.outlineVariant,
    marginVertical: 8,
  },
  menuSection: {
    paddingHorizontal: 16,
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: ArtisanColors.outlineVariant,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: ArtisanColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemIconText: {
    fontSize: 20,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: ArtisanColors.onSurface,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: ArtisanColors.onSurfaceVariant,
    marginTop: 2,
  },
  menuItemArrow: {
    fontSize: 22,
    color: ArtisanColors.outline,
    fontWeight: '300',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 32,
    height: 52,
    backgroundColor: ArtisanColors.surfaceContainerLow,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: ArtisanColors.error,
    fontWeight: '600',
    fontSize: 16,
  },
  version: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
    color: ArtisanColors.onSurfaceVariant,
    opacity: 0.5,
  },
});
