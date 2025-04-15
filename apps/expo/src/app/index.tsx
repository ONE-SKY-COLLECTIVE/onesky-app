import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  Easing,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { useSignIn, useSignOut, useUser } from "~/utils/auth";
import Onboarding from "./pages/Onboarding";

function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
  onDelete: () => void;
}) {
  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/post/[id]",
            params: { id: props.post.id },
          }}
        >
          <Pressable className="">
            <Text className="text-xl font-semibold text-primary">
              {props.post.title}
            </Text>
            <Text className="mt-2 text-foreground">{props.post.content}</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className="font-bold uppercase text-primary">Delete</Text>
      </Pressable>
    </View>
  );
}

function CreatePost() {
  const utils = api.useUtils();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.post.all.invalidate();
    },
  });

  return (
    <View className="mt-4 flex gap-2">
      <TextInput
        className="items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="mb-2 text-destructive">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className="items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-destructive">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <Pressable
        className="flex items-center rounded bg-primary p-2"
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text className="text-foreground">Create</Text>
      </Pressable>
      {error?.data?.code === "UNAUTHORIZED" && (
        <Text className="mt-2 text-destructive">
          You need to be logged in to create a post
        </Text>
      )}
    </View>
  );
}

function MobileAuth() {
  const user = useUser();
  const signIn = useSignIn();
  const signOut = useSignOut();

  return (
    <>
      <Text className="pb-2 text-center text-xl font-semibold text-white">
        {user?.name ?? "Not logged in"}
      </Text>
      <Button
        onPress={() => (user ? signOut() : signIn())}
        title={user ? "Sign Out" : "Sign In With Discord"}
        color={"#5B65E9"}
      />
    </>
  );
}

const SplashScreen = () => {
  const { width } = Dimensions.get("window");
  const cloudPosition = useRef(new Animated.Value(width)).current;
  const cloudPosition2 = useRef(new Animated.Value(width)).current;
  const cloudPosition3 = useRef(new Animated.Value(width)).current;
  const cloudPosition4 = useRef(new Animated.Value(width)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateCloud = () => {
      cloudPosition.setValue(width);

      Animated.timing(cloudPosition, {
        toValue: -200,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    const animateCloudOthers = () => {
      cloudPosition2.setValue(width);
      cloudPosition3.setValue(width);
      cloudPosition4.setValue(width);

      Animated.timing(cloudPosition2, {
        toValue: -50,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(cloudPosition3, {
        toValue: 300,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(cloudPosition4, {
        toValue: -50,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: true,
    }).start();

    animateCloud();
    setTimeout(() => {
      animateCloudOthers();
    }, 2000);
  }, []);

  return (
    <View className="blue-bg-300 h-full w-full p-4">
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="my-auto self-center"
      >
        <Image
          source={require("../../assets/icons/oneskylogo.png")}
          className="my-auto self-center"
        />
      </Animated.View>
      <View className="absolute top-[350px]">
        <Animated.View style={{ transform: [{ translateX: cloudPosition }] }}>
          <Image
            source={require("../../assets/icons/cloud1.png")}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      <View className="absolute top-[220px]">
        <Animated.View style={{ transform: [{ translateX: cloudPosition2 }] }}>
          <Image
            source={require("../../assets/icons/cloud2.png")}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      <View className="absolute top-[250px]">
        <Animated.View style={{ transform: [{ translateX: cloudPosition3 }] }}>
          <Image
            source={require("../../assets/icons/cloud3.png")}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      <View className="absolute top-[600px]">
        <Animated.View style={{ transform: [{ translateX: cloudPosition2 }] }}>
          <Image
            source={require("../../assets/icons/cloud4.png")}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default function Index() {
  const utils = api.useUtils();

  const postQuery = api.post.all.useQuery();

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate(),
  });

  const [isSplashVisible, setIsSplashVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 8000);
  }, []);
  return isSplashVisible ? <SplashScreen /> : <Onboarding />;
}
