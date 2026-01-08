import React, { useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<"driver" | "passenger" | null>(null);

  const handleRoleSelect = (role: "driver" | "passenger") => {
    setSelectedRole(role);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleContinue = () => {
    if (selectedRole) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push({
        pathname: "/auth/signup",
        params: { role: selectedRole },
      });
    }
  };

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center gap-8">
          {/* Header */}
          <View className="items-center gap-3">
            <Text className="text-3xl font-bold text-foreground">Choose Your Role</Text>
            <Text className="text-base text-muted text-center">
              Are you looking to share rides or offer rides?
            </Text>
          </View>

          {/* Role Cards */}
          <View className="gap-4">
            {/* Driver Card */}
            <Pressable
              onPress={() => handleRoleSelect("driver")}
              style={({ pressed }) => [
                { opacity: pressed ? 0.9 : 1 },
                { transform: [{ scale: pressed ? 0.98 : 1 }] },
              ]}
              className={`rounded-2xl p-6 border-2 gap-4 ${
                selectedRole === "driver"
                  ? "bg-primary/10 border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <View className="gap-2">
                <Text className="text-2xl font-bold text-foreground">🚗 Driver</Text>
                <Text className="text-sm text-muted leading-relaxed">
                  Offer rides on your regular routes and earn money by sharing fuel costs with passengers.
                </Text>
              </View>

              <View className="gap-2 pt-2 border-t border-border">
                <View className="flex-row items-center gap-2">
                  <Text className="text-primary font-semibold">✓</Text>
                  <Text className="text-xs text-foreground">Earn extra income</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-primary font-semibold">✓</Text>
                  <Text className="text-xs text-foreground">Set your own schedule</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-primary font-semibold">✓</Text>
                  <Text className="text-xs text-foreground">Meet new people</Text>
                </View>
              </View>

              {selectedRole === "driver" && (
                <View className="bg-primary/20 rounded-lg px-3 py-2">
                  <Text className="text-xs font-semibold text-primary">Selected</Text>
                </View>
              )}
            </Pressable>

            {/* Passenger Card */}
            <Pressable
              onPress={() => handleRoleSelect("passenger")}
              style={({ pressed }) => [
                { opacity: pressed ? 0.9 : 1 },
                { transform: [{ scale: pressed ? 0.98 : 1 }] },
              ]}
              className={`rounded-2xl p-6 border-2 gap-4 ${
                selectedRole === "passenger"
                  ? "bg-primary/10 border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <View className="gap-2">
                <Text className="text-2xl font-bold text-foreground">👥 Passenger</Text>
                <Text className="text-sm text-muted leading-relaxed">
                  Find affordable rides from verified drivers on your commute route and split costs.
                </Text>
              </View>

              <View className="gap-2 pt-2 border-t border-border">
                <View className="flex-row items-center gap-2">
                  <Text className="text-primary font-semibold">✓</Text>
                  <Text className="text-xs text-foreground">Save on commute costs</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-primary font-semibold">✓</Text>
                  <Text className="text-xs text-foreground">Verified drivers only</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-primary font-semibold">✓</Text>
                  <Text className="text-xs text-foreground">Flexible booking</Text>
                </View>
              </View>

              {selectedRole === "passenger" && (
                <View className="bg-primary/20 rounded-lg px-3 py-2">
                  <Text className="text-xs font-semibold text-primary">Selected</Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* Continue Button */}
          <Pressable
            onPress={handleContinue}
            disabled={!selectedRole}
            style={({ pressed }) => [
              { opacity: pressed && selectedRole ? 0.9 : 1 },
              { transform: [{ scale: pressed && selectedRole ? 0.97 : 1 }] },
            ]}
            className={`py-4 px-6 rounded-full items-center justify-center ${
              selectedRole ? "bg-primary" : "bg-primary/50"
            }`}
          >
            <Text className="text-lg font-semibold text-white">Continue</Text>
          </Pressable>

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
