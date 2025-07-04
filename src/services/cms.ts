import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  StrapiResponse,
  CMSAircraft,
  CMSAircraftAttributes,
  CMSInstructor,
  CMSCourse,
  CMSTestimonial,
  CMSError,
  AuthResponse,
  LoginCredentials,
  AuthUser
} from '@/types/cms';

class CMSService {
  private api: AxiosInstance;
  private baseURL: string;
  private uploadsURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_STRAPI_API_URL || 'https://incredible-desk-736f4f6f27.strapiapp.com/api';
    this.uploadsURL = import.meta.env.VITE_STRAPI_UPLOADS_URL || 'https://incredible-desk-736f4f6f27.strapiapp.com/';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include JWT token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getStoredToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearStoredToken();
          // Optionally redirect to login
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: any): CMSError {
    if (error.response) {
      return {
        status: error.response.status,
        name: error.response.data?.error?.name || 'API Error',
        message: error.response.data?.error?.message || 'An error occurred',
        details: error.response.data?.error?.details,
      };
    }
    
    return {
      status: 500,
      name: 'Network Error',
      message: error.message || 'Network error occurred',
    };
  }

  // Authentication methods
  private getStoredToken(): string | null {
    return localStorage.getItem('cms_jwt_token');
  }

  private setStoredToken(token: string): void {
    localStorage.setItem('cms_jwt_token', token);
  }

  private clearStoredToken(): void {
    localStorage.removeItem('cms_jwt_token');
    localStorage.removeItem('cms_user');
  }

  private setStoredUser(user: AuthUser): void {
    localStorage.setItem('cms_user', JSON.stringify(user));
  }

  public getStoredUser(): AuthUser | null {
    const userStr = localStorage.getItem('cms_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/local', credentials);
      const { jwt, user } = response.data;
      
      this.setStoredToken(jwt);
      
      // Try multiple approaches to get user with role information
      let userWithRole = user;
      
      try {
        // First try: users/me with populate
        const userResponse: AxiosResponse<any> = await this.api.get('/users/me?populate=role');
        console.log('User response:', userResponse.data);
        
        if (userResponse.data.role) {
          userWithRole = userResponse.data;
        } else {
          // Second try: users/me with populate=*
          const userResponse2: AxiosResponse<any> = await this.api.get('/users/me?populate=*');
          console.log('User response with populate=*:', userResponse2.data);
          
          if (userResponse2.data.role) {
            userWithRole = userResponse2.data;
          } else {
            // Third try: fetch user by ID with role
            const userResponse3: AxiosResponse<any> = await this.api.get(`/users/${user.id}?populate=role`);
            console.log('User response by ID:', userResponse3.data);
            
            if (userResponse3.data.role) {
              userWithRole = userResponse3.data;
            }
          }
        }
      } catch (userError) {
        console.warn('Failed to fetch user with role:', userError);
        
        // If all methods fail, create a default role for authenticated users
        userWithRole = {
          ...user,
          role: {
            id: 1,
            name: 'Authenticated',
            type: 'authenticated',
            description: 'Default role given to authenticated user.'
          }
        };
      }
      
      console.log('Final user with role:', userWithRole);
      this.setStoredUser(userWithRole);
      
      return {
        jwt,
        user: userWithRole
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public logout(): void {
    this.clearStoredToken();
  }

  public isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  // Utility method to get full image URL
  public getImageUrl(url: string): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${this.uploadsURL}${url}`;
  }

  // Aircraft methods
  async getAircraft(populate = true): Promise<CMSAircraft[]> {
    try {
      const populateQuery = populate ? '?populate=image' : '';
      const response: AxiosResponse<StrapiResponse<CMSAircraft[]>> = 
        await this.api.get(`/aircrafts${populateQuery}`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAircraftById(id: number): Promise<CMSAircraft> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSAircraft>> = 
        await this.api.get(`/aircrafts/${id}?populate=image`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAircraftByCategory(category: string): Promise<CMSAircraft[]> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSAircraft[]>> = 
        await this.api.get(`/aircrafts?filters[category][$eq]=${category}&populate=image`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Instructor methods
  async getInstructors(populate = true): Promise<CMSInstructor[]> {
    try {
      const populateQuery = populate ? '?populate=image' : '';
      const response: AxiosResponse<StrapiResponse<CMSInstructor[]>> = 
        await this.api.get(`/instructors${populateQuery}`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getInstructorById(id: number): Promise<CMSInstructor> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSInstructor>> = 
        await this.api.get(`/instructors/${id}?populate=image`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Course methods
  async getCourses(populate = true): Promise<CMSCourse[]> {
    try {
      const populateQuery = populate ? '?populate=instructor.image' : '';
      // Create a request without authentication for public courses endpoint
      const response: AxiosResponse<StrapiResponse<CMSCourse[]>> = 
        await axios.get(`${this.baseURL}/courses${populateQuery}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

async getCoursesByCategory(category: string, populate = true): Promise<CMSCourse[]> {
  try {
    const populateQuery = populate ? '&populate=instructor.image' : '';
    // Create a request without authentication for public courses endpoint
    const response: AxiosResponse<StrapiResponse<CMSCourse[]>> = 
      await axios.get(`${this.baseURL}/courses?filters[category][$eq]=${encodeURIComponent(category)}${populateQuery}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data.data;
  } catch (error) {
    throw this.handleError(error);
  }
}

  // Testimonial methods
  async getTestimonials(populate = true): Promise<any> {
    try {
      const populateQuery = populate ? '?populate=image' : '';
      const response: AxiosResponse<any> = 
        await this.api.get(`/testimonials${populateQuery}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Admin methods for creating/updating content
  async createAircraft(data: Partial<CMSAircraftAttributes>): Promise<CMSAircraft> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSAircraft>> = 
        await this.api.post('/aircrafts', { data });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateAircraft(id: number, data: Partial<CMSAircraftAttributes>): Promise<CMSAircraft> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSAircraft>> = 
        await this.api.put(`/aircrafts/${id}`, { data });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteAircraft(id: number): Promise<void> {
    try {
      await this.api.delete(`/aircrafts/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Instructor CRUD methods
  async createInstructor(data: Partial<any>): Promise<CMSInstructor> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSInstructor>> = 
        await this.api.post('/instructors', { data });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateInstructor(id: number, data: Partial<any>): Promise<CMSInstructor> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSInstructor>> = 
        await this.api.put(`/instructors/${id}`, { data });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteInstructor(id: number): Promise<void> {
    try {
      await this.api.delete(`/instructors/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Course CRUD methods
  async createCourse(data: Partial<any>): Promise<CMSCourse> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSCourse>> = 
        await this.api.post('/courses', { data });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateCourse(id: number, data: Partial<any>): Promise<CMSCourse> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSCourse>> = 
        await this.api.put(`/courses/${id}`, { data });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteCourse(id: number): Promise<void> {
    try {
      await this.api.delete(`/courses/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Testimonial CRUD methods
  async createTestimonial(data: Partial<any>): Promise<CMSTestimonial> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSTestimonial>> = 
        await this.api.post('/testimonials', { data });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateTestimonial(id: number, data: Partial<any>): Promise<CMSTestimonial> {
    try {
      const response: AxiosResponse<StrapiResponse<CMSTestimonial>> = 
        await this.api.put(`/testimonials/${id}`, { data });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteTestimonial(id: number): Promise<void> {
    try {
      await this.api.delete(`/testimonials/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // File upload method
  async uploadFile(file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('files', file);
      
      const response = await this.api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data[0]; // Strapi returns an array of uploaded files
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Similar methods can be created for instructors, courses, testimonials...
}

// Create and export a singleton instance
export const cmsService = new CMSService();
export default cmsService;
