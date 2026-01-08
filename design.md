# Humsafar Mobile App - Design Document

## Overview
Humsafar is a Pakistan-centric car and bike carpooling mobile application for daily office commuters. The app enables safe, affordable, and structured ride-sharing for people working in similar locations and routes.

## Design Philosophy
- **Mobile-First**: Designed for portrait orientation (9:16) with one-handed usage in mind
- **iOS-Aligned**: Follows Apple Human Interface Guidelines for a native iOS feel
- **Trust-Focused**: Simple, transparent UI that builds confidence in a low-trust environment
- **Performance**: Fast, responsive interactions with minimal friction

---

## Screen List

### Authentication Flow
1. **Splash/Onboarding** - App intro with Humsafar branding
2. **Phone Number Entry** - User enters phone number for OTP
3. **OTP Verification** - User enters 6-digit OTP code
4. **Role Selection** - User chooses Driver or Passenger role
5. **Sign Up Form** - Role-specific form (email, name, CNIC, verification)
6. **Sign In** - Returning users login with phone + OTP
7. **Profile Completion** - Photo upload and verification

### Core Screens
8. **Driver Dashboard** - Active rides, earnings, route management
9. **Passenger Dashboard** - Available rides, bookings, saved routes
10. **Ride Details** - Full ride information, passenger/driver profile
11. **Route Management** - Create, edit, delete daily routes (Driver)
12. **Bookings** - View and manage ride bookings
13. **Chat** - In-app messaging (tied to active payment)
14. **Ratings & Reviews** - Post-ride feedback
15. **Profile** - User profile, verification status, payment method
16. **Settings** - App preferences, notifications, account management

---

## Primary Content and Functionality

### Authentication Screens
**Phone Number Entry**
- Large phone input field with Pakistan country code (+92)
- Clear CTA button "Send OTP"
- Trust messaging: "Secure verification"

**OTP Verification**
- 6 digit OTP input (auto-focus on digits)
- Resend option after 30 seconds
- Back button to re-enter phone number

**Role Selection**
- Two large cards: "Driver" and "Passenger"
- Brief descriptions of each role
- Visual icons for clarity

**Sign Up Form**
- Email field
- Full name field
- CNIC (National ID) field
- Phone number (pre-filled, editable)
- Terms & Conditions checkbox
- "Create Account" button

**Sign In**
- Phone number field
- "Send OTP" button
- "Don't have an account?" link to sign up

### Driver Dashboard
- **Header**: Earnings summary, verification badge
- **Active Rides Section**: List of upcoming rides with passenger count
- **Route Management**: Quick access to create/edit routes
- **Statistics**: Weekly earnings, rides completed, rating
- **Action Buttons**: Create new route, view bookings

### Passenger Dashboard
- **Search Bar**: Search by route, destination, time
- **Available Rides**: List of rides with driver info, price, seats available
- **Saved Routes**: Quick access to frequently used routes
- **Bookings**: Active and upcoming bookings
- **Action Buttons**: Book a ride, save favorite routes

### Ride Details Screen
- Driver/Passenger profile (photo, name, rating)
- Route details (pickup, dropoff, time, price)
- Vehicle info (car/bike type, plate number)
- Passenger list (for drivers)
- Chat button (if payment active)
- Rate & Review button (post-ride)

### Route Management (Driver)
- Route list with edit/delete options
- Create new route form:
  - Pickup location
  - Dropoff location
  - Days of week (Mon-Fri)
  - Departure time
  - Seats available
  - Price per seat
  - Vehicle type (Car/Bike)

### Bookings Screen
- Upcoming bookings (driver/passenger view)
- Past bookings with ratings
- Cancel booking option
- Contact driver/passenger

### Chat Screen
- Conversation list
- Message thread with driver/passenger
- Tied to active payment subscription
- Notification badge for unread messages

### Profile Screen
- User photo
- Name, phone, email
- CNIC verification status
- Company/workplace (if available)
- Rating and reviews
- Payment method
- Edit profile button

---

## Key User Flows

### Driver Flow
1. **Onboarding**: Phone → OTP → Role (Driver) → Sign Up → Profile Photo → Dashboard
2. **Create Route**: Dashboard → Create Route → Fill Details → Publish → Active
3. **Manage Bookings**: Dashboard → View Bookings → Accept/Reject → Chat with Passenger
4. **Complete Ride**: Ride Time → Mark Complete → Rate Passenger → Earnings Updated

