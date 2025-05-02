import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import icons from "~/lib/icons";

// ✅ Define form fields interface
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ✅ Validation Schema

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit = (data: FormData): void => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
    router.push("/pages/(auth)/email-verification");
  };

  // ✅ Handles OAuth login
  const handleOAuthSignIn = (provider: string) => {
    alert(`You have signed in with ${provider}`);
  };

  // ✅ Form Fields Configuration
  const formFields = [
    {
      key: "name",
      label: "Username*",
      placeholder: "username",
      icon: icons.user,
    },
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
    {
      key: "confirmPassword",
      label: "Confirm Password*",
      placeholder: "password",
      icon: icons.confirmPassword,
      secure: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#C4EFF7]">
      <View style={{ height: 100, position: "relative", marginTop: 40 }}>
        <Image
          source={icons.register}
          alt="Hero image"
          contentFit="cover"
          style={{ width: '100%', height: 100 }}
          className="z-10 block w-full absolute"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[
            { position: "relative", bottom: 0, left: 0, right: 0, zIndex: 10 },
            keyboardVisible ? {} : { position: "relative" },
          ]}
        >
          <View
            className="h-[90vh] rounded-t-3xl bg-white p-4"
            style={{ marginTop: keyboardVisible ? -110 : -30 }}
          >
            <Text
              style={{ fontFamily: "Raleway" }}
              className="mb-4 text-xl font-bold"
            >
              Welcome
            </Text>

            {/* ✅ Reusable Input Fields */}
            {formFields.map(
              ({ key, label, placeholder, icon, secure }, index) => (
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
                          className="ml-2 flex-1 text-sm text-black focus:border-none p-2"
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
              ),
            )}

            {/* ✅ Submit Button */}
            <Pressable
              onPress={handleSubmit(onSubmit)}
              className={`mt-6 rounded-lg py-3 text-center font-semibold transition-all ${
                isValid
                  ? "bg-[var(--bright-lime)] text-white"
                  : "bg-[var(--light-gray-bg)] text-[var(--light-slate-gray)]"
              }`}
              disabled={!isValid}
            >
              <Text className="text-center text-sm">Sign up</Text>
            </Pressable>

            {/* ✅ OAuth Buttons */}
            <View className="mt-5">
              <Text className="text-center text-sm uppercase text-gray-500">
                Or
              </Text>
              <Text className="mb-4 text-center text-sm text-gray-500">
                Sign up with
              </Text>
              <View className="flex-row justify-between">
                <Pressable
                  onPress={() => handleOAuthSignIn("Google")}
                  className="w-[31%] rounded-md border-2 border-gray-300"
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
                  className="w-[31%] rounded-md border-2 border-gray-300"
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
                <Pressable
                  onPress={() => handleOAuthSignIn("Apple")}
                  className="w-[31%] rounded-md border-2 border-gray-300"
                >
                  <View className="flex items-center justify-center p-2">
                    <Image
                      className="mr-3 h-5 w-5"
                      source={icons.apple}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text className="ml-2 text-sm">Apple</Text>
                  </View>
                </Pressable>
                
              </View>
            </View>

            <Text className="mt-4 text-center text-sm text-[var(--gray)]">
              Already have an account?{" "}
              <Link className="underline" href={"/pages/(auth)/login"}>
                Sign in
              </Link>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
