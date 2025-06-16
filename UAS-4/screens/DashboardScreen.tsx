"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native"
import tw from "twrnc"
import { Ionicons } from "@expo/vector-icons"
import * as Icons from "phosphor-react-native"
import { db, auth } from "../firebaseConfig"
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

interface Order {
  id: string
  productId: number
  name: string
  price: number
  quantity: number
  total: number
  createdAt: any
}

const categories = [
  { id: "all", name: "All", icon: "grid-outline" },
  { id: "handphone", name: "Handphone", icon: "phone-portrait-outline" },
  { id: "laptop", name: "Laptop", icon: "laptop-outline" },
]

const products = [
  {
    id: 1,
    name: "iPhone 16 Plus",
    category: "handphone",
    price: 982,
    originalPrice: 1320,
    image: "https://ibox.co.id/_next/image?url=https%3A%2F%2Fcdnpro.eraspace.com%2Fmedia%2Fcatalog%2Fproduct%2Fi%2Fp%2Fiphone_16_plus_ultramarine_01_2_1.jpg&w=1920&q=45",
    rating: 4.8,
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
    name: "iPhone 16e",
    category: "handphone",
    price: 650,
    originalPrice: 800,
    image: "https://ibox.co.id/_next/image?url=https%3A%2F%2Fcdnpro.eraspace.com%2Fpub%2Fmedia%2Fcatalog%2Fproduct%2Fi%2Fp%2Fiphone_16e_white_01_3.jpg&w=1920&q=75",
    rating: 4.6,
    isNew: true,
  },
  {
    id: 4,
    name: "13-inch MacBook Air (M1 Chip)",
    category: "laptop",
    price: 675,
    originalPrice: 2850,
    image: "https://cdnpro.eraspace.com/media/catalog/product/m/a/macbook_air_m1_space_gray_1.jpg",
    rating: 4.7,
    isNew: false,
  },
  {
    id: 5,
    name: "15-inch MacBook Air",
    category: "laptop",
    price: 1289,
    originalPrice: 120,
    image: "https://cdnpro.eraspace.com/media/catalog/product/a/p/apple_macbook_air_15.3_inci_m4_2025_sky_blue_1_2.jpg",
    rating: 4.9,
    isNew: false,
  },
  {
    id: 6,
    name: "16-inch MacBook Pro M4 Max",
    category: "laptop",
    price: 3651,
    originalPrice: 3859,
    image: "https://cdnpro.eraspace.com/media/catalog/product/m/a/macbook_pro_16-inch_m4_pro_or_max_chip_space_black_1_new_2.jpg",
    rating: 4.4,
    isNew: true,
  },
{
  id: 7,
  name: "Samsung Galaxy S24 Ultra",
  category: "handphone",
  price: 1199,
  originalPrice: 1399,
  image: "https://images.samsung.com/id/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-kv.jpg",
  rating: 4.8,
  isNew: true,
},
{
  id: 8,
  name: "Samsung Galaxy Z Fold5",
  category: "handphone",
  price: 1799,
  originalPrice: 1999,
  image: "https://images.samsung.com/is/image/samsung/p6pim/id/sm-f956bzsdxid/gallery/id-galaxy-z-fold6-f956-514107-sm-f956bzsdxid-thumb-542639724?$216_216_PNG$",
  rating: 4.6,
  isNew: false,
},
{
  id: 9,
  name: "Samsung Galaxy A55 5G",
  category: "handphone",
  price: 499,
  originalPrice: 549,
  image: "https://images.samsung.com/is/image/samsung/p6pim/id/sm-a566blitxid/gallery/id-galaxy-a56-5g-sm-a566-sm-a566blitxid-thumb-545367485?$216_216_PNG$",
  rating: 4.4,
  isNew: true,
},
{
  id: 10,
  name: "Samsung Z Flip6",
  category: "handphone",
  price: 699,
  originalPrice: 799,
  image: "https://images.samsung.com/is/image/samsung/p6pim/id/sm-f741bzsexid/gallery/id-galaxy-zflip6-f741-513509-sm-f741bzsexid-thumb-542636379?$216_216_PNG$",
  rating: 4.7,
  isNew: false,
},
{
  id: 11,
  name: "ROG Phone 9 Ultimate",
  category: "handphone",
  price: 1099,
  originalPrice: 1299,
  image: "https://cdnpro.eraspace.com/media/catalog/product/a/s/asus_rog_phone_9_fe_black_01.jpg",
  rating: 4.9,
  isNew: true,
},
{
  id: 12,
  name: "ROG Phone 6 Pro",
  category: "handphone",
  price: 899,
  originalPrice: 1049,
  image: "https://cdnpro.eraspace.com/media/catalog/product/a/s/asus_rog_phone_6_phantom_black_1_1.jpg",
  rating: 4.5,
  isNew: false,
},
{
  id: 13,
  name: "ASUS ROG Zephyrus G14",
  category: "laptop",
  price: 1599,
  originalPrice: 1799,
  image: "https://id.store.asus.com/media/catalog/product/z/e/zephyrus_g14_grey_02.png?width=439&height=439&store=id_ID&image-type=image",
  rating: 4.8,
  isNew: true,
},
{
  id: 14,
  name: "ASUS ROG Strix G17",
  category: "laptop",
  price: 1899,
  originalPrice: 1999,
  image: "https://dlcdnwebimgs.asus.com/gain/36EB3407-3A9F-49BB-84BC-942642011B4A/w185/fwebp",
  rating: 4.6,
  isNew: false,
},
{
  id: 15,
  name: "ASUS ROG Flow Z13",
  category: "laptop",
  price: 2099,
  originalPrice: 2299,
  image: "https://dlcdnwebimgs.asus.com/gain/3807C3DE-E52C-4B4A-B807-1E1E20161764/w185/fwebp",
  rating: 4.7,
  isNew: true,
},
{
  id: 16,
  name: "ASUS ROG Zephyrus Duo 16",
  category: "laptop",
  price: 3599,
  originalPrice: 3799,
  image: "https://id.store.asus.com/media/catalog/product/z/e/zephyrus_g14_grey_02.png?width=439&height=439&store=id_ID&image-type=image",
  rating: 4.9,
  isNew: false,
},
{
  id: 17,
  name: "ASUS ROG Strix Scar 15",
  category: "laptop",
  price: 2399,
  originalPrice: 2599,
  image: "https://dlcdnwebimgs.asus.com/gain/65D421F6-2A1E-49B7-881E-4877752411A0/w185/fwebp",
  rating: 4.5,
  isNew: true,
},
{
  id: 18,
  name: "ASUS ROG Strix G16",
  category: "laptop",
  price: 1799,
  originalPrice: 1999,
  image: "https://dlcdnwebimgs.asus.com/gain/30B02883-1847-4CA8-80AC-393A69BB7CD2/w185/fwebp",
  rating: 4.7,
  isNew: true,
}

]

