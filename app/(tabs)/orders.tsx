import { Image } from 'expo-image';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArtisanColors } from '@/constants/theme';

const ORDER_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAepISclnGQmzk0rIwaEw-QS8EbYE0GXgoFYIenOpxm2qtIryHnrnPhzIaQ5lEIxti7BGHBQ82kcMH2-njLwHJ9w-Ncmdo5MHQHxaOGVhBMabU6JGSyLaHUGd7h5TveF2tJwY3fGn4hUjVwT_oZLDWNPzhHYVginwNNMotMMkviUquC5inaI-bM2EKttIKFhPN1D8LQmpcoplUy-aqj6NbzS4Z1td-RsuRZM2l1zdsx7C8t4IAIKqEQtxfmq3qSja5Q9NstcBxaAQ';
const MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR9sZK339k0bg5xvgpCcm_FmVcabHKOg9wlh0JpZ6yNgNgg0G3SxRNWAo_-WhO5Z5LWv1lCTad04AYwPXINjKSw0vN6avligJo8YO8XqxxQupOAOi-3AlhAJBqU_dA-F91znMyQ337eI0HHadAZ7W5iH16hWYvThjbU8THU9up90itY_dODucH8lYf2hMZE9mGVoTCbsT_SgFlgNfNioPoh3zAP8-a8BuVPX1PnbbH1puDWOxQNXC6lV2Vxvf4NHu0YUA0ZW0Yfw';

