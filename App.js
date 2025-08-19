// import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { View, StyleSheet, useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

import { TouchableOpacity, Text } from 'react-native';

function LiquidGlassTabBar({ state, descriptors, navigation }) {
  return (
    
    <View style={styles.floatingContainer}>
      <BlurView intensity={70} tint="light" style={styles.pillTabBar}>
        <View style={styles.tabRow}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const isFocused = state.index === index;
            const icon = options.tabBarIcon
              ? options.tabBarIcon({ focused: isFocused, color: isFocused ? '#222' : '#888', size: 28 })
              : null;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.8}
              >
                <View style={styles.tabContentColumn}>
                  {icon}
                  <Text style={isFocused ? styles.activeTabText : styles.tabText}>{label}</Text>
                </View>

              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

export default function App() {
  const colorScheme = useColorScheme()
  return (
    <>
    <StatusBar 
    animated={true}
     barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
      />
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <LiquidGlassTabBar {...props} />}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  pillTabBar: {
    flexDirection: 'row',
    borderRadius: 32,
    overflow: 'hidden',
    width: 320,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 8,
  },
  tabRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
  },
  tabContentColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  tabText: {
    color: '#222',
    fontSize: 13,
    marginTop: 2,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  activeTabText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
    letterSpacing: 0.2,
  },
});
