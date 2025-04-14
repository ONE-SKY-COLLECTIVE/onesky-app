import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image} from 'expo-image';
import icons from "~/lib/icons";


// ✅ Define form fields interface
interface FormData {
  email: string;
  password: string;
}

// ✅ Validation Schema

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
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
      <View style={{ marginTop: 50 }}> {/* Added margin top here */}
        <Image
          source={icons.login}
          contentFit="contain"
          style={{ width: 370, height: 246.4 }}
          className="block z-10"
        />
      </View>
      <View className="bg-white rounded-t-3xl p-4 z-20 " style={{ marginTop: -400 }}> {/* Adjust marginTop to overlap */}
        <Text style={{ fontFamily: 'Raleway' }} className="text-xl font-bold mb-4">
          Login
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
              <Text className="text-red-500 text-xs">
                {errors[key as keyof FormData]?.message}
              </Text>
            )}
          </View>
        ))}
        <Link className="text-right underline text-sm mb-3" href={'/pages/(auth)/forgot-password'}>
          <Text>Forgot Password?</Text>
        </Link>

        {/* ✅ Submit Button */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className={`py-3 rounded-lg my-3 text-center font-semibold transition-all ${
            isValid ? "bg-[var(--bright-lime)] text-white" : "bg-[var(--light-gray-bg)] text-[var(--light-slate-gray)]"
          }`}
          disabled={!isValid}
        >
          <Text className="text-center text-sm">Login</Text>
        </Pressable>

        {/* ✅ OAuth Buttons */}
        <View className="my-3">
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

        <Text className="text-sm mt-2.5 text-[var(--gray)] text-center">
          Don’t have an account? <Link className="underline" href={'/pages/(auth)/register'}><Text>Sign up</Text></Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}