// Strapi Media/Image Interface
export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    large?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
}

// Base Strapi Response Interface
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

// Aircraft CMS Interface
export interface CMSAircraftAttributes {
  name: string;
  model: string;
  seats: number;
  enginetype: string; // Note: this matches the Strapi schema field name
  speed: string;
  range: string;
  features: string[]; // JSON field in Strapi, array of strings
  isActive: boolean;
  category: string; // Enumeration field, single value
  image: {
    data: StrapiEntity<StrapiMedia>;
  };
}

export type CMSAircraft = StrapiEntity<CMSAircraftAttributes>;

// Instructor CMS Interface
export interface CMSInstructorAttributes {
  name: string;
  title: string;
  experience: string;
  qualifications: string[]; // JSON field in Strapi
  bio: any; // Rich text blocks field in Strapi
  email?: string;
  phone?: string;
  isActive: boolean;
  image: {
    data: StrapiEntity<StrapiMedia>;
  };
}

export type CMSInstructor = StrapiEntity<CMSInstructorAttributes>;

// Course CMS Interface
export interface CMSCourseAttributes {
  title: string;
  description: string;
  fullDescription?: any; // Rich text content
  duration: string;
  price?: string;
  details: string[];
  category: string[]; // Categories like "core-licenses", "advanced-training", etc.
  
  isActive: boolean;
  
  // Training details
  flightHours?: string;
  groundHours?: string;
  maxStudents?: number;
  certification?: string;
  location?: string;
  nextStartDate?: string;
  
  // Course content
  prerequisites?: string[];
  curriculum?: string[];
  
  // Relations
  instructor?: {
    data: CMSInstructor;
  };
}

export type CMSCourse = StrapiEntity<CMSCourseAttributes>;

// Testimonial CMS Interface
export interface CMSTestimonialAttributes {
  quote: string;
  authorName: string;
  authorTitle: string;
  rating?: number;
  isActive: boolean;
  authorImage: {
    data: StrapiEntity<StrapiMedia>;
  };
}

export type CMSTestimonial = StrapiEntity<CMSTestimonialAttributes>;

// API Error Interface
export interface CMSError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

// Authentication Interface
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
  };
}

export interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

export interface LoginCredentials {
  identifier: string; // email or username
  password: string;
}
