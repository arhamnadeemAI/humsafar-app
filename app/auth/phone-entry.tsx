import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/auth-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

export default function PhoneEntryScreen() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpWithPhone } = useAuth();

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert("Invalid Phone", "Please enter a valid phone number");
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Format phone number with country code
    const formattedPhone = phone.startsWith("+92") ? phone : `+92${phone.slice(-10)}`;

    const { error } = await signUpWithPhone(formattedPhone);

    if (error) {
      Alert.alert("Error", error.message || "Failed to send OTP");
      setLoading(false);
    } else {
      // Store phone for next screen
      router.push({
        pathname: "/auth/otp-verification",
        params: { phone: formattedPhone },
      });
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center gap-8">
          {/* Header */}
          <View className="items-center gap-3">
            <Text className="text-4xl font-bold text-primary">Humsafar</Text>
            <Text className="text-lg text-muted text-center">Pakistan's Trusted Carpooling App</Text>
          </View>

          {/* Phone Input Card */}
          <View className="bg-surface rounded-2xl p-6 gap-4 border border-border">
            <Text className="text-sm font-semibold text-muted uppercase tracking-wide">Phone Number</Text>

            <View className="flex-row items-center gap-2 bg-background rounded-lg px-4 py-3 border border-border">
              <Text className="text-lg font-semibold text-foreground">+92</Text>
              <TextInput
                placeholder="300 1234567"
                placeholderTextColor="#94A3B8"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                editable={!loading}
                className="flex-1 text-lg text-foreground"
              />
            </View>

            <Text className="text-xs text-muted leading-relaxed">
              We'll send you a one-time password to verify your number. Standard SMS rates may apply.
            </Text>
          </View>

          {/* Trust Message */}
          <View className="bg-primary/10 rounded-lg p-4 gap-2">
            <Text className="text-sm font-semibold text-primary">🔒 Secure Verification</Text>
            <Text className="text-xs text-foreground leading-relaxed">
              Your phone number is encrypted and only used for ride-sharing verification.
            </Text>
          </View>

          {/* Send OTP Button */}
          <Pressable
            onPress={handleSendOTP}
            disabled={loading || !phone}
            style={({ pressed }) => [
              { opacity: pressed && !loading ? 0.9 : 1 },
              { transform: [{ scale: pressed && !loading ? 0.97 : 1 }] },
            ]}
            className={`py-4 px-6 rounded-full items-center justify-center ${
              loading || !phone ? "bg-primary/50" : "bg-primary"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-lg font-semibold text-white">Send OTP</Text>
            )}
          </Pressable>

          {/* Footer */}
          <View className="items-center gap-2">
            <Text className="text-xs text-muted">By continuing, you agree to our</Text>
            <View className="flex-row gap-2">
              <Pressable>
                <Text className="text-xs text-primary font-semibold">Terms & Conditions</Text>
              </Pressable>
              <Text className="text-xs text-muted">and</Text>
              <Pressable>
                <Text className="text-xs text-primary font-semibold">Privacy Policy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