export default function DashboardScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [modalVisible, setModalVisible] = useState(false)
  const [cartModalVisible, setCartModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [cartLoading, setCartLoading] = useState(false)

  const [reviewModalVisible, setReviewModalVisible] = useState(false)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)

  const [wishlistModalVisible, setWishlistModalVisible] = useState(false)
  const [reviewListModalVisible, setReviewListModalVisible] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])

  const fetchWishlist = async () => {
  if (!currentUser?.uid) return
  try {
    const q = query(collection(db, "wishlists"), where("userId", "==", currentUser.uid))
    const snapshot = await getDocs(q)
    const items: any[] = []
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() })
    })
    setWishlistItems(items)
  } catch (error) {
    console.error("Error fetching wishlist:", error)
  }
}

const fetchReviews = async () => {
  if (!currentUser?.uid) return
  try {
    const q = query(collection(db, "reviews"), where("userId", "==", currentUser.uid), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    const items: any[] = []
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() })
    })
    setReviews(items)
  } catch (error) {
    console.error("Error fetching reviews:", error)
  }
}


  useEffect(() => {
    return onAuthStateChanged(auth, setCurrentUser)
  }, [])

  useEffect(() => {
    if (currentUser) {
      fetchOrders()
    }
  }, [currentUser])

  const fetchOrders = async () => {
    if (!currentUser?.uid) return

    setCartLoading(true)
    try {
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
      )
      const querySnapshot = await getDocs(q)
      const ordersList: Order[] = []
      querySnapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() } as Order)
      })
      setOrders(ordersList)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setCartLoading(false)
    }
  }

  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setQuantity(1)
    setModalVisible(true)
  }

  const closeProductModal = () => {
    setModalVisible(false)
    setSelectedProduct(null)
    setQuantity(1)
  }

  const handlePurchase = async () => {
    if (!currentUser?.uid || typeof currentUser.uid !== "string") {
      Alert.alert("Error", "Invalid user ID.")
      return
    }

    setLoading(true)
    try {
      await addDoc(collection(db, "transactions"), {
        userId: currentUser.uid,
        productId: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity,
        total: selectedProduct.price * quantity,
        createdAt: Timestamp.now(),
      })

      Alert.alert("Success", "Purchase successful!")
      closeProductModal()
      fetchOrders() 
    } catch (err) {
      console.log("Error saat record transaction:", err)
      Alert.alert("Error", "Failed to record transaction.")
    }
    setLoading(false)
  }

  const handleAddToWishlist = async (product: any) => {
  if (!currentUser?.uid || typeof currentUser.uid !== "string") {
    Alert.alert("Error", "Invalid user ID.")
    return
  }

  try {
    await addDoc(collection(db, "wishlists"), {
      userId: currentUser.uid,
      productId: product.id,
      name: product.name,
      price: product.price,
      addedAt: Timestamp.now(),
    })
    Alert.alert("Success", "Added to wishlist!")
  } catch (err) {
    console.error("Error adding to wishlist:", err)
    Alert.alert("Error", "Failed to add to wishlist.")
  }
}

