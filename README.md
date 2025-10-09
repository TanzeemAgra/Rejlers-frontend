# Oil & Gas Frontend Dashboard

Enterprise-grade React/Next.js dashboard for oil and gas operations monitoring and management.

## 🚀 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Query for server state, React Context for client state
- **Charts**: Chart.js, Recharts for data visualization
- **Real-time**: WebSocket integration for live data
- **Authentication**: NextAuth.js with OAuth2/OIDC support
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier, Husky

## 🏗️ Project Structure

```
oil-gas-frontend/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   └── charts/          # Chart components
│   ├── config/              # Application configuration
│   ├── data/                # Mock data and configurations
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and services
│   │   └── api/             # API client and services
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
│   ├── images/              # Images from consolidated sources
│   ├── fonts/               # Font files
│   └── icons/               # Icon assets
└── docs/                    # Documentation
```

## 🛠️ Installation & Setup

1. **Clone and Install Dependencies**
   ```bash
   cd oil-gas-frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
- `NEXT_PUBLIC_WS_URL` - WebSocket server URL
- `NEXT_PUBLIC_AUTH_PROVIDER` - Authentication provider
- `NEXT_PUBLIC_MAPS_API_KEY` - Maps API key (Google/Mapbox)
- Feature flags for enabling/disabling functionality

### Dynamic Configuration

The application uses soft coding principles with JSON-driven configurations:

- **Dashboard Layouts**: `src/data/dashboardConfig.ts`
- **Asset Types**: Configurable asset definitions
- **Form Schemas**: Dynamic form generation
- **Chart Templates**: Reusable chart configurations
- **Themes**: Multiple theme support

## 📊 Key Features

### Real-time Monitoring
- Live sensor data streaming via WebSocket
- Real-time asset status updates
- Instant alert notifications
- Performance metrics dashboard

### Asset Management
- Well, pipeline, and facility monitoring
- Equipment specifications and maintenance tracking
- Geographic asset mapping
- Status monitoring and alerts

### Safety & Compliance
- Alert management system
- Safety incident tracking
- Regulatory compliance monitoring
- Emergency response procedures

### Analytics & Reporting
- Production trend analysis
- Efficiency metrics
- Predictive maintenance insights
- Custom report generation

### Role-Based Access Control
- Multi-level user permissions
- Department-based access control
- Secure authentication
- Activity auditing

## 🎨 Design System

### Color Palette
- **Primary**: Deep Sky Blue (#0ea5e9) - Technology, trust
- **Secondary**: Amber (#eab308) - Caution, alerts
- **Accent**: Green (#22c55e) - Success, safety
- **Danger**: Red (#ef4444) - Critical alerts
- **Neutral**: Slate grays for text and backgrounds

### Component Architecture
- Atomic design principles
- Configurable components via props
- Consistent spacing and typography
- Accessible design patterns

## 🔌 API Integration

### RESTful API Client
- Centralized API client with TypeScript support
- Automatic error handling and retries
- Authentication token management
- Request/response transformation

### WebSocket Integration
- Real-time data streaming
- Automatic reconnection handling
- Subscription management
- Event-driven architecture

## 🧪 Development Workflow

### Code Quality
```bash
npm run lint          # ESLint check
npm run lint:fix      # Auto-fix linting issues
npm run format        # Prettier formatting
npm run type-check    # TypeScript validation
```

### Testing
```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Git Hooks
- Pre-commit: Lint and format staged files
- Pre-push: Run tests and type checking
- Commit message validation

## 📈 Performance Optimizations

- **Code Splitting**: Route-based and component-based splitting
- **Image Optimization**: Next.js Image component with WebP support
- **Caching**: Aggressive caching for static assets and API responses
- **Bundle Analysis**: Built-in bundle analyzer for optimization insights

## 🔒 Security Features

- **Content Security Policy**: Strict CSP headers
- **Authentication**: Secure OAuth2/OIDC implementation
- **Authorization**: Role-based permissions system
- **Data Encryption**: Sensitive data encryption
- **Security Headers**: Comprehensive security headers

## 🚀 Deployment

### Docker Support
```dockerfile
# Multi-stage Docker build included
# Optimized for production deployment
```

### CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Quality Gates**: Code coverage and security scanning
- **Environment Promotion**: Dev → Staging → Production
- **Rolling Deployments**: Zero-downtime deployments

### Cloud Platforms
- **AWS**: ECS, EKS deployment configurations
- **Azure**: Container Apps, AKS support
- **GCP**: Cloud Run, GKE configurations

## 📋 Migration from Existing Templates

This consolidated frontend replaces three separate templates:

1. **Finixpa React Template** - Modern React components and structure
2. **HTML5 Template** - Static assets and design elements  
3. **Documentation Template** - Documentation structure and styling

### Assets Migration
- Images organized by category in `public/images/`
- Fonts consolidated in `public/fonts/`
- CSS converted to Tailwind utility classes
- JavaScript functionality converted to React hooks

### Component Modernization
- Class components converted to functional components
- Props interfaces defined with TypeScript
- Responsive design with mobile-first approach
- Accessibility improvements throughout

## 🔮 Future Enhancements

- **AI/ML Integration**: Predictive analytics dashboard
- **Mobile App**: React Native companion app
- **Advanced Reporting**: Power BI integration
- **IoT Integration**: Direct sensor data ingestion
- **Blockchain**: Asset provenance tracking

## 👥 Contributing

1. Follow the established code style and conventions
2. Write comprehensive tests for new features
3. Update documentation for any API changes
4. Follow the git flow branching strategy

## 📞 Support

For technical support and questions:
- Create an issue in the repository
- Contact the development team
- Review the troubleshooting guide in `/docs`

---

**Built with ❤️ for the Oil & Gas Industry**