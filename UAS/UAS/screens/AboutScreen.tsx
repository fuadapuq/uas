import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from "react-native"
import tw from "twrnc"
import { Ionicons } from "@expo/vector-icons"

export default function AboutScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url)
  }

  const teamMembers = [
    { 
      name: "Fuad Azis", 
      role: "Founder & CEO", 
      avatar: "https://i1.sndcdn.com/artworks-000239400719-wii392-t500x500.jpg",
      link: "https://instagram.com/mfuazis"
    },
    { 
      name: "Diarboey", 
      role: "Head Marketing",
      avatar: "https://s.yimg.com/ny/api/res/1.2/oqm4Bcf2lVdqoFszBSPx_Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xNjQ2O2NmPXdlYnA-/https://media.zenfs.com/en/get_french_football_news_702/69b2453866a8857c55d13b3880eba98e",
      link: "https://instagram.com/mfuazis"

    },
    { 
      name: "Rizky Indahka", 
      role: "Store Officer",
      avatar: "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "https://instagram.com/mfuazis"
       
    },
  ]

  const features = [
    "Easy shopping experience",
    "Real-time product updates",
    "Secure transactions",
    "Wishlist and Reviews",
    "Mobile-friendly design",
    "Reliable customer support",
  ]

  return (
    <ScrollView style={tw`flex-1 bg-gray-50 pt-10`}>
      <View style={tw`p-6`}>

        {/* Header */}
        <View style={tw`bg-white rounded-xl p-6 mb-6 shadow-sm items-center`}>
          <View style={tw`w-20 h-20 bg-green-500 rounded-xl items-center justify-center mb-4`}>
            <Ionicons name="cart-outline" size={40} color="white" />
          </View>
          <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>JS Store</Text>
          <Text style={tw`text-gray-600 text-base mb-2`}>St. Manhattan Square</Text>
          <Text style={tw`text-gray-500 text-sm text-center`}>
            JS Store is a simple, fast, and modern e-commerce app built with Expo and React Native.
            Shop for the latest handphones and laptops with ease!
          </Text>
        </View>

        {/* Features */}
        <View style={tw`bg-white rounded-xl p-6 mb-6 shadow-sm`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Key Features</Text>
          {features.map((feature, index) => (
            <View key={index} style={tw`flex-row items-center py-2`}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={tw`text-gray-700 ml-3`}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Team */}
        <View style={tw`bg-white rounded-xl p-6 mb-6 shadow-sm`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Our Team</Text>
          {teamMembers.map((member, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(member.link)}

              style={tw`flex-row items-center py-3 ${index < teamMembers.length - 1 ? "border-b border-gray-100" : ""}`}
            >
            <Image
              source={{ uri: member.avatar }}
              style={tw`w-22 h-22 rounded-full mr-4 bg-gray-200`}
            />
            <View>
                <Text style={tw`text-gray-800 text-xl font-bold`}>{member.name}</Text>
                <Text style={tw`text-gray-500 text-sm`}>{member.role}</Text>
            </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact */}
        <View style={tw`bg-white rounded-xl p-6 mb-6 shadow-sm`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Contact Us</Text>

          <TouchableOpacity
            style={tw`flex-row items-center py-3 border-b border-gray-100`}
            onPress={() => openLink("https://instagram.com/mfuazis/")}
          >
            <Ionicons name="logo-instagram" size={24} color="#3B82F6" />
            <Text style={tw`text-gray-800 font-medium ml-3 flex-1`}>M. Fuad Azis</Text>
            <Ionicons name="open-outline" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center py-3 border-b border-gray-100`}
            onPress={() => openLink("https://jsstore.example.com")}
          >
            <Ionicons name="globe-outline" size={24} color="#10B981" />
            <Text style={tw`text-gray-800 font-medium ml-3 flex-1`}>www.jsstore.com</Text>
            <Ionicons name="open-outline" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center py-3`}
            onPress={() => openLink("https://github.com/fuadapuq/")}
          >
            <Ionicons name="logo-github" size={24} color="#6B7280" />
            <Text style={tw`text-gray-800 font-medium ml-3 flex-1`}>GitHub Repository</Text>
            <Ionicons name="open-outline" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Legal */}
        <View style={tw`bg-white rounded-xl p-6 mb-6 shadow-sm`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Legal</Text>

          <TouchableOpacity style={tw`flex-row items-center justify-between py-3 border-b border-gray-100`}>
            <Text style={tw`text-gray-800 font-medium`}>Privacy Policy</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={tw`flex-row items-center justify-between py-3 border-b border-gray-100`}>
            <Text style={tw`text-gray-800 font-medium`}>Terms of Service</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={tw`flex-row items-center justify-between py-3`}>
            <Text style={tw`text-gray-800 font-medium`}>Open Source Licenses</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={tw`items-center py-4`}>
          <Text style={tw`text-gray-500 text-sm text-center`}>© 2024 JS Store. All rights reserved.</Text>
          <Text style={tw`text-gray-400 text-xs text-center mt-1`}>Built with Expo & React Native</Text>
        </View>
      </View>
    </ScrollView>
  )
}
