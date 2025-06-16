import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native"
import tw from "twrnc"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { AuthStackParamList } from "../src/navigation/AuthStack"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Signup">

export default function SignupScreen() {
  const navigation = useNavigation<SignupScreenNavigationProp>()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "All fields are required.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.")
      return
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters.")
      return
    }

    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password)
      const user = userCredential.user

      // Simpan nama ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: email.trim(),
        createdAt: new Date(),
      })

      Alert.alert("Success", "Account created successfully!", [{ text: "OK" }])
    } catch (error: any) {
      let errorMessage = "Signup failed."
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "An account with this email already exists."
          break
        case "auth/invalid-email":
          errorMessage = "Invalid email address."
          break
        case "auth/weak-password":
          errorMessage = "Password is too weak."
          break
        default:
          errorMessage = error.message
      }
      Alert.alert("Signup Failed", errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`} contentContainerStyle={tw`flex-grow justify-center p-6`}>
      <View style={tw`items-center mb-10`}>
        <Ionicons name="person-add-outline" size={80} color="#10B981" style={tw`mb-4`} />
        <Text style={tw`text-4xl font-extrabold text-gray-800`}>Create Account</Text>
        <Text style={tw`text-lg text-gray-600`}>Join JS Store today</Text>
      </View>

      <View style={tw`bg-white rounded-xl p-8 shadow-md`}>
        {/* Name Field */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 mb-2 font-medium`}>Full Name</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-4 text-base`}
            placeholder="Your name"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
        </View>

        {/* Email Field */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 mb-2 font-medium`}>Email</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-4 text-base`}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
        </View>

        {/* Password */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 mb-2 font-medium`}>Password</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-4 text-base`}
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>

        {/* Confirm Password */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-700 mb-2 font-medium`}>Confirm Password</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-4 text-base`}
            placeholder="********"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
          />
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          style={tw`bg-green-500 rounded-lg p-4 items-center mb-4 ${loading ? "opacity-60" : ""}`}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={tw`text-white text-lg font-bold`}>Sign Up</Text>}
        </TouchableOpacity>

        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-gray-600`}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} disabled={loading}>
            <Text style={tw`text-green-600 font-bold ml-2`}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
