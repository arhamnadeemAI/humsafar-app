import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

// Custom storage adapter for Supabase with AsyncStorage fallback
const storage = {
  getItem: async (key: string) => {
    try {
      // Try SecureStore first for sensitive data
      const value = await SecureStore.getItemAsync(key);
      return value;
    } catch {
      // Fallback to AsyncStorage
      return await AsyncStorage.getItem(key);
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      // Store sensitive data in SecureStore
      await SecureStore.setItemAsync(key, value);
    } catch {
      // Fallback to AsyncStorage
      await AsyncStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      await AsyncStorage.removeItem(key);
    }
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types
export interface User {
  id: string;
  phone: string;
  email: string;
  full_name: string;
  cnic: string;
  role: "driver" | "passenger";
  profile_photo_url?: string;
  verification_status: "pending" | "verified" | "rejected";
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Route {
  id: string;
  driver_id: string;
  pickup_location: string;
  dropoff_location: string;
  departure_time: string;
  seats_available: number;
  price_per_seat: number;
  vehicle_type: "car" | "bike";
  days_of_week: string[]; // ["Monday", "Tuesday", ...]
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  route_id: string;
  passenger_id: string;
  driver_id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  pickup_location: string;
  dropoff_location: string;
  departure_time: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  subscription_type: "weekly";
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  booking_id: string;
  content: string;
  created_at: string;
}

export interface Rating {
  id: string;
  from_user_id: string;
  to_user_id: string;
  booking_id: string;
  rating: number;
  review: string;
  created_at: string;
}
