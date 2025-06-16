import { View, Text, ScrollView, TouchableOpacity, Image, Switch, Alert } from "react-native"
import { useState, useEffect } from "react"
import tw from "twrnc"
import { Ionicons } from "@expo/vector-icons"
import { auth } from "../firebaseConfig"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email)
              const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const userData = docSnap.data()
        setUserName(userData.name)
      }
    }
  })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth)
          } catch (error) {
            Alert.alert("Error", "Failed to logout. Please try again.")
          }
        },
      },
    ])
  }

  const menuItems = [
    { id: 1, title: "My Orders", icon: "receipt-outline", color: "#3B82F6" },
    { id: 2, title: "Wishlist", icon: "heart-outline", color: "#EC4899" },
    { id: 3, title: "Edit Profile", icon: "person-outline", color: "#10B981" },
    { id: 4, title: "Support", icon: "help-circle-outline", color: "#F59E0B" },
  ]

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header Section */}
      <View style={tw`bg-green-500 p-20 rounded-b-3xl pb-20`}>
        <View style={tw`items-center`}>
          <Image
            source={{ uri: "https://i1.sndcdn.com/artworks-000239400719-wii392-t500x500.jpg"}}
            style={tw`w-28 h-28 rounded-full border-4 border-white mb-4`}
          />
          <Text style={tw`text-white text-2xl font-bold`}>{userName || "Loading..."} </Text>
          <Text style={tw`text-white text-sm`}>{userEmail || "fuadazis@example.com"}</Text>
        </View>
      </View>

      <View style={tw`-mt-16 px-6`}>

        {/* Account Settings Card */}
        <View style={tw`bg-white rounded-2xl shadow p-5 mb-6`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Account Settings</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={tw`flex-row items-center py-4 border-b border-gray-100 last:border-b-0`}
            >
              <View
                style={[tw`w-10 h-10 rounded-full items-center justify-center mr-3`, { backgroundColor: item.color + "20" }]}
              >
                <Ionicons name={item.icon as any} size={22} color={item.color} />
              </View>
              <Text style={tw`text-gray-800 text-base flex-1`}>{item.title}</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferences */}
        <View style={tw`bg-white rounded-2xl shadow p-5 mb-6`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Preferences</Text>

          {/* Notifications */}
          <View style={tw`flex-row items-center justify-between py-3 border-b border-gray-100`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="notifications-outline" size={24} color="#3B82F6" />
              <Text style={tw`text-gray-800 text-base ml-3`}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              thumbColor="#fff"
            />
          </View>

          {/* Dark Mode */}
          <View style={tw`flex-row items-center justify-between py-3`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="moon-outline" size={24} color="#6B7280" />
              <Text style={tw`text-gray-800 text-base ml-3`}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#E5E7EB", true: "#10B981" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          style={tw`bg-red-500 rounded-full py-4 items-center shadow mb-20`}
        >
          <Text style={tw`text-white font-bold text-base`}>Sign Out</Text>
        </TouchableOpacity>

        <View style={tw`h-10`} />
      </View>
    </ScrollView>
  )
}
