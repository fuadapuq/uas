"use client"

// App.tsx
import { useState, useEffect } from "react"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from "expo-status-bar"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as Phosphor from "phosphor-react-native"

// Import screens Anda
import ProfileScreen from "./screens/ProfileScreen"
import SettingsScreen from "./screens/SettingsScreen"
import AboutScreen from "./screens/AboutScreen"
import HomeStack from "./screens/HomeStack"
import DashboardScreen from "./screens/DashboardScreen"
import AuthNavigator from "./src/navigation/AuthStack"

// Import Firebase auth instance
import { auth } from "./firebaseConfig"
import { onAuthStateChanged, type User } from "firebase/auth"

const Tab = createBottomTabNavigator()

export type AppTabParamList = {
  Shop: undefined
  HomeStack: undefined
  Profile: undefined
  About: undefined
  Settings: undefined
}

const GLOBAL_BACKGROUND_COLOR = "#f5f5f5"

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: GLOBAL_BACKGROUND_COLOR,
    card: GLOBAL_BACKGROUND_COLOR,
    primary: "#e44f31",
    border: "#e44f31",
  },
}

function AppRoutes() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user?.email || "No user")
      setUser(user)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <AuthNavigator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
          let IconComponent

          if (route.name === "Shop") {
            IconComponent = focused ? Phosphor.ShoppingCart : Phosphor.ShoppingCartSimple
          } else if (route.name === "HomeStack") {
            IconComponent = focused ? Phosphor.House : Phosphor.HouseLine
          } else if (route.name === "Profile") {
            IconComponent = focused ? Phosphor.UserCircle : Phosphor.User
          } else if (route.name === "Settings") {
            IconComponent = focused ? Phosphor.GearSix : Phosphor.Gear
          } else if (route.name === "About") {
            IconComponent = focused ? Phosphor.Info : Phosphor.Info
          } else {
            IconComponent = Phosphor.Question
          }
            return (       
            <View style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              height: 60,
              }}> 
              <IconComponent size={24} color={color} weight={focused ? "fill" : "regular"} />
            </View>
            )
          },
            tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={props.onPress}
              style={props.style}
              testID={props.testID}
              accessibilityLabel={props.accessibilityLabel}
            >
              {props.children}
            </TouchableOpacity>
          ),
          tabBarActiveTintColor: "#fff",
          tabBarPressColor: "transparent",
          tabBarInactiveTintColor: "#D1FAE5",
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: -5,
            left: 16,
            right: 16,
            elevation: 5,
            backgroundColor: 'rgba(16, 185, 129, 0.9)',
            borderRadius: 40,
            height: 70,
            paddingBottom: 6,
            paddingHorizontal: 20,
            margin: 20,
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginBottom: 4,
          marginTop: 8,
          },

        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: "Dashboard" }} />
        <Tab.Screen name="Shop" component={DashboardScreen} options={{ title: "Shop" }} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer theme={CustomTheme}>
        <StatusBar style="light" backgroundColor= "#10B981" />
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_BACKGROUND_COLOR,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GLOBAL_BACKGROUND_COLOR,
  },
  loadingText: {
    fontSize: 16,
    color: "#666666",
  },
})
