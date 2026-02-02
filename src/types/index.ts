// SmartPlate Type Definitions

export type UserRole = 'admin' | 'ngo' | 'donor' | 'volunteer';

export type RequestStatus = 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected' | 'expired';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'emergency';

export type TrustLevel = 'bronze' | 'silver' | 'gold' | 'verified';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  trustScore: number;
  trustLevel: TrustLevel;
  verified: boolean;
  createdAt: Date;
  location: GeoLocation;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
}

export interface NGO extends User {
  role: 'ngo';
  organizationName: string;
  description: string;
  registrationNumber: string;
  totalMealsReceived: number;
  activeRequests: number;
  beneficiaries: number;
}

export interface Donor extends User {
  role: 'donor';
  businessName?: string;
  businessType?: string;
  totalDonations: number;
  totalMealsDonated: number;
  streak: number;
  badges: Badge[];
}

export interface Volunteer extends User {
  role: 'volunteer';
  vehicleType?: string;
  totalDeliveries: number;
  totalDistance: number;
  rating: number;
  available: boolean;
  badges: Badge[];
  streak: number;
}

export interface FoodRequest {
  id: string;
  ngoId: string;
  ngoName: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  foodType: string;
  urgency: UrgencyLevel;
  status: RequestStatus;
  location: GeoLocation;
  photos: string[];
  createdAt: Date;
  expiresAt: Date;
  matchedDonorId?: string;
  matchedVolunteerId?: string;
  spoilageRisk?: number;
  aiScore?: number;
}

export interface Donation {
  id: string;
  donorId: string;
  requestId: string;
  foodItems: FoodItem[];
  quantity: number;
  status: RequestStatus;
  pickupTime: Date;
  deliveryTime?: Date;
  proofPhotos: string[];
  proofLocation?: GeoLocation;
  co2Saved: number;
  mealsSaved: number;
}

export interface FoodItem {
  name: string;
  quantity: number;
  unit: string;
  expiryDate?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  earnedAt: Date;
}

export interface ImpactMetrics {
  totalMealsSaved: number;
  totalCO2Reduced: number; // in kg
  totalFoodWastePrevented: number; // in kg
  activeDonors: number;
  activeNGOs: number;
  activeVolunteers: number;
  requestsCompleted: number;
  averageDeliveryTime: number; // in minutes
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatar?: string;
  role: UserRole;
  score: number;
  rank: number;
  streak: number;
  badges: number;
}

export interface AIRecommendation {
  type: 'donation' | 'request' | 'route';
  score: number;
  reason: string;
  targetId: string;
  targetName: string;
  distance?: number;
  urgency?: UrgencyLevel;
  spoilageRisk?: number;
}

export interface DeliveryRoute {
  id: string;
  volunteerId: string;
  waypoints: GeoLocation[];
  totalDistance: number;
  estimatedTime: number;
  optimized: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'request' | 'match' | 'delivery' | 'badge' | 'emergency' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}
