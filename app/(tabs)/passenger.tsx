import React, { useState } from "react";
import { ScrollView, Text, View, Pressable, FlatList, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface AvailableRide {
  id: string;
  driver: string;
  driverRating: number;
  from: string;
  to: string;
  time: string;
  price: number;
  seatsAvailable: number;
  vehicle: string;
}

export default function PassengerDashboardScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [availableRides] = useState<AvailableRide[]>([
    {
      id: "1",
      driver: "Ahmed Khan",
      driverRating: 4.9,
      from: "Gulberg III",
      to: "DHA Lahore",
      time: "08:00 AM",
      price: 250,
      seatsAvailable: 2,
      vehicle: "Honda Civic",
    },
    {
      id: "2",
      driver: "Fatima Ali",
      driverRating: 4.7,
      from: "Johar Town",
      to: "Cantt",
      time: "08:15 AM",
      price: 200,
      seatsAvailable: 1,
      vehicle: "Toyota Corolla",
    },
    {
      id: "3",
      driver: "Hassan Raza",
      driverRating: 4.8,
      from: "Mall Road",
      to: "Bahria Town",
      time: "05:30 PM",
      price: 300,
      seatsAvailable: 3,
      vehicle: "Honda City",
    },
  ]);

  const handleBookRide = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Find a Ride</Text>
            <Text className="text-base text-muted">Save money on your daily commute</Text>
          </View>

          {/* Search Bar */}
          <View className="gap-3">
            <TextInput
              placeholder="Search by destination..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="bg-surface rounded-lg px-4 py-3 text-foreground border border-border"
            />
          </View>

          {/* Cost Savings Card */}
          <View className="bg-primary rounded-2xl p-6 gap-3">
            <View className="gap-1">
              <Text className="text-sm font-semibold text-white/80">Monthly Savings</Text>
              <Text className="text-3xl font-bold text-white">PKR 8,500</Text>
            </View>
            <Text className="text-xs text-white/70">
              Compared to solo commuting • 34 rides this month
            </Text>
          </View>

          {/* Available Rides Section */}
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-foreground">Available Rides</Text>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-sm font-semibold text-primary">Filter</Text>
              </Pressable>
            </View>

            {availableRides.length > 0 ? (
              <FlatList
                data={availableRides}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={handleBookRide}
                    style={({ pressed }) => [
                      { opacity: pressed ? 0.7 : 1 },
                      { transform: [{ scale: pressed ? 0.98 : 1 }] },
                    ]}
                    className="bg-surface rounded-xl p-4 mb-3 border border-border gap-3"
                  >
                    {/* Driver Info */}
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center gap-2 flex-1">
                        <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                          <Text className="text-lg">👤</Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-sm font-semibold text-foreground">
                            {item.driver}
                          </Text>
                          <Text className="text-xs text-muted">
                            {item.driverRating} ⭐ • {item.vehicle}
                          </Text>
                        </View>
                      </View>
                      <View className="items-end">
                        <Text className="text-lg font-bold text-primary">
                          PKR {item.price}
                        </Text>
                        <Text className="text-xs text-muted">per seat</Text>
                      </View>
                    </View>

                    {/* Route Info */}
                    <View className="gap-2 py-2 border-t border-b border-border">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-primary font-bold">📍</Text>
                        <Text className="text-sm text-foreground flex-1">{item.from}</Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <Text className="text-primary font-bold">📍</Text>
                        <Text className="text-sm text-foreground flex-1">{item.to}</Text>
                      </View>
                    </View>

                    {/* Time and Seats */}
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-base">🕐</Text>
                        <Text className="text-sm font-semibold text-foreground">{item.time}</Text>
                      </View>
                      <View className="bg-primary/10 px-3 py-1 rounded-full">
                        <Text className="text-xs font-semibold text-primary">
                          {item.seatsAvailable} seats
                        </Text>
                      </View>
                    </View>

                    {/* Book Button */}
                    <Pressable
                      onPress={handleBookRide}
                      style={({ pressed }) => [
                        { opacity: pressed ? 0.9 : 1 },
                        { transform: [{ scale: pressed ? 0.97 : 1 }] },
                      ]}
                      className="bg-primary rounded-lg py-2 items-center mt-1"
                    >
                      <Text className="text-white font-semibold text-sm">Book Ride</Text>
                    </Pressable>
                  </Pressable>
                )}
              />
            ) : (
              <View className="bg-surface rounded-xl p-6 items-center gap-2 border border-border">
                <Text className="text-base font-semibold text-foreground">No rides available</Text>
                <Text className="text-sm text-muted">Try searching at different times</Text>
              </View>
            )}
          </View>

          {/* Payment Reminder */}
          <View className="bg-accent/10 rounded-lg p-4 gap-2 border border-accent/20">
            <Text className="text-sm font-semibold text-accent">💳 Active Subscription</Text>
            <Text className="text-xs text-foreground leading-relaxed">
              Your weekly subscription expires in 5 days. Renew to continue booking rides.
            </Text>
            <Pressable className="mt-2">
              <Text className="text-sm font-semibold text-accent">Renew Subscription →</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
