import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native"
import tw from "twrnc"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

type HomeStackParamList = {
  HomeMain: undefined
  Dashboard: undefined
}

const { width } = Dimensions.get("window")

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  const categories = [
    { id: 1, title: "Handphone", icon: "phone-portrait-outline", color: "#3B82F6" },
    { id: 2, title: "Laptop", icon: "laptop-outline", color: "#F59E0B" },
    { id: 3, title: "Review", icon: "happy-outline", color: "#10B981" },
    { id: 4, title: "Favorites", icon: "heart-outline", color: "#EC4899" },
  ]

  const featuredProducts = [
{
  id: 1,
  name: "ASUS ROG Strix G16",
  category: "laptop",
  price: 1799,
  originalPrice: 1999,
  image: "https://dlcdnwebimgs.asus.com/gain/30B02883-1847-4CA8-80AC-393A69BB7CD2/w185/fwebp",
  rating: 4.7,
  isNew: true,
},
  {
    id: 2,
    name: "iPhone 16 Pro Max",
    category: "handphone",
    price: 1350,
    originalPrice: 1585,
    image: "https://cdnpro.eraspace.com/media/catalog/product/i/p/iphone_16_pro_max_desert_titanium_01_3.jpg",
    rating: 4.5,
    isNew: false,
  },
{
  id: 3,
  name: "ASUS ROG Zephyrus Duo 16",
  category: "laptop",
  price: 3599,
  originalPrice: 3799,
  image: "https://id.store.asus.com/media/catalog/product/z/e/zephyrus_g14_grey_02.png?width=439&height=439&store=id_ID&image-type=image",
  rating: 4.9,
  isNew: false,
},
  {
  id: 4,
  name: "Samsung Galaxy Z Fold5",
  category: "handphone",
  price: 1799,
  originalPrice: 1999,
  image: "https://images.samsung.com/is/image/samsung/p6pim/id/sm-f956bzsdxid/gallery/id-galaxy-z-fold6-f956-514107-sm-f956bzsdxid-thumb-542639724?$216_216_PNG$",
  rating: 4.6,
  isNew: false,
},
  ]

  return (
    <ScrollView style={tw`flex-1 bg-white pt-10`} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={tw`px-6 pt-4 pb-6`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View>
            <Text style={tw`text-3xl font-bold text-green-500`}>JS Store</Text>
            <Text style={tw`text-gray-600 text-base`}>Powering Your Digital Life</Text>
          </View>
          <TouchableOpacity style={tw`relative`}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
            <View style={tw`absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full`} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Banner */}
      <View style={tw`mx-6 mb-8`}>
        <View style={[tw`bg-black rounded-3xl overflow-hidden relative`, { height: 200 }]}>
          <Image
            source={{ uri: "https://assets.adidas.com/images/w_600,f_auto,q_auto/hero-banner.jpg" }}
            style={tw`absolute inset-0 w-full h-full opacity-30`}
            resizeMode="cover"
          />
          <View style={[tw`absolute inset-0 bg-opacity-40`, { backgroundColor: '#10B981' }]} />
          <View style={tw`flex-1 justify-center px-6`}>
            <Text style={tw`text-white text-3xl font-bold mb-2`}>New Collection</Text>
            <Text style={tw`text-white text-lg mb-4 opacity-90`}>Discover the latest trends</Text>
            <TouchableOpacity
              style={tw`bg-white px-8 py-3 rounded-full self-start`}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <Text style={tw`text-green-600 font-bold text-lg`}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Categories */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-2xl font-bold text-black px-6 mb-6`}>Shop by Category</Text>
        <View style={tw`flex-row justify-between px-6`}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={tw`items-center flex-1 mx-1`}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <View
                style={[
                  tw`w-16 h-16 rounded-2xl items-center justify-center mb-3`,
                  { backgroundColor: category.color + "15" },
                ]}
              >
                <Ionicons name={category.icon as any} size={28} color={category.color} />
              </View>
              <Text style={tw`text-gray-800 font-medium text-sm text-center`}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Products */}
      <View style={tw`mb-8`}>
        <View style={tw`flex-row items-center justify-between px-6 mb-6`}>
          <Text style={tw`text-2xl font-bold text-black`}>Featured Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <Text style={tw`text-blue-600 font-semibold text-base`}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`px-6`}>
          {featuredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                tw`mr-4 bg-gray-50 rounded-2xl p-4`,
                { width: width * 0.45 }
              ]}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <Image
                source={{ uri: product.image }}
                style={tw`w-full h-32 rounded-xl bg-white mb-3`}
                resizeMode="cover"
              />
              <Text style={tw`text-xs text-gray-500 uppercase tracking-wide mb-1`}>{product.category}</Text>
              <Text style={tw`text-black font-bold text-base mb-2`} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={tw`text-black font-bold text-lg`}>$ {product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trending Section */}
      <View style={tw`mx-6 mb-8`}>
        <View style={[tw`rounded-3xl p-6 relative overflow-hidden`, { backgroundColor: '#10B981' }]}>
          <View style={tw`absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16`} />
          <Text style={tw`text-white text-2xl font-bold mb-2`}>Trending Now</Text>
          <Text style={tw`text-white opacity-90 text-base mb-4`}>Get up to 50% off on selected items</Text>
          <TouchableOpacity
            style={tw`bg-white px-6 py-3 rounded-full self-start`}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={tw`text-green-600 font-bold text-base`}>Explore Deals</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={tw`px-6 mb-10`}>
        <Text style={tw`text-2xl font-bold text-black mb-6`}>Quick Actions</Text>
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            style={tw`bg-white border border-gray-200 rounded-2xl p-4 flex-1 mr-2 items-center shadow-sm`}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Ionicons name="storefront-outline" size={32} color="#3B82F6" style={tw`mb-2`} />
            <Text style={tw`text-black font-semibold text-center`}>Browse Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white border border-gray-200 rounded-2xl p-4 flex-1 ml-2 items-center shadow-sm`}
          >
            <Ionicons name="heart-outline" size={32} color="#EC4899" style={tw`mb-2`} />
            <Text style={tw`text-black font-semibold text-center`}>Wishlist</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={tw`h-20`} />
    </ScrollView>
  )
}
