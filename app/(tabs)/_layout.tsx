import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
import { ArtisanColors } from '@/constants/theme';

function TabIcon({ name, size = 24 }: { name: string; color: string; size?: number }) {
  const icons: Record<string, string> = {
    home: Platform.OS === 'ios' ? '⌂' : '🏠',
    menu: '🍕',
    cart: '🛒',
    orders: '📋',
    profile: '👤',
  };
  return <Text style={{ fontSize: size }}>{icons[name] || '●'}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ArtisanColors.primary,
        tabBarInactiveTintColor: ArtisanColors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: ArtisanColors.surface,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <TabIcon name="menu" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrello',
          tabBarIcon: ({ color }) => <TabIcon name="cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Ordini',
          tabBarIcon: ({ color }) => <TabIcon name="orders" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profilo',
          tabBarIcon: ({ color }) => <TabIcon name="profile" color={color} />,
        }}
      />
    </Tabs>
  );
}
