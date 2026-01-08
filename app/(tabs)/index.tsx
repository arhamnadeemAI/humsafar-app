import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function HomeScreen() {
  const { user, loading, session } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        // Redirect to auth if not logged in
        router.replace("/auth/phone-entry");
      }
    }
  }, [loading, session]);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#00A86B" />
      </ScreenContainer>
    );
  }

  // This won't be shown as we redirect above
  return (
    <ScreenContainer className="items-center justify-center">
      <View />
    </ScreenContainer>
  );
}
