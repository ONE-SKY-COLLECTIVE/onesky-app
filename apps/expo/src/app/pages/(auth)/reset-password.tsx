import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import icons from "~/lib/icons";

// ✅ Define form fields interface
interface FormData {
  password: string;
  confirmPassword: string;
}

// ✅ Validation Schema

const schema = yup.object().shape({
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
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit = (data: FormData): void => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
    router.push("/pages/(auth)/success");
  };

  // ✅ Form Fields Configuration
  const formFields = [
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
      <View className="p-6 block z-20" style={{ marginTop: 20 }}>
        <Link href={'/pages/(auth)/forgot-password'}> <Image source={icons.back} contentFit="cover" style={{ width: 20, height: 20 }} /></Link>
      </View>
      <View style={{ height: 300, position: "relative" }}>
        <Image source={icons.reset} contentFit="contain" style={{ width: 370, height: 300 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[
          { position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 },
          keyboardVisible ? {} : { position: "relative" },
        ]}
      >
        <View
          className="bg-white rounded-t-3xl p-3"
          style={{ marginTop: keyboardVisible ? -250 : 0 }}
        >
          <View className="my-4">
            <Text style={{ fontFamily: "Raleway" }} className="text-xl font-bold mb-2">
              Forgot password?
            </Text>
            <Text>Enter your email and we’ll send you a password reset link to your email.</Text>
          </View>

          {/* ✅ Reusable Input Fields */}
          {formFields.map(({ key, label, placeholder, icon, secure }, index) => (
            <View key={index} className="mb-4">
              <Text className="text-sm mb-1 text-[#7B7B7B]">{label}</Text>
              <View
                className={`flex-row items-center rounded-lg px-3  border ${
                  focusedField === key ? "border-[var(--bright-lime)]" : "border-gray-300"
                }`}
              >
                <Image className="w-4 h-4" source={icon} alt="An icon" style={{ width: 16, height: 16 }} />
                <Controller
                  control={control}
                  name={key as keyof FormData}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className="flex-1 ml-2 text-sm text-black focus:border-none"
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
                <Text className="text-red-500 text-xs">{errors[key as keyof FormData]?.message}</Text>
              )}
            </View>
          ))}

          {/* ✅ Submit Button */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className={`py-3 rounded-lg mt-2 text-center font-semibold transition-all ${
              isValid ? "bg-[var(--bright-lime)] text-white" : "bg-[var(--light-gray-bg)] text-[var(--light-slate-gray)]"
            }`}
            disabled={!isValid}
          >
            <Text className="text-center text-sm">Sign up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}