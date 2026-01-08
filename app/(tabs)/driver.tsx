import React, { useState } from "react";
import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface ActiveRide {
  id: string;
  destination: string;
  time: string;
  passengers: number;
  earnings: number;
}

export default function DriverDashboardScreen() {
  const colors = useColors();
  const [activeRides] = useState<ActiveRide[]>([
    {
      id: "1",
      destination: "DHA Lahore",
      time: "08:30 AM",
      passengers: 2,
      earnings: 500,
    },
    {
      id: "2",
      destination: "Gulberg III",
      time: "05:30 PM",
      passengers: 1,
      earnings: 300,
    },
  ]);

  const handleCreateRoute = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Welcome Back!</Text>
            <Text className="text-base text-muted">Manage your rides and earnings</Text>
          </View>

          {/* Earnings Card */}
          <View className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 gap-4">
            <View className="gap-1">
              <Text className="text-sm font-semibold text-white/80">Weekly Earnings</Text>
              <Text className="text-4xl font-bold text-white">PKR 3,200</Text>
            </View>
            <View className="flex-row justify-between pt-4 border-t border-white/20">
              <View>
                <Text className="text-xs text-white/70">Rides Completed</Text>
                <Text className="text-xl font-bold text-white">12</Text>
              </View>
              <View>
                <Text className="text-xs text-white/70">Rating</Text>
                <Text className="text-xl font-bold text-white">4.8 ⭐</Text>
              </View>
              <View>
                <Text className="text-xs text-white/70">Passengers</Text>
                <Text className="text-xl font-bold text-white">24</Text>
              </View>
            </View>
          </View>

          {/* Active Rides Section */}
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-foreground">Today's Rides</Text>
              <Pressable
                onPress={handleCreateRoute}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-sm font-semibold text-primary">+ Add Route</Text>
              </Pressable>
            </View>

            {activeRides.length > 0 ? (
              <FlatList
                data={activeRides}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={({ pressed }) => [
                      { opacity: pressed ? 0.7 : 1 },
                      { transform: [{ scale: pressed ? 0.98 : 1 }] },
                    ]}
                    className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row justify-between items-center"
                  >
                    <View className="flex-1 gap-1">
                      <Text className="text-base font-semibold text-foreground">
                        📍 {item.destination}
                      </Text>
                      <Text className="text-sm text-muted">🕐 {item.time}</Text>
                      <Text className="text-xs text-muted">
                        {item.passengers} passenger{item.passengers > 1 ? "s" : ""}
                      </Text>
                    </View>
                    <View className="items-end gap-1">
                      <Text className="text-lg font-bold text-primary">
                        PKR {item.earnings}
                      </Text>
                      <View className="bg-primary/10 px-3 py-1 rounded-full">
                        <Text className="text-xs font-semibold text-primary">Active</Text>
                      </View>
                    </View>
                  </Pressable>
                )}
              />
            ) : (
              <View className="bg-surface rounded-xl p-6 items-center gap-2 border border-border">
                <Text className="text-base font-semibold text-foreground">No rides scheduled</Text>
                <Text className="text-sm text-muted">Create a route to get started</Text>
              </View>
            )}
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Quick Actions</Text>
            <View className="flex-row gap-3">
              <Pressable
                onPress={handleCreateRoute}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.9 : 1 },
                  { transform: [{ scale: pressed ? 0.97 : 1 }] },
                ]}
                className="flex-1 bg-primary rounded-lg py-3 items-center"
              >
                <Text className="text-white font-semibold">Create Route</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.9 : 1 },
                  { transform: [{ scale: pressed ? 0.97 : 1 }] },
                ]}
                className="flex-1 bg-surface border border-border rounded-lg py-3 items-center"
              >
                <Text className="text-foreground font-semibold">View Bookings</Text>
              </Pressable>
            </View>
          </View>

          {/* Verification Status */}
          <View className="bg-warning/10 rounded-lg p-4 gap-2 border border-warning/20">
            <Text className="text-sm font-semibold text-warning">⚠️ Verification Pending</Text>
            <Text className="text-xs text-foreground leading-relaxed">
              Upload your driver's license and vehicle registration to start accepting rides.
            </Text>
            <Pressable className="mt-2">
              <Text className="text-sm font-semibold text-warning">Complete Verification →</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
