// Destination types
export interface Destination {
  name: string;
  region: string;
  flag: string;
  price: number;
  popular?: boolean;
}

// Booking data types
export interface BookingData {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  days: number;
  price: number;
}

// Feature types
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// FAQ types
export interface FAQ {
  question: string;
  answer: string;
}

// Destination data types
export interface DestinationData {
  name: string;
  description: string;
  rating: number;
  reviews: number;
  image: string;
}

// Calendar types
export interface CalendarMonth {
  daysInMonth: number;
  startingDayOfWeek: number;
  year: number;
  month: number;
}

// Component Props types