const handleSubmitReview = async () => {
  if (!currentUser?.uid || typeof currentUser.uid !== "string") {
    Alert.alert("Error", "Invalid user ID.")
    return
  }

  if (!selectedProduct || !comment.trim()) {
    Alert.alert("Error", "Please select a product and write a comment.")
    return
  }

  try {
    await addDoc(collection(db, "reviews"), {
      userId: currentUser.uid,
      productId: selectedProduct.id,
      rating,
      comment: comment.trim(),
      createdAt: Timestamp.now(),
    })
    Alert.alert("Success", "Review submitted!")
    setReviewModalVisible(false)
    setRating(0)
    setComment("")
  } catch (err) {
    console.error("Error submitting review:", err)
    Alert.alert("Error", "Failed to submit review.")
  }
}

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory.toLowerCase())

  const featuredProducts = products.filter((product) => product.isNew).slice(0, 3)

  const getTotalItems = () => {
    return orders.reduce((total, order) => total + order.quantity, 0)
  }

  const getTotalAmount = () => {
    return orders.reduce((total, order) => total + order.total, 0)
  }

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100`}>
      <View style={tw`flex-row justify-between items-start mb-2`}>
        <Text style={tw`text-gray-800 font-semibold text-base flex-1`} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={tw`text-black font-bold text-lg ml-2`}>${item.total}</Text>
      </View>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-gray-600 text-sm`}>
          ${item.price} × {item.quantity}
        </Text>
        <Text style={tw`text-gray-500 text-xs`}>{item.createdAt?.toDate?.()?.toLocaleDateString() || "Recently"}</Text>
      </View>
    </View>
  )

  return (
    <>
      <ScrollView style={tw`flex-1 bg-gray pt-8`} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={tw`bg-white px-6 pt-4 pb-6`}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <View>
              <Text style={tw`text-2xl font-bold text-gray-800`}>JS Store</Text>
              <Text style={tw`text-gray-600`}>Powering Your Digital Life</Text>
            </View>
            <View style={tw`flex-row items-center`}>
            <TouchableOpacity style={tw`relative`} onPress={() => setCartModalVisible(true)}>
              <Ionicons name="bag-outline" size={30} color="#000" />
              {getTotalItems() > 0 && (
                <View style={tw`absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full items-center justify-center`}>
                  <Text style={tw`text-white text-xs font-bold`}>{getTotalItems()}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={tw`ml-4`} onPress={() => { setWishlistModalVisible(true); fetchWishlist() }}>
              <Ionicons name="heart-outline" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`ml-4`} onPress={() => { setReviewListModalVisible(true); fetchReviews() }}>
              <Ionicons name="chatbubble-ellipses-outline" size={30} color="#000" />
            </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={tw`flex-row items-center bg-gray-100 rounded-xl px-4 py-3`}>
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              placeholder="Search products..."
              style={tw`flex-1 ml-3 text-gray-800`}
              placeholderTextColor="#666"
            />
            <TouchableOpacity>
              <Ionicons name="options-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Banner */}
        <View style={tw`mx-6 mb-6`}>
          <View style={[tw`rounded-2xl p-6 relative overflow-hidden`, { backgroundColor: '#10B981' }]}>
            <View style={tw`absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16`} />
            <Text style={tw`text-white text-2xl font-bold mb-2`}>Special Offers</Text>
            <Text style={tw`text-white text-lg mb-4 opacity-90`}>Up to 50% off on selected items</Text>
            <TouchableOpacity style={tw`bg-white px-6 py-3 rounded-full self-start`}>
              <Text style={tw`text-green-600 font-bold`}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-xl font-bold text-gray-800 px-6 mb-4`}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`px-6`}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  tw`mr-4 items-center px-4 py-3 rounded-xl shadow-sm min-w-20`,
                  selectedCategory === category.name && { backgroundColor: '#10B981' },
                  selectedCategory !== category.name && tw`bg-white`,
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >

                <Ionicons
                  name={category.icon as any}
                  size={24}
                  color={selectedCategory === category.name ? "white" : "#666"}
                />
                <Text
                  style={tw`text-sm font-medium mt-2 ${
                    selectedCategory === category.name ? "text-white" : "text-gray-600"
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        {selectedCategory === "All" && (
          <View style={tw`mb-6`}>
            <View style={tw`flex-row items-center justify-between px-6 mb-4`}>
              <Text style={tw`text-xl font-bold text-gray-800`}>New Arrivals</Text>
              <TouchableOpacity>
                <Text style={tw`text-blue-600 font-medium`}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`px-6`}>
              {featuredProducts.map((product) => (
                <TouchableOpacity key={product.id} style={tw`mr-4 w-40`} onPress={() => openProductModal(product)}>
                  <View style={tw`bg-white rounded-xl p-4 shadow-sm`}>
                    <View style={tw`relative`}>
                      <Image source={{ uri: product.image }} style={tw`w-full h-32 rounded-lg bg-gray-100`} />
                      {product.isNew && (
                        <View style={tw`absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full`}>
                          <Text style={tw`text-white text-xs font-bold`}>NEW</Text>
                        </View>
                      )}
                      <TouchableOpacity
                        style={tw`absolute top-2 right-2 bg-white w-8 h-8 rounded-full items-center justify-center`}
                      >
                        <Ionicons name="heart-outline" size={16} color="#666" />
                      </TouchableOpacity>
                    </View>
                    <Text style={tw`text-gray-800 font-medium mt-3 text-sm`} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <View style={tw`flex-row items-center mt-1`}>
                      <Ionicons name="star" size={12} color="#FFC107" />
                      <Text style={tw`text-gray-600 text-xs ml-1`}>{product.rating}</Text>
                    </View>
                    <View style={tw`flex-row items-center mt-2`}>
                      <Text style={tw`text-black font-bold text-lg`}>${product.price}</Text>
                      <Text style={tw`text-gray-400 text-sm line-through ml-2`}>${product.originalPrice}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Products Grid */}
        <View style={tw`px-6 mb-6`}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-xl font-bold text-gray-800`}>
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </Text>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity style={tw`mr-3`}>
                <Ionicons name="swap-vertical-outline" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="grid-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`flex-row flex-wrap justify-between`}>
            {filteredProducts.map((product) => (
              <TouchableOpacity onPress={() => openProductModal(product)} key={product.id} style={tw`w-[48%] mb-4`}>
                <View style={tw`bg-white rounded-xl p-4`}>
                  <View style={tw`relative`}>
                    <Image source={{ uri: product.image }} style={tw`w-full h-40 rounded-lg bg-gray-100`} />
                    {product.isNew && (
                      <View style={tw`absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full`}>
                        <Text style={tw`text-white text-xs font-bold`}>NEW</Text>
                      </View>
                    )}
                    <TouchableOpacity onPress={() => handleAddToWishlist(product)}
                      style={tw`absolute top-2 right-2 bg-white w-8 h-8 rounded-full items-center justify-center shadow-sm`}
                    >
                      <Ionicons name="heart-outline" size={16} color="#666" />
                    </TouchableOpacity>
                  </View>
                  <Text style={tw`text-gray-800 font-medium mt-3 text-sm`} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={tw`flex-row items-center mt-1`}>
                    <Ionicons name="star" size={12} color="#FFC107" />
                    <Text style={tw`text-gray-600 text-xs ml-1`}>{product.rating}</Text>
                  </View>
                  <View style={tw`flex-row items-center justify-between mt-2`}>
                    <View>
                      <Text style={tw`text-black font-bold text-lg`}>${product.price}</Text>
                      <Text style={tw`text-gray-400 text-sm line-through`}>${product.originalPrice}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { setSelectedProduct(product); setReviewModalVisible(true); }}>
                      <Ionicons name="chatbubble-ellipses-outline" size={30} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openProductModal(product)} style={tw`bg-black w-8 h-8 rounded-full items-center justify-center`}>
                      <Ionicons name="add" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={tw`h-20`} />
      </ScrollView>

      {/* Modal Pembelian */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeProductModal}>
        <View style={tw`flex-1 bg-black/50 justify-center items-center`}>
          <View style={tw`bg-white w-80 rounded-2xl p-6`}>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.image }} style={tw`w-full h-40 rounded-lg bg-white mb-4`} resizeMode="contain" />
                <Text style={tw`text-xl font-bold mb-2`}>{selectedProduct.name}</Text>
                <Text style={tw`text-black font-semibold text-lg mb-1`}>${selectedProduct.price}</Text>
                <Text style={tw`text-gray-500 text-sm mb-4`}>
                  Original: <Text style={tw`line-through`}>${selectedProduct.originalPrice}</Text>
                </Text>
                <Text style={tw`font-medium mb-2`}>Quantity</Text>
                <View style={tw`flex-row items-center mb-4`}>
                  <TouchableOpacity
                    style={tw`bg-gray-200 px-4 py-2 rounded-l`}
                    onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Ionicons name="remove" size={20} color="#000" />
                  </TouchableOpacity>
                  <Text style={tw`px-4 py-2 border-t border-b border-gray-300`}>{quantity}</Text>
                  <TouchableOpacity
                    style={tw`bg-gray-200 px-4 py-2 rounded-r`}
                    onPress={() => setQuantity((q) => q + 1)}
                  >
                    <Ionicons name="add" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
                <Text style={tw`mb-4`}>
                  Total: <Text style={tw`font-bold`}>${selectedProduct.price * quantity}</Text>
                </Text>
                <TouchableOpacity style={tw`bg-black rounded-xl py-3 mb-2`} onPress={handlePurchase} disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={tw`text-white text-center font-bold`}>Buy Now</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={closeProductModal}>
                  <Text style={tw`text-center text-blue-500 font-medium`}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Cart Modal */}
      <Modal
        visible={cartModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCartModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black/50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl max-h-[80%]`}>
            {/* Cart Header */}
            <View style={tw`flex-row items-center justify-between p-6 border-b border-gray-100`}>
              <Text style={tw`text-xl font-bold text-gray-800`}>Your Orders</Text>
              <TouchableOpacity onPress={() => setCartModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Cart Content */}
            {cartLoading ? (
              <View style={tw`flex-1 justify-center items-center p-6`}>
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text style={tw`text-gray-600 mt-2`}>Loading orders...</Text>
              </View>
            ) : orders.length === 0 ? (
              <View style={tw`flex-1 justify-center items-center p-6`}>
                <Ionicons name="bag-outline" size={64} color="#D1D5DB" />
                <Text style={tw`text-gray-500 text-lg font-medium mt-4`}>No orders yet</Text>
                <Text style={tw`text-gray-400 text-center mt-2`}>Start shopping to see your orders here</Text>
              </View>
            ) : (
              <>
                {/* Orders List */}
                <FlatList
                  data={orders}
                  renderItem={renderOrderItem}
                  keyExtractor={(item) => item.id}
                  style={tw`flex-1 px-6 pt-4`}
                  showsVerticalScrollIndicator={false}
                />

                {/* Cart Summary */}
                <View style={tw`p-6 border-t border-gray-100 bg-gray-50`}>
                  <View style={tw`flex-row justify-between items-center mb-2`}>
                    {/* <Text style={tw`text-gray-600 text-base`}>Produk dipilih: {selectedProduct.name}</Text> */}
                    <Text style={tw`text-gray-600 text-base`}>Total Items:</Text>
                    <Text style={tw`text-gray-800 font-semibold text-base`}>{getTotalItems()}</Text>
                  </View>
                  <View style={tw`flex-row justify-between items-center mb-4`}>
                    <Text style={tw`text-gray-800 font-bold text-lg`}>Total Amount:</Text>
                    <Text style={tw`text-black font-bold text-xl`}>${getTotalAmount()}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setCartModalVisible(false)} style={tw`bg-black rounded-xl py-4 items-center`}>
                    <Text style={tw`text-white font-bold text-lg`}>Continue Shopping</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Review Modal */}
      <Modal visible={reviewModalVisible} transparent animationType="slide" onRequestClose={() => setReviewModalVisible(false)}>
        <View style={tw`flex-1 bg-black/50 justify-center items-center`}>
          <View style={tw`bg-white w-80 rounded-2xl p-6`}>
            <Text style={tw`text-xl font-bold mb-4`}>Review {selectedProduct?.name}</Text>
            <TextInput
              placeholder="Tulis komentar..."
              value={comment}
              onChangeText={setComment}
              style={tw`border border-gray-300 rounded-xl p-3 mb-4`}
              multiline
            />
            <Text style={tw`mb-2`}>Rating: {rating} ⭐</Text>
            <View style={tw`flex-row justify-between mb-4`}>
              {[1,2,3,4,5].map((num) => (
                <TouchableOpacity key={num} onPress={() => setRating(num)}>
                  <Ionicons name={rating >= num ? "star" : "star-outline"} size={28} color="#FFC107" />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={handleSubmitReview} style={tw`bg-black rounded-xl py-3 mb-2`}>
              <Text style={tw`text-white text-center font-bold`}>Kirim Review</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setReviewModalVisible(false)}>
              <Text style={tw`text-blue-500 text-center font-medium`}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Wishlist Modal */}
      <Modal visible={wishlistModalVisible} transparent animationType="slide" onRequestClose={() => setWishlistModalVisible(false)}>
        <View style={tw`flex-1 bg-black/50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl max-h-[80%]`}>
            <View style={tw`flex-row justify-between items-center p-6 border-b border-gray-200`}>
              <Text style={tw`text-lg font-bold`}>Your Wishlist</Text>
              <TouchableOpacity onPress={() => setWishlistModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {wishlistItems.length === 0 ? (
              <View style={tw`p-6 items-center`}>
                <Text style={tw`text-gray-500`}>Your wishlist is empty.</Text>
              </View>
            ) : (
              <FlatList
                data={wishlistItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={tw`flex-row items-center p-4 border-b border-gray-100`}>
                    <Image source={{ uri: item.imageUrl }} style={tw`w-16 h-16 rounded-lg bg-gray-200`} />
                    <View style={tw`ml-4 flex-1`}>
                      <Text style={tw`text-base font-semibold`}>{item.name}</Text>
                      <Text style={tw`text-gray-600`}>${item.price}</Text>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Review Modal */}
      <Modal visible={reviewListModalVisible} transparent animationType="slide" onRequestClose={() => setReviewListModalVisible(false)}>
        <View style={tw`flex-1 bg-black/50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl max-h-[80%]`}>
            <View style={tw`flex-row justify-between items-center p-6 border-b border-gray-200`}>
              <Text style={tw`text-lg font-bold`}>My Reviews</Text>
              <TouchableOpacity onPress={() => setReviewListModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {reviews.length === 0 ? (
              <View style={tw`p-6 items-center`}>
                <Text style={tw`text-gray-500`}>You haven't submitted any reviews.</Text>
              </View>
            ) : (
              <FlatList
                data={reviews}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={tw`p-4 border-b border-gray-100`}>
                    <Text style={tw`text-base font-bold`}>{item.productId} — Rating: {item.rating}⭐</Text>
                    <Text style={tw`text-gray-600 mt-1`}>{item.comment}</Text>
                    <Text style={tw`text-gray-400 text-xs mt-1`}>{item.createdAt?.toDate?.()?.toLocaleString()}</Text>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </Modal>

    </>
  )
}