const STEPS = [
  { label: 'Ordine ricevuto', time: 'Ricevuto alle 19:30', active: true, done: true },
  { label: 'In preparazione', time: 'Impasto steso e condito', active: true, done: true },
  { label: 'Nel forno', time: 'Fase di cottura artigianale', active: true, done: false },
  { label: 'Nel tragitto', time: "In attesa del rider", active: false, done: false },
  { label: 'Consegnato', time: "Buon appetito!", active: false, done: false },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Segui il tuo ordine</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Map */}
        <View style={styles.mapContainer}>
          <Image source={MAP_IMAGE} style={styles.mapImage} />
          {/* ETA overlay */}
          <View style={styles.etaBox}>
            <Text style={styles.etaLabel}>Arrivo previsto</Text>
            <Text style={styles.etaValue}>15 minuti</Text>
          </View>
          {/* Rider marker */}
          <View style={styles.riderMarker}>
            <View style={styles.riderPulse} />
            <View style={styles.riderDot}>
              <Text style={styles.riderIcon}>🏍️</Text>
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.content}>
          <View style={styles.statusBanner}>
            <View style={styles.statusIconBox}>
              <Text style={styles.statusIcon}>🔥</Text>
            </View>
            <View>
              <Text style={styles.statusTitle}>La tua pizza è nel forno!</Text>
              <Text style={styles.statusSub}>Luigi sta curando la cottura perfetta.</Text>
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.timeline}>
            {STEPS.map((step, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  {i < STEPS.length - 1 && (
                    <View style={[
                      styles.timelineLine,
                      step.done && styles.timelineLineActive,
                    ]} />
                  )}
                  <View style={[
                    styles.timelineDot,
                    step.done && styles.timelineDotDone,
                    step.active && !step.done && styles.timelineDotCurrent,
                  ]}>
                    {step.done ? (
                      <Text style={styles.timelineCheck}>✓</Text>
                    ) : step.active ? (
                      <View style={styles.timelineDotInner} />
                    ) : null}
                  </View>
                </View>
                <View style={styles.timelineRight}>
                  <Text style={[
                    styles.timelineLabel,
                    step.active && styles.timelineLabelActive,
                    !step.active && styles.timelineLabelInactive,
                  ]}>
                    {step.label}
                  </Text>
                  <Text style={[
                    styles.timelineTime,
                    !step.active && styles.timelineTimeInactive,
                  ]}>
                    {step.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Contact button */}
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactText}>Contatta il negozio</Text>
          </TouchableOpacity>

          {/* Order Details */}
          <View style={styles.orderDetails}>
            <View style={styles.orderDetailsHeader}>
              <Text style={styles.orderDetailsTitle}>Dettaglio Ordine</Text>
              <Text style={styles.orderId}>#98234-A</Text>
            </View>
            <View style={styles.orderDetailsRow}>
              <Image source={ORDER_IMG} style={styles.orderDetailImage} />
              <View>
                <Text style={styles.orderDetailName}>Margherita DOC + Arancino</Text>
                <Text style={styles.orderDetailAddress}>{"Luigi's Pizzeria - Via Toledo 12"}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArtisanColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: ArtisanColors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  backIcon: {
    fontSize: 22,
    color: ArtisanColors.onSurface,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ArtisanColors.primary,
  },
  helpButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: ArtisanColors.onSurface,
  },
  helpIcon: {
    fontSize: 16,
    color: ArtisanColors.onSurface,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  mapContainer: {
    height: 320,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    backgroundColor: ArtisanColors.surfaceContainerHigh,
  },
  etaBox: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(252,249,248,0.9)',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  etaLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: ArtisanColors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  etaValue: {
    fontSize: 24,
    fontWeight: '700',
    color: ArtisanColors.primary,
  },
  riderMarker: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: [{ translateX: -28 }, { translateY: -28 }],
  },
  riderPulse: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(178,1,18,0.2)',
  },
  riderDot: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ArtisanColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(178,1,18,0.2)',
  },
  riderIcon: {
    fontSize: 24,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 32,
    marginTop: -32,
    backgroundColor: ArtisanColors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    position: 'relative',
    zIndex: 10,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: 'rgba(178,1,18,0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(178,1,18,0.1)',
    marginBottom: 32,
  },
  statusIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(178,1,18,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    fontSize: 28,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ArtisanColors.onSurface,
  },
  statusSub: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
  },
  timeline: {
    marginLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  timelineLine: {
    width: 2,
    backgroundColor: ArtisanColors.surfaceVariant,
    position: 'absolute',
    top: 24,
    bottom: -8,
    left: 11,
  },
  timelineLineActive: {
    backgroundColor: ArtisanColors.primary,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: ArtisanColors.surfaceVariant,
    backgroundColor: ArtisanColors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timelineDotDone: {
    backgroundColor: ArtisanColors.primary,
    borderColor: ArtisanColors.primary,
  },
  timelineDotCurrent: {
    borderColor: ArtisanColors.primary,
    backgroundColor: ArtisanColors.background,
  },
  timelineCheck: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  timelineDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ArtisanColors.primary,
  },
  timelineRight: {
    flex: 1,
    paddingTop: 2,
  },
  timelineLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: ArtisanColors.onSurface,
  },
  timelineLabelActive: {
    color: ArtisanColors.primary,
  },
  timelineLabelInactive: {
    color: ArtisanColors.onSurfaceVariant,
    opacity: 0.6,
  },
  timelineTime: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    marginTop: 2,
  },
  timelineTimeInactive: {
    opacity: 0.4,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderWidth: 2,
    borderColor: ArtisanColors.secondary,
    borderRadius: 12,
    gap: 8,
    marginTop: 32,
  },
  contactIcon: {
    fontSize: 18,
  },
  contactText: {
    color: ArtisanColors.secondary,
    fontWeight: '700',
  },
  orderDetails: {
    marginTop: 32,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: ArtisanColors.surfaceVariant,
  },
  orderDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderDetailsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ArtisanColors.onSurface,
  },
  orderId: {
    fontSize: 12,
    fontWeight: '600',
    color: ArtisanColors.onSurfaceVariant,
  },
  orderDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  orderDetailImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: ArtisanColors.surfaceVariant,
  },
  orderDetailName: {
    fontSize: 16,
    color: ArtisanColors.onSurface,
  },
  orderDetailAddress: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    marginTop: 4,
  },
});
