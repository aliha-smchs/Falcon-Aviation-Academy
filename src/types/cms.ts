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
  type: 'Single-Engine Piston' | 'Multi-Engine Piston' | 'Full Motion Simulator' | 'Fixed Base Simulator';
  seats: number;
  engineType: string;
  speed: string;
  range: string;
  features: string[];
  description?: string;
  isActive: boolean;
  category: 'training' | 'multi-engine' | 'simulators';
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
  qualifications: string[];
  bio: string;
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
  duration: string;
  price?: string;
  details: string[];
  category: 'core-licenses' | 'advanced-training' | 'endorsements';
  isActive: boolean;
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
