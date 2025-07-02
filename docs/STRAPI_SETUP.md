# Strapi CMS Setup Instructions

This document provides step-by-step instructions for setting up Strapi CMS for the Flight Academy website.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL, MySQL, or SQLite (for production use PostgreSQL)

## Initial Strapi Setup

### 1. Create a new Strapi project

```bash
# Navigate to your project root directory
cd /path/to/your/project

# Create Strapi project in a new directory
npx create-strapi-app@latest flight-academy-cms --quickstart

# Or for custom database configuration
npx create-strapi-app@latest flight-academy-cms
```

### 2. Configure Database (Production)

Edit `config/database.js` in your Strapi project:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'flight_academy_cms'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

### 3. Environment Variables

Create `.env` file in Strapi root:

```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=flight_academy_cms
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false
```

## Content Type Configuration

### 1. Aircraft Content Type

Create a new Collection Type called "Aircraft" with the following fields:

**Single Types:**
- `name` (Text, Required)
- `model` (Text, Required)
- `description` (Rich Text)
- `engineType` (Text, Required)
- `speed` (Text, Required)
- `range` (Text, Required)
- `seats` (Number, Required)
- `isActive` (Boolean, Default: true)

**Enumeration:**
- `type` (Enumeration, Values: "Single-Engine Piston", "Multi-Engine Piston", "Full Motion Simulator", "Fixed Base Simulator")
- `category` (Enumeration, Values: "training", "multi-engine", "simulators")

**JSON Field:**
- `features` (JSON, for storing array of features)

**Media:**
- `image` (Single Media, Required)

### 2. Instructor Content Type

Create a new Collection Type called "Instructor" with the following fields:

**Single Types:**
- `name` (Text, Required)
- `title` (Text, Required)
- `bio` (Rich Text, Required)
- `experience` (Text, Required)
- `email` (Email)
- `phone` (Text)
- `isActive` (Boolean, Default: true)

**JSON Field:**
- `qualifications` (JSON, for storing array of qualifications)

**Media:**
- `image` (Single Media, Required)

### 3. Course Content Type

Create a new Collection Type called "Course" with the following fields:

**Single Types:**
- `title` (Text, Required)
- `description` (Rich Text, Required)
- `duration` (Text, Required)
- `price` (Text)
- `isActive` (Boolean, Default: true)

**Enumeration:**
- `category` (Enumeration, Values: "core-licenses", "advanced-training", "endorsements")

**JSON Field:**
- `details` (JSON, for storing array of course details)

**Relation:**
- `instructor` (Relation: Course belongs to one Instructor)

### 4. Testimonial Content Type

Create a new Collection Type called "Testimonial" with the following fields:

**Single Types:**
- `quote` (Rich Text, Required)
- `authorName` (Text, Required)
- `authorTitle` (Text, Required)
- `rating` (Number, Min: 1, Max: 5)
- `isActive` (Boolean, Default: true)

**Media:**
- `authorImage` (Single Media, Required)

## User Roles and Permissions

### 1. Configure Admin Role

1. Go to Settings > Administration Panel > Roles
2. Edit "Super Admin" role
3. Ensure all permissions are granted

### 2. Create Editor Role

1. Create new role called "Editor"
2. Grant permissions:
   - Aircraft: Create, Read, Update, Delete
   - Instructor: Create, Read, Update, Delete
   - Course: Create, Read, Update, Delete
   - Testimonial: Create, Read, Update, Delete
   - Upload: Access the Media Library

### 3. Configure Public API Permissions

1. Go to Settings > Users & Permissions Plugin > Roles
2. Edit "Public" role
3. Grant permissions:
   - Aircraft: Find, FindOne
   - Instructor: Find, FindOne
   - Course: Find, FindOne
   - Testimonial: Find, FindOne

## Sample Data Population

### Aircraft Sample Data

```json
[
  {
    "name": "Cessna 172 Skyhawk",
    "model": "172",
    "type": "Single-Engine Piston",
    "category": "training",
    "seats": 4,
    "engineType": "Lycoming IO-360",
    "speed": "124 knots",
    "range": "640 nm",
    "features": ["G1000 Glass Cockpit", "Autopilot", "ADS-B", "Air Conditioning"],
    "isActive": true
  }
]
```

### Instructor Sample Data

```json
[
  {
    "name": "Captain Sarah Mitchell",
    "title": "Chief Flight Instructor",
    "experience": "15+ years",
    "qualifications": ["ATPL", "CFI", "MEI", "Boeing 737 Type Rating"],
    "bio": "Former commercial airline captain with over 10,000 flight hours...",
    "isActive": true
  }
]
```

## API Configuration

### 1. CORS Configuration

Edit `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000', 'http://localhost:5173', 'https://your-frontend-domain.com']
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## Deployment

### 1. Environment Variables for Production

```bash
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate-new-keys-for-production
API_TOKEN_SALT=generate-new-salt
ADMIN_JWT_SECRET=generate-new-secret
TRANSFER_TOKEN_SALT=generate-new-salt
JWT_SECRET=generate-new-secret

# Database (use your production database credentials)
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-username
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=true
```

### 2. Build for Production

```bash
cd flight-academy-cms
npm run build
npm start
```

## Frontend Integration

### 1. Update Frontend Environment Variables

Update your frontend `.env` file:

```bash
VITE_STRAPI_API_URL=https://your-strapi-domain.com/api
VITE_STRAPI_UPLOADS_URL=https://your-strapi-domain.com
```

### 2. Test API Connection

Visit `https://your-strapi-domain.com/api/aircraft` to test the API.

## Security Considerations

1. **Change Default Admin Credentials:** Create a strong admin password
2. **API Tokens:** Use API tokens for programmatic access
3. **Rate Limiting:** Configure rate limiting for production
4. **HTTPS:** Always use HTTPS in production
5. **Database Security:** Use strong database credentials and limit access
6. **Backup Strategy:** Implement regular database backups

## Troubleshooting

### Common Issues:

1. **CORS Errors:** Check CORS configuration in `config/middlewares.js`
2. **Database Connection:** Verify database credentials and network access
3. **Permission Issues:** Check API permissions in Strapi admin panel
4. **Media Upload Issues:** Check file size limits and storage configuration

### Logs:

Check Strapi logs for detailed error information:

```bash
cd flight-academy-cms
npm run develop  # Development mode with detailed logs
```

## Support

For additional help:
- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi Community Forum](https://forum.strapi.io/)
- [Strapi Discord](https://discord.strapi.io/)
