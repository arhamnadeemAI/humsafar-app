import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/auth-context";
import { useLocalSearchParams, router } from "expo-router";
import * as Haptics from "expo-haptics";

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { verifyOTP } = useAuth();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit code");
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const { error } = await verifyOTP(phone || "", otp);

    if (error) {
      Alert.alert("Verification Failed", error.message || "Invalid OTP code");
      setLoading(false);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.push("/auth/role-selection");
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    setCanResend(false);
    setResendTimer(30);
    setOtp("");
    // Resend OTP logic here
  };

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center gap-8">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Verify Your Number</Text>
            <Text className="text-base text-muted text-center">
              We sent a code to {phone}
            </Text>
          </View>

          {/* OTP Input Card */}
          <View className="bg-surface rounded-2xl p-6 gap-4 border border-border">
            <Text className="text-sm font-semibold text-muted uppercase tracking-wide">Enter Code</Text>

            <View className="bg-background rounded-lg px-4 py-3 border border-border">
              <TextInput
                placeholder="000000"
                placeholderTextColor="#94A3B8"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                editable={!loading}
                className="text-2xl font-bold text-foreground text-center tracking-widest"
              />
            </View>

            <Text className="text-xs text-muted text-center leading-relaxed">
              This code will expire in {resendTimer} seconds
            </Text>
          </View>

          {/* Verify Button */}
          <Pressable
            onPress={handleVerifyOTP}
            disabled={loading || otp.length !== 6}
            style={({ pressed }) => [
              { opacity: pressed && !loading ? 0.9 : 1 },
              { transform: [{ scale: pressed && !loading ? 0.97 : 1 }] },
            ]}
            className={`py-4 px-6 rounded-full items-center justify-center ${
              loading || otp.length !== 6 ? "bg-primary/50" : "bg-primary"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-lg font-semibold text-white">Verify</Text>
            )}
          </Pressable>

          {/* Resend Section */}
          <View className="items-center gap-2">
            <Text className="text-sm text-muted">Didn't receive the code?</Text>
            <Pressable
              onPress={handleResendOTP}
              disabled={!canResend}
              style={({ pressed }) => [
                { opacity: pressed && canResend ? 0.8 : 1 },
              ]}
            >
              <Text className={`text-base font-semibold ${canResend ? "text-primary" : "text-muted"}`}>
                {canResend ? "Resend Code" : `Resend in ${resendTimer}s`}
              </Text>
            </Pressable>
          </View>

          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text className="text-base text-primary font-semibold text-center">← Change Number</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
