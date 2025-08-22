# Task Management Application

A comprehensive full-stack task management application built with React, Node.js, Express, and MongoDB. This application enables teams to collaborate on projects within workspaces, manage tasks with different priorities and statuses, and control access through role-based permissions.

## 🚀 Features

### Core Functionality
- **Workspace Management**: Create and manage multiple workspaces for different teams or projects
- **Project Organization**: Organize tasks within projects, each with custom emojis and descriptions
- **Task Management**: Create, assign, and track tasks with priorities, statuses, and due dates
- **Team Collaboration**: Invite team members to workspaces with role-based access control
- **User Authentication**: Secure authentication with Google OAuth and local authentication

### Advanced Features
- **Role-Based Access Control**: Three-tier permission system (Owner, Admin, Member)
- **Real-time Updates**: Dynamic task status and priority management
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **Data Validation**: Comprehensive input validation using Zod schemas
- **Security**: Rate limiting, CORS protection, data sanitization, and JWT authentication

## 🏗️ Architecture

### Frontend (Client)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: Zustand for global state, React Query for server state
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with custom interceptors

### Backend (Server)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (Google OAuth, Local Strategy)
- **Authorization**: JWT tokens with role-based permissions
- **Security**: Helmet, CORS, Rate limiting, Data sanitization
- **Validation**: Zod schemas for request validation

## 📊 Data Models

### User
- Personal information and authentication data
- Current workspace tracking
- Profile picture support
- Activity status and last login tracking

### Workspace
- Team collaboration spaces
- Unique invite codes for member onboarding
- Owner-based access control
- Project and member management

### Project
- Task organization within workspaces
- Custom emoji and description support
- Creator tracking and workspace association

### Task
- Comprehensive task management with:
  - Unique task codes for identification
  - Status tracking (Backlog, Todo, In Progress, In Review, Done)
  - Priority levels (Low, Medium, High)
  - Assignment to team members
  - Due date management
  - Project and workspace association

### Member
- Workspace membership management
- Role-based permissions
- Join date tracking

### Role & Permissions
- Three-tier role system:
  - **Owner**: Full workspace control
  - **Admin**: Management capabilities
  - **Member**: Basic task and project access
- Granular permissions for different operations

## 🛠️ Technology Stack

### Frontend Dependencies
```json
{
  "core": ["react", "react-dom", "typescript"],
  "ui": ["@radix-ui/*", "tailwindcss", "lucide-react"],
  "state": ["zustand", "@tanstack/react-query"],
  "forms": ["react-hook-form", "@hookform/resolvers", "zod"],
  "routing": ["react-router-dom"],
  "http": ["axios"],
  "utilities": ["date-fns", "clsx", "tailwind-merge"]
}
```

### Backend Dependencies
```json
{
  "core": ["express", "typescript", "mongoose"],
  "auth": ["passport", "passport-google-oauth20", "jsonwebtoken"],
  "security": ["helmet", "cors", "express-rate-limit", "bcrypt"],
  "validation": ["zod", "express-mongo-sanitize"],
  "utilities": ["dotenv", "uuid", "ms"]
}
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials (for social login)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd task-management-app
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Configuration**

Create `.env` files in both `server` and `client` directories:

**Server (.env)**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Frontend URL
FRONTEND_ORIGIN=http://localhost:3000
```

**Client (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

4. **Database Setup**
```bash
# Seed initial roles
cd server
npm run seed
```

5. **Start the application**
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Project Structure

```
├── client/                     # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/            # Base UI components (Radix UI)
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── workspace/     # Workspace-related components
│   │   │   └── ...
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility libraries and configurations
│   │   ├── pages/             # Page components
│   │   ├── routes/            # Routing configuration
│   │   ├── types/             # TypeScript type definitions
│   │   └── context/           # React context providers
│   ├── public/                # Static assets
│   └── package.json
│
├── server/                     # Node.js backend application
│   ├── src/
│   │   ├── config/            # Application configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── models/            # Database models (Mongoose)
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # Business logic layer
│   │   ├── middlewares/       # Custom middleware functions
│   │   ├── utils/             # Utility functions
│   │   ├── validation/        # Request validation schemas
│   │   ├── enums/             # Application constants
│   │   └── seeders/           # Database seeders
│   └── package.json
│
└── README.md                   # Project documentation
```

## 🔐 Authentication & Authorization

### Authentication Methods
1. **Google OAuth**: Social login integration
2. **Local Authentication**: Email/password registration and login
3. **JWT Tokens**: Stateless authentication with secure token management

### Permission System
The application implements a comprehensive role-based access control system:

#### Roles
- **OWNER**: Complete workspace control, can delete workspace
- **ADMIN**: Management capabilities, can manage members and projects
- **MEMBER**: Basic access to view and create tasks

#### Permissions
- Workspace: Create, edit, delete, manage settings
- Members: Add, remove, change roles
- Projects: Create, edit, delete
- Tasks: Create, edit, delete, assign

## 🎨 UI/UX Features

### Design System
- **Component Library**: Custom components built on Radix UI primitives
- **Styling**: Tailwind CSS with consistent design tokens
- **Icons**: Lucide React icon library
- **Responsive**: Mobile-first responsive design
- **Accessibility**: WCAG compliant components

### User Experience
- **Intuitive Navigation**: Sidebar navigation with workspace switching
- **Real-time Feedback**: Toast notifications and loading states
- **Data Tables**: Advanced filtering and pagination for task management
- **Form Validation**: Real-time validation with helpful error messages
- **Emoji Support**: Custom emoji picker for projects and reactions

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/google` - Google OAuth initiation
- `POST /api/v1/auth/logout` - User logout

### Workspaces
- `GET /api/v1/workspace` - Get user workspaces
- `POST /api/v1/workspace` - Create workspace
- `PUT /api/v1/workspace/:id` - Update workspace
- `DELETE /api/v1/workspace/:id` - Delete workspace

### Projects
- `GET /api/v1/project` - Get workspace projects
- `POST /api/v1/project` - Create project
- `PUT /api/v1/project/:id` - Update project
- `DELETE /api/v1/project/:id` - Delete project

### Tasks
- `GET /api/v1/task` - Get tasks with filtering
- `POST /api/v1/task` - Create task
- `PUT /api/v1/task/:id` - Update task
- `DELETE /api/v1/task/:id` - Delete task

### Members
- `GET /api/v1/member` - Get workspace members
- `POST /api/v1/member/invite` - Invite member
- `PUT /api/v1/member/:id/role` - Update member role
- `DELETE /api/v1/member/:id` - Remove member

## 🧪 Development

### Available Scripts

**Server**
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Seed database with initial data
```

**Client**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety across the application
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting (recommended)
- **Zod**: Runtime type validation for API requests

## 🚀 Deployment

### Production Build
```bash
# Build client
cd client
npm run build

# Build server
cd ../server
npm run build
```

### Environment Variables
Ensure all production environment variables are properly configured:
- Database connection strings
- JWT secrets
- OAuth credentials
- CORS origins

### Recommended Deployment Platforms
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Railway, Render, or AWS EC2
- **Database**: MongoDB Atlas or self-hosted MongoDB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Known Issues & Roadmap

### Current Limitations
- No real-time notifications (WebSocket integration planned)
- Limited file attachment support
- Basic reporting and analytics

### Future Enhancements
- Real-time collaboration features
- Advanced reporting dashboard
- Mobile application
- Integration with external tools (Slack, GitHub, etc.)
- Advanced task dependencies and Gantt charts

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation for common solutions
- Review the codebase for implementation details

---

Built with ❤️ using modern web technologies for efficient team collaboration and project management.