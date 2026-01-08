import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/auth-context";
import { useLocalSearchParams, router } from "expo-router";
import * as Haptics from "expo-haptics";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [cnic, setCnic] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { completeSignUp } = useAuth();
  const { role } = useLocalSearchParams<{ role: "driver" | "passenger" }>();

  const handleSignUp = async () => {
    if (!email || !fullName || !cnic) {
      Alert.alert("Missing Information", "Please fill in all fields");
      return;
    }

    if (!agreeTerms) {
      Alert.alert("Terms Required", "Please agree to the terms and conditions");
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const { error } = await completeSignUp({
      email,
      full_name: fullName,
      cnic,
      role: role || "passenger",
    });

    if (error) {
      Alert.alert("Sign Up Failed", error.message || "Something went wrong");
      setLoading(false);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      // Navigate to dashboard based on role
      if (role === "driver") {
        router.replace("/");
      } else {
        router.replace("/");
      }
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Complete Your Profile</Text>
            <Text className="text-base text-muted">
              {role === "driver" ? "Become a Driver" : "Join as Passenger"}
            </Text>
          </View>

          {/* Form Fields */}
          <View className="gap-4">
            {/* Full Name */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Full Name</Text>
              <TextInput
                placeholder="Ahmed Ali"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
                editable={!loading}
                className="bg-surface rounded-lg px-4 py-3 text-foreground border border-border"
              />
            </View>

            {/* Email */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Email Address</Text>
              <TextInput
                placeholder="ahmed@example.com"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={!loading}
                className="bg-surface rounded-lg px-4 py-3 text-foreground border border-border"
              />
            </View>

            {/* CNIC */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">CNIC Number</Text>
              <TextInput
                placeholder="12345-6789012-3"
                placeholderTextColor="#94A3B8"
                value={cnic}
                onChangeText={setCnic}
                keyboardType="number-pad"
                editable={!loading}
                className="bg-surface rounded-lg px-4 py-3 text-foreground border border-border"
              />
              <Text className="text-xs text-muted">Format: XXXXX-XXXXXXX-X</Text>
            </View>

            {/* Driver-specific fields */}
            {role === "driver" && (
              <View className="bg-primary/10 rounded-lg p-4 gap-2 border border-primary/20">
                <Text className="text-sm font-semibold text-primary">📋 Driver Verification</Text>
                <Text className="text-xs text-foreground leading-relaxed">
                  You'll need to upload your driver's license and vehicle registration after sign up.
                </Text>
              </View>
            )}
          </View>

          {/* Terms Checkbox */}
          <View className="gap-4">
            <Pressable
              onPress={() => setAgreeTerms(!agreeTerms)}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              className="flex-row items-center gap-3"
            >
              <View
                className={`w-5 h-5 rounded border-2 items-center justify-center ${
                  agreeTerms ? "bg-primary border-primary" : "border-border"
                }`}
              >
                {agreeTerms && <Text className="text-white font-bold">✓</Text>}
              </View>
              <View className="flex-1 flex-row flex-wrap gap-1">
                <Text className="text-xs text-foreground">I agree to the</Text>
                <Pressable>
                  <Text className="text-xs text-primary font-semibold">Terms & Conditions</Text>
                </Pressable>
                <Text className="text-xs text-foreground">and</Text>
                <Pressable>
                  <Text className="text-xs text-primary font-semibold">Privacy Policy</Text>
                </Pressable>
              </View>
            </Pressable>

            {/* Sign Up Button */}
            <Pressable
              onPress={handleSignUp}
              disabled={loading || !agreeTerms}
              style={({ pressed }) => [
                { opacity: pressed && !loading ? 0.9 : 1 },
                { transform: [{ scale: pressed && !loading ? 0.97 : 1 }] },
              ]}
              className={`py-4 px-6 rounded-full items-center justify-center ${
                loading || !agreeTerms ? "bg-primary/50" : "bg-primary"
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text className="text-lg font-semibold text-white">Create Account</Text>
              )}
            </Pressable>
          </View>

          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text className="text-base text-primary font-semibold text-center">← Back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
