import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link, router } from "expo-router";

// ✅ Define form fields interface
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

// ✅ Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function ExpoForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const onSubmit = (data: FormData): void => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
    router.push('/pages/Homepage')
  };

  // ✅ Handles OAuth login
  const handleOAuthSignIn = (provider: string) => {
    alert(`You have signed in with ${provider}`);
    router.push('/pages/Homepage')
  };

  // ✅ Form Fields Configuration
  const formFields = [
   
    { name: "email", placeholder: "Enter your email", icon: "email" },
    { name: "password", placeholder: "Enter your password", icon: "lock", secure: true },
    
  ];

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-6">Login</Text>

      {/* ✅ Reusable Input Fields */}
      {formFields.map(({ name, placeholder, icon, secure }, index) => (
        <View key={index} className="mb-4">
          <Text className="text-base font-semibold mb-1 capitalize">{name.replace("confirmPassword", "Confirm Password")}</Text>
          <View
            className={`flex-row items-center rounded-lg px-3 py-2 border ${
              focusedField === name ? "border-green-400" : "border-gray-300"
            }`}
          >
            <Icon name={icon} size={20} color="#888" />
            <Controller
              control={control}
              name={name as keyof FormData}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="flex-1 ml-2 text-base text-black focus:border-none"
                  placeholder={placeholder}
                  placeholderTextColor="#888"
                  secureTextEntry={secure}
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => setFocusedField(null)}
                />
              )}
            />
          </View>
          {errors[name as keyof FormData] && <Text className="text-red-500">{errors[name as keyof FormData]?.message}</Text>}
        </View>
      ))}

     <Link className="underline text-right capitalize" href={'/pages/(auth)/ForgotPassword'}>Forgot Password?</Link>
      
      {/* ✅ Submit Button */}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        className={`py-3 rounded-lg mt-4 text-center font-semibold transition-all ${
          isValid ? "bg-green-400 text-white" : "bg-gray-300 text-gray-600"
        }`}
        disabled={!isValid}
      >
        <Text className="text-center font-semibold">Login</Text>
      </Pressable>

      {/* ✅ OAuth Buttons */}
      <View className="mt-6">
        <Text className="text-center text-gray-500 mb-4">Or sign in with</Text>
        <View className="flex-row justify-center space-x-4">
          <Pressable
            onPress={() => handleOAuthSignIn("Google")}
            className="bg-red-500 py-3 px-6 rounded-lg"
          >
            <Text className="text-white font-semibold">Google</Text>
          </Pressable>
          <Pressable
            onPress={() => handleOAuthSignIn("Facebook")}
            className="bg-blue-600 py-3 px-6 rounded-lg"
          >
            <Text className="text-white font-semibold">Facebook</Text>
          </Pressable>
        </View>
      </View>
      <Text>Don’t have an account? <Link href={'/pages/(auth)/Register'}>Sign up</Link></Text>
    </View>
  );
}
