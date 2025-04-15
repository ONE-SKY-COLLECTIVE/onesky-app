import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import icons from "~/lib/icons";

// ✅ Define form fields interface
interface FormData {
  email: string;
  password: string;
}

// ✅ Validation Schema

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
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
  };

  // ✅ Handles OAuth login
  const handleOAuthSignIn = (provider: string) => {
    alert(`You have signed in with ${provider}`);
  };

  // ✅ Form Fields Configuration
  const formFields = [
    {
      key: "email",
      label: "Email*",
      placeholder: "johndoe@email.com",
      icon: icons.email,
    },
    {
      key: "password",
      label: "Password*",
      placeholder: "password",
      icon: icons.confirmPassword,
      secure: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 justify-between bg-[#C4EFF7]">
      <View style={{ marginTop: 50 }}>
        {" "}
        {/* Added margin top here */}
        <Image
          source={icons.login}
          contentFit="contain"
          style={{ width: 370, height: 246.4 }}
          className="z-10 block"
        />
      </View>
      <View
        className="z-20 rounded-t-3xl bg-white p-4"
        style={{ marginTop: -400 }}
      >
        {" "}
        {/* Adjust marginTop to overlap */}
        <Text
          style={{ fontFamily: "Raleway" }}
          className="mb-4 text-xl font-bold"
        >
          Login
        </Text>
        {/* ✅ Reusable Input Fields */}
        {formFields.map(({ key, label, placeholder, icon, secure }, index) => (
          <View key={index} className="mb-4">
            <Text className="mb-1 text-sm text-[#7B7B7B]">{label}</Text>
            <View
              className={`flex-row items-center rounded-lg border px-3 ${
                focusedField === key
                  ? "border-[var(--bright-lime)]"
                  : "border-gray-300"
              }`}
            >
              <Image
                className="h-4 w-4"
                source={icon}
                alt="An icon"
                style={{ width: 16, height: 16 }}
              />
              <Controller
                control={control}
                name={key as keyof FormData}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="ml-2 flex-1 text-sm text-black focus:border-none"
                    placeholder={placeholder}
                    placeholderTextColor="#B3B3B3"
                    secureTextEntry={secure}
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => setFocusedField(key)}
                    onBlur={() => setFocusedField(null)}
                  />
                )}
              />
            </View>
            {errors[key as keyof FormData] && (
              <Text className="text-xs text-red-500">
                {errors[key as keyof FormData]?.message}
              </Text>
            )}
          </View>
        ))}
        <Link
          className="mb-3 text-right text-sm underline"
          href={"/pages/(auth)/forgot-password"}
        >
          <Text>Forgot Password?</Text>
        </Link>
        {/* ✅ Submit Button */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className={`my-3 rounded-lg py-3 text-center font-semibold transition-all ${
            isValid
              ? "bg-[var(--bright-lime)] text-white"
              : "bg-[var(--light-gray-bg)] text-[var(--light-slate-gray)]"
          }`}
          disabled={!isValid}
        >
          <Text className="text-center text-sm">Login</Text>
        </Pressable>
        {/* ✅ OAuth Buttons */}
        <View className="my-3">
          <Text className="text-center text-sm uppercase text-gray-500">
            Or
          </Text>
          <Text className="mb-4 text-center text-sm text-gray-500">
            Sign up with
          </Text>
          <View className="flex-row justify-between">
            <Pressable
              onPress={() => handleOAuthSignIn("Google")}
              className="w-[45%] rounded-md border-2 border-gray-300"
            >
              <View className="flex items-center justify-center p-2">
                <Image
                  className="h-4 w-4"
                  source={icons.google}
                  style={{ width: 16, height: 16 }}
                />
                <Text className="ml-2 text-sm">Google</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => handleOAuthSignIn("Facebook")}
              className="w-[45%] rounded-md border-2 border-gray-300"
            >
              <View className="flex items-center justify-center p-2">
                <Image
                  className="mr-3 h-5 w-5"
                  source={icons.facebook}
                  style={{ width: 20, height: 20 }}
                />
                <Text className="ml-2 text-sm">Facebook</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <Text className="mt-2.5 text-center text-sm text-[var(--gray)]">
          Don’t have an account?{" "}
          <Link className="underline" href={"/pages/(auth)/register"}>
            <Text>Sign up</Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