### Passenger Flow
1. **Onboarding**: Phone → OTP → Role (Passenger) → Sign Up → Profile Photo → Dashboard
2. **Search Ride**: Dashboard → Search/Browse → Select Ride → View Details → Book
3. **Manage Booking**: Bookings → View Booking → Chat with Driver → Confirm Pickup
4. **Complete Ride**: Ride Complete → Rate Driver → Review Saved

### Payment Flow (Weekly Subscription)
1. User books ride or needs chat access
2. Payment prompt appears
3. User selects payment method (Jazz Cash, Easypaisa, etc.)
4. Weekly subscription activated
5. Chat and ride features unlocked for 7 days

---

## Color Scheme

### Primary Colors
- **Primary Brand**: `#00A86B` (Emerald Green) - Trust, growth, Pakistani identity
- **Secondary**: `#FF6B35` (Warm Orange) - Energy, action, visibility
- **Accent**: `#004E89` (Deep Blue) - Professionalism, stability

### Semantic Colors
- **Success**: `#22C55E` (Green) - Ride confirmed, payment successful
- **Warning**: `#F59E0B` (Amber) - Payment expiring, verification needed
- **Error**: `#EF4444` (Red) - Ride cancelled, payment failed
- **Info**: `#3B82F6` (Blue) - General notifications

### Neutral Colors
- **Background**: `#FFFFFF` (Light) / `#0F172A` (Dark)
- **Surface**: `#F8FAFC` (Light) / `#1E293B` (Dark)
- **Text Primary**: `#0F172A` (Light) / `#F8FAFC` (Dark)
- **Text Secondary**: `#64748B` (Muted)
- **Border**: `#E2E8F0` (Light) / `#334155` (Dark)

---

## Typography
- **Display**: SF Pro Display (iOS) / Roboto (Android)
- **Body**: SF Pro Text (iOS) / Roboto (Android)
- **Sizes**: 12px (caption), 14px (body), 16px (subheading), 18px (heading), 24px (display)

---

## Interaction Patterns

### Buttons
- **Primary**: Full-width, emerald green, rounded corners (12px)
- **Secondary**: Outlined, emerald green border
- **Tertiary**: Text-only, emerald green text
- **Disabled**: 50% opacity, no interaction

### Cards
- **Ride Card**: White/dark surface, 12px border radius, shadow, padding 16px
- **Driver Card**: Profile photo (48px), name, rating, verification badge
- **Route Card**: Location icons, time, price, seats available

### Input Fields
- **Text Input**: 44px height (touch-friendly), rounded 8px, border on focus
- **Phone Input**: +92 country code pre-filled, numeric keyboard
- **OTP Input**: 6 separate digit fields, auto-advance

### Navigation
- **Tab Bar**: 5 tabs (Home, Search, Bookings, Chat, Profile)
- **Header**: Back button, title, action buttons
- **Modals**: Full-screen or half-sheet depending on context

---

## Accessibility
- Minimum touch target: 44x44 points
- Color contrast: WCAG AA compliant
- Text scaling: Supports dynamic type
- VoiceOver support for all interactive elements
- Haptic feedback on key interactions (booking, payment)

---

## Payment Integration Points
1. **Ride Booking**: Trigger payment flow before confirmation
2. **Chat Access**: Payment required to unlock messaging
3. **Weekly Subscription**: Automatic renewal, easy cancellation
4. **Payment Methods**: Jazz Cash, Easypaisa, Debit Card

---

## Trust & Safety Features
1. **Verified Phone Numbers**: SMS-based OTP verification
2. **Profile Photos**: Photo upload and verification
3. **CNIC Verification**: National ID verification
4. **Company-Based Rides**: Optional workplace verification
5. **Ratings & Reviews**: Post-ride feedback system
6. **Payment Transparency**: Clear pricing, no hidden fees
7. **Active Payment Requirement**: Chat and ride features tied to active subscription

---

## Next Steps
- Implement authentication flow with Supabase
- Design and build auth screens with modern UI
- Create driver and passenger dashboards
- Integrate payment system
- Add chat functionality
- Implement ratings and reviews
