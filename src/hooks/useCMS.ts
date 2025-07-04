import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsService } from '@/services/cms';
import {
  CMSAircraft,
  CMSAircraftAttributes,
  CMSInstructor,
  CMSCourse,
  CMSTestimonial,
  CMSError,
  LoginCredentials,
  AuthResponse,
} from '@/types/cms';

// Query Keys
export const queryKeys = {
  aircraft: ['aircraft'] as const,
  aircraftByCategory: (category: string) => ['aircraft', 'category', category] as const,
  aircraftById: (id: number) => ['aircraft', id] as const,
  instructors: ['instructors'] as const,
  instructorById: (id: number) => ['instructors', id] as const,
  courses: ['courses'] as const,
  coursesByCategory: (category: string) => ['courses', 'category', category] as const,
  testimonials: ['testimonials'] as const,
} as const;

// Aircraft Hooks
export const useAircraft = () => {
  return useQuery<CMSAircraft[], CMSError>({
    queryKey: queryKeys.aircraft,
    queryFn: () => cmsService.getAircraft(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

export const useAircraftByCategory = (category: string) => {
  return useQuery<CMSAircraft[], CMSError>({
    queryKey: queryKeys.aircraftByCategory(category),
    queryFn: () => cmsService.getAircraftByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

export const useAircraftById = (id: number) => {
  return useQuery<CMSAircraft, CMSError>({
    queryKey: queryKeys.aircraftById(id),
    queryFn: () => cmsService.getAircraftById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

// Instructor Hooks
export const useInstructors = () => {
  return useQuery<CMSInstructor[], CMSError>({
    queryKey: queryKeys.instructors,
    queryFn: () => cmsService.getInstructors(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

export const useInstructorById = (id: number) => {
  return useQuery<CMSInstructor, CMSError>({
    queryKey: queryKeys.instructorById(id),
    queryFn: () => cmsService.getInstructorById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

// Course Hooks
export const useCourses = () => {
  return useQuery<CMSCourse[], CMSError>({
    queryKey: queryKeys.courses,
    queryFn: () => cmsService.getCourses(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

export const useCoursesByCategory = (category: string) => {
  return useQuery<CMSCourse[], CMSError>({
    queryKey: queryKeys.coursesByCategory(category),
    queryFn: () => cmsService.getCoursesByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

// Testimonial Hooks
export const useTestimonials = () => {
  return useQuery<any, CMSError>({
    queryKey: queryKeys.testimonials,
    queryFn: () => cmsService.getTestimonials(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

// Authentication Hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation<AuthResponse, CMSError, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => cmsService.login(credentials),
    onSuccess: () => {
      // Invalidate and refetch protected queries
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => {
      cmsService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });
};

// Admin Mutation Hooks (for CMS management)
export const useCreateAircraft = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CMSAircraft, CMSError, Partial<CMSAircraftAttributes>>({
    mutationFn: (data) => cmsService.createAircraft(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aircraft });
    },
  });
};

export const useUpdateAircraft = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CMSAircraft, CMSError, { id: number; data: Partial<CMSAircraftAttributes> }>({
    mutationFn: ({ id, data }) => cmsService.updateAircraft(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aircraft });
      queryClient.invalidateQueries({ queryKey: queryKeys.aircraftById(data.id) });
    },
  });
};

export const useDeleteAircraft = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, CMSError, number>({
    mutationFn: (id) => cmsService.deleteAircraft(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aircraft });
    },
  });
};

// Instructor Mutation Hooks
export const useCreateInstructor = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CMSInstructor, CMSError, Partial<any>>({
    mutationFn: (data) => cmsService.createInstructor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.instructors });
    },
  });
};

export const useUpdateInstructor = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CMSInstructor, CMSError, { id: number; data: Partial<any> }>({
    mutationFn: ({ id, data }) => cmsService.updateInstructor(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.instructors });
      queryClient.invalidateQueries({ queryKey: queryKeys.instructorById(data.id) });
    },
  });
};

export const useDeleteInstructor = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, CMSError, number>({
    mutationFn: (id) => cmsService.deleteInstructor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.instructors });
    },
  });
};

// Course Mutation Hooks
export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CMSCourse, CMSError, Partial<any>>({
    mutationFn: (data) => cmsService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CMSCourse, CMSError, { id: number; data: Partial<any> }>({
    mutationFn: ({ id, data }) => cmsService.updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, CMSError, number>({
    mutationFn: (id) => cmsService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses });
    },
  });
};

// Testimonial Mutation Hooks
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CMSTestimonial, CMSError, Partial<any>>({
    mutationFn: (data) => cmsService.createTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials });
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CMSTestimonial, CMSError, { id: number; data: Partial<any> }>({
    mutationFn: ({ id, data }) => cmsService.updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, CMSError, number>({
    mutationFn: (id) => cmsService.deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials });
    },
  });
};

// Utility hook to check authentication status
export const useAuth = () => {
  const isAuthenticated = cmsService.isAuthenticated();
  const user = cmsService.getStoredUser();
  
  // Debug logging to see what role data we have
  console.log('Auth Debug:', {
    isAuthenticated,
    user,
    roleName: user?.role?.name,
    roleType: user?.role?.type,
    roleId: user?.role?.id,
    hasRole: !!user?.role
  });
  
  // TEMPORARY: Grant admin access to any authenticated user
  // TODO: Set up proper role-based access control in Strapi
  const isAdmin = isAuthenticated && user;
  
  return {
    isAuthenticated,
    user,
    isAdmin,
    isEditor: user?.role?.name === 'Editor' || user?.role?.type === 'editor',
  };
};
