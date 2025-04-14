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
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
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
      <View style={{ height: 100, position: "relative", marginTop:40 }}>
        <Image
          source={icons.register}
          alt="Hero image"
          contentFit="cover"
          style={{ width: 360, height: 100 }}
          className="block z-10 w-full"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[
            { position: "relative", bottom: 0, left: 0, right: 0, zIndex: 10 },
            keyboardVisible ? {} : { position: "relative" },
          ]}
        >
          <View className="bg-white rounded-t-3xl p-4 h-[90vh]" style={{ marginTop: keyboardVisible ? -110 : -30 }}>
            <Text style={{ fontFamily: "Raleway" }} className="text-xl font-bold mb-4">
              Welcome
            </Text>

            {/* ✅ Reusable Input Fields */}
            {formFields.map(({ key, label, placeholder, icon, secure }, index) => (
              <View key={index} className="mb-4 ">
                <Text className="text-sm mb-1 text-[#7B7B7B]">{label}</Text>
                <View
                  className={`flex-row items-center rounded-lg px-3  border  ${
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
              className={`py-3 rounded-lg mt-6 text-center font-semibold transition-all ${
                isValid ? "bg-[var(--bright-lime)] text-white" : "bg-[var(--light-gray-bg)] text-[var(--light-slate-gray)]"
              }`}
              disabled={!isValid}
            >
              <Text className="text-center text-sm">Sign up</Text>
            </Pressable>

            {/* ✅ OAuth Buttons */}
            <View className="mt-5">
              <Text className="text-center text-gray-500 uppercase text-sm">Or</Text>
              <Text className="text-center text-gray-500 mb-4 text-sm">Sign up with</Text>
              <View className="flex-row justify-between">
                <Pressable
                  onPress={() => handleOAuthSignIn("Google")}
                  className="rounded-md border-2 border-gray-300 w-[45%]"
                >
                  <View className="flex justify-center items-center p-2">
                    <Image className="w-4 h-4" source={icons.google} style={{ width: 16, height: 16 }} />
                    <Text className="text-sm ml-2">Google</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => handleOAuthSignIn("Facebook")}
                  className="rounded-md border-2 border-gray-300 w-[45%]"
                >
                  <View className="flex justify-center items-center p-2">
                    <Image className="w-5 h-5 mr-3" source={icons.facebook} style={{ width: 20, height: 20 }} />
                    <Text className="text-sm ml-2">Facebook</Text>
                  </View>
                </Pressable>
              </View>
            </View>

            <Text className="text-sm mt-4 text-[var(--gray)] text-center">
              Already have an account? <Link className="underline" href={"/pages/(auth)/login"}>Sign in</Link>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}