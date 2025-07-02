# Flight Academy CMS Integration

This project has been successfully migrated from static data to a dynamic Strapi CMS backend. The frontend now fetches content from a headless CMS, enabling real-time content management.

## 🚀 Features Implemented

### ✅ CMS Integration
- **Strapi Headless CMS** integration with TypeScript support
- **React Query** for efficient data fetching and caching
- **Axios** HTTP client with interceptors for authentication
- **Error handling** with retry logic and user-friendly error states
- **Loading states** with skeleton components

### ✅ Content Types
- **Aircraft Management** - Training aircraft, multi-engine aircraft, and simulators
- **Instructor Management** - Flight instructor profiles and qualifications
- **Course Management** - Flight training programs and courses
- **Testimonial Management** - Student reviews and success stories

### ✅ Admin Dashboard
- **Authentication** - JWT-based login system
- **Role-based access** - Admin and Editor roles
- **Aircraft CRUD** - Complete aircraft management interface
- **Responsive design** - Works on desktop and mobile devices

### ✅ Frontend Components
- **Dynamic data loading** - All components now fetch from CMS
- **Error boundaries** - Graceful error handling
- **Loading skeletons** - Improved user experience
- **Fallback data** - Graceful degradation when CMS is unavailable

## 🏗️ Architecture

```
Frontend (React + TypeScript)
├── Components (Dynamic data rendering)
├── Hooks (React Query integration)
├── Services (API communication)
├── Types (TypeScript interfaces)
└── Pages (Admin dashboard)

Backend (Strapi CMS)
├── Content Types (Aircraft, Instructors, etc.)
├── API Endpoints (RESTful API)
├── Authentication (JWT tokens)
└── Admin Panel (Content management)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for production) or SQLite (for development)

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your Strapi API URL
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

### Backend Setup (Strapi)

Follow the detailed setup guide: [docs/STRAPI_SETUP.md](./docs/STRAPI_SETUP.md)

1. **Create Strapi project:**
   ```bash
   npx create-strapi-app@latest flight-academy-cms --quickstart
   ```

2. **Configure content types** as detailed in the setup guide

3. **Set up permissions** for public API access

4. **Start Strapi:**
   ```bash
   cd flight-academy-cms
   npm run develop
   ```

## 🔧 Environment Variables

### Frontend (.env)
```bash
VITE_STRAPI_API_URL=http://localhost:1337/api
VITE_STRAPI_UPLOADS_URL=http://localhost:1337
VITE_JWT_SECRET=your-jwt-secret-here
```

### Backend (Strapi .env)
```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
```

## 📱 Admin Dashboard

Access the admin dashboard at `/admin` with the following features:

- **Aircraft Management** - Add, edit, delete aircraft with categories
- **Content Categories** - Training Aircraft, Multi-Engine, Simulators
- **Image Management** - Upload and manage aircraft images
- **Status Control** - Activate/deactivate content items

### Default Admin Credentials
After setting up Strapi, create an admin user during the initial setup process.

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-based Access** - Admin and Editor roles with different permissions
- **CORS Configuration** - Proper cross-origin resource sharing setup
- **Input Validation** - Server-side validation for all data inputs
- **Rate Limiting** - API rate limiting for production environments

## 🎨 Component Architecture

### Data Flow
```
CMS (Strapi) → API → React Query → Components → UI
```

### Key Hooks
- `useAircraft()` - Fetch all aircraft
- `useAircraftByCategory()` - Fetch aircraft by category
- `useInstructors()` - Fetch all instructors
- `useTestimonials()` - Fetch all testimonials
- `useAuth()` - Authentication state management

### Error Handling
- **Network errors** - Retry with exponential backoff
- **API errors** - User-friendly error messages
- **Loading states** - Skeleton components and loading indicators
- **Empty states** - Graceful handling of empty data

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd flight-academy-cms
npm run build
npm start
```

### Production Environment Variables
Update environment variables for production URLs and secure secrets.

## 🧪 Testing

### Frontend Testing
```bash
npm run test
```

### API Testing
Test API endpoints:
- `GET /api/aircraft` - List all aircraft
- `GET /api/instructors` - List all instructors
- `GET /api/courses` - List all courses
- `GET /api/testimonials` - List all testimonials

## 📊 Performance Optimizations

- **React Query Caching** - 5-minute stale time for content
- **Image Optimization** - Strapi media handling with multiple formats
- **Lazy Loading** - Components load data on demand
- **Error Boundaries** - Prevent entire app crashes
- **Code Splitting** - Admin dashboard loaded separately

## 🔄 Migration Status

### ✅ Completed
- [x] CMS service integration
- [x] TypeScript interfaces
- [x] Aircraft component migration
- [x] Instructor component migration
- [x] Testimonial component migration
- [x] Admin dashboard (Aircraft management)
- [x] Authentication system
- [x] Error handling and loading states

### 🚧 In Progress
- [ ] Course component migration (static data still in use)
- [ ] Full instructor management interface
- [ ] Full testimonial management interface
- [ ] Full course management interface

### 📋 Future Enhancements
- [ ] Media management interface
- [ ] Content versioning
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Real-time content updates
- [ ] Content scheduling
- [ ] SEO optimization
- [ ] Analytics integration

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check Strapi CORS configuration
   - Verify frontend URL in Strapi settings

2. **Authentication Issues**
   - Check JWT secrets match between frontend/backend
   - Verify user roles and permissions

3. **API Connection Issues**
   - Verify Strapi is running on correct port
   - Check environment variables

4. **Build Issues**
   - Clear node_modules and reinstall
   - Check TypeScript errors

### Debug Mode
Enable React Query DevTools in development:
```bash
npm run dev
# Visit /?debug=true to see React Query DevTools
```

## 📚 Documentation

- [Strapi Setup Guide](./docs/STRAPI_SETUP.md)
- [API Documentation](http://localhost:1337/documentation)
- [React Query Docs](https://tanstack.com/query/latest)
- [Strapi Docs](https://docs.strapi.io/)

## 🤝 Contributing

1. Follow the existing code structure
2. Add TypeScript types for new features
3. Include loading and error states
4. Test API integration thoroughly
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.
