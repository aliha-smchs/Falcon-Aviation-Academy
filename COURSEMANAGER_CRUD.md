# CourseManager CRUD Operations - Updated for CMS API

## Overview
The CourseManager component has been completely updated to work with the CMS API data structure and provide full CRUD (Create, Read, Update, Delete) operations for course management.

## Key Changes Made

### 1. **Data Structure Handling**
- **Before**: Expected nested Strapi structure with `attributes`
- **After**: Works with flat API response structure directly
- Handles both potential data formats for backward compatibility

### 2. **Enhanced Form Fields**
The form now includes all fields required by the CMS API:

```tsx
{
  title: string,
  description: string,
  flightHours: string,
  groundHours: string,
  price: string,
  maxStudents: number,
  certification: string,
  location: string,
  nextStartDate: string,
  category: 'core-licenses' | 'advanced-training' | 'endorsements',
  prerequisites: string, // comma-separated
  curriculum: string,    // comma-separated
  details: string,       // comma-separated
  instructorId: string,
  isActive: boolean
}
```

### 3. **CRUD Operations**

#### **Create Course**
- Converts form data to API format
- Handles rich text content creation
- Splits comma-separated fields into arrays
- Sets proper instructor relationship

#### **Read Courses**
- Displays all course fields from API
- Shows flight/ground hours separately
- Displays instructor information
- Shows course details as badges

#### **Update Course**
- Pre-populates form with existing course data
- Handles both string and array data types
- Preserves all course relationships

#### **Delete Course**
- Confirmation dialog before deletion
- Proper error handling

### 4. **Form Improvements**

#### **New Fields Added:**
- **Flight Hours**: Separate numeric input
- **Ground Hours**: Separate numeric input
- **Certification**: Course certification name
- **Max Students**: Maximum number of students
- **Location**: Training location
- **Next Start Date**: When course starts
- **Prerequisites**: Course prerequisites (textarea)
- **Curriculum**: Course curriculum (textarea)

#### **Enhanced Validation:**
- Required fields marked appropriately
- Numeric inputs with proper types
- Step values for decimal hours

### 5. **Data Display**

#### **Course Cards Show:**
- Flight and ground hours
- Price and certification
- Instructor information
- Course description
- Prerequisites and curriculum
- Location and start date
- Active/inactive status

#### **Better Formatting:**
- Proper handling of array fields
- Rich text description rendering
- Badge display for course details
- Responsive grid layout

### 6. **API Integration**

#### **Handles API Response Format:**
```json
{
  "id": 2,
  "title": "Trial Introductory Flight (TIF) Beginner",
  "description": "Experience the thrill of flying...",
  "flightHours": "1.0",
  "groundHours": "0.5",
  "price": "$299",
  "category": "core-licenses",
  "instructor": null,
  "prerequisites": ["Minimum age: 14 years", "Valid photo identification"],
  "curriculum": ["Aircraft familiarization", "Basic flight controls"],
  "isActive": true
}
```

#### **Creates API Requests:**
```tsx
// Create/Update data format
{
  title: "Course Title",
  description: "Course description",
  fullDescription: [
    {
      type: "paragraph",
      children: [{ type: "text", text: "Course description" }]
    }
  ],
  flightHours: "1.5",
  groundHours: "0.5",
  prerequisites: ["req1", "req2"],
  curriculum: ["item1", "item2"],
  instructor: instructorId || null
}
```

## Usage

### **Admin Dashboard Access**
1. Navigate to the admin dashboard
2. Go to Course Management section
3. Use the interface to:
   - View all courses
   - Add new courses
   - Edit existing courses
   - Delete courses

### **Form Fields Guide**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Course Title | Text | Yes | Name of the course |
| Certification | Text | No | Certificate awarded |
| Flight Hours | Number | No | Number of flight training hours |
| Ground Hours | Number | No | Number of ground training hours |
| Price | Text | No | Course price (e.g., "$299") |
| Max Students | Number | No | Maximum students per session |
| Category | Select | Yes | Course category |
| Next Start Date | Text | No | When course starts |
| Location | Text | No | Training location |
| Instructor | Select | No | Assigned instructor |
| Description | Textarea | Yes | Course description |
| Details | Text | No | Comma-separated course details |
| Prerequisites | Textarea | No | Comma-separated prerequisites |
| Curriculum | Textarea | No | Comma-separated curriculum items |

## Error Handling

- **Network Errors**: Shows retry option for server issues
- **Validation Errors**: Client-side validation for required fields
- **API Errors**: Proper error messages for API failures
- **Confirmation Dialogs**: Confirms before deleting courses

## Integration Points

- **Hooks**: Uses `useCourses`, `useInstructors`, `useCreateCourse`, `useUpdateCourse`, `useDeleteCourse`
- **Components**: Integrates with UI components (Card, Button, Input, etc.)
- **Services**: Works with `cmsService` for API calls
- **Types**: Uses TypeScript types for type safety

## Future Enhancements

1. **Image Upload**: Add course image upload functionality
2. **Bulk Operations**: Add bulk edit/delete capabilities
3. **Course Scheduling**: Add scheduling and calendar integration
4. **Student Management**: Link courses to enrolled students
5. **Progress Tracking**: Add course completion tracking
6. **Email Notifications**: Send notifications for course updates
