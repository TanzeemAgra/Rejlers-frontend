# Installation Instructions

Follow these steps to install and run the Oil & Gas Frontend Dashboard.

## Prerequisites

- Node.js 18+ and npm 8+
- Git
- VS Code (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

## Quick Start

1. **Navigate to the project directory:**
   ```bash
   cd oil-gas-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   copy .env.example .env.local
   # Edit .env.local with your configuration values
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to http://localhost:3000

## Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript checking
npm run format           # Format with Prettier

# Testing (when implemented)
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## Project Features

✅ **Completed Features:**
- Modern Next.js 14 project structure with App Router
- TypeScript configuration with proper type definitions
- Tailwind CSS with custom design system for Oil & Gas industry
- Comprehensive configuration management system
- Dynamic, JSON-driven component architecture
- API client with error handling and authentication
- WebSocket manager for real-time data
- Mock data and development configurations
- ESLint and Prettier setup
- Responsive design system

🚧 **Ready for Implementation:**
- Authentication system (NextAuth.js configured)
- Dashboard components (structure and data ready)
- Chart components (configuration templates ready)
- Real-time monitoring (WebSocket foundation ready)
- Asset management (types and APIs defined)

## Configuration Options

The application is designed with soft coding principles. Key configurations:

- **Dashboard Layouts**: Modify `src/data/dashboardConfig.ts`
- **Asset Types**: Configure in `src/data/dashboardConfig.ts`
- **API Endpoints**: Update `src/lib/api/client.ts`
- **Environment Settings**: Use `.env.local` file
- **Themes**: Customize in `src/data/dashboardConfig.ts`

## Next Steps

1. **Backend Integration**: Connect to your FastAPI/Flask backend
2. **Authentication**: Configure OAuth2/OIDC provider
3. **Real-time Data**: Set up WebSocket server endpoints
4. **Custom Components**: Build specific dashboard widgets
5. **Testing**: Implement comprehensive test suite
6. **Deployment**: Set up CI/CD pipeline

## Troubleshooting

**TypeScript Errors**: The project includes some intentional type warnings that will be resolved when you install the full dependencies with `npm install`.

**Missing Dependencies**: Run `npm install` to install all required packages including React, Next.js, and development tools.

**Environment Variables**: Ensure all required environment variables are set in `.env.local` file.

## Support

This consolidated frontend replaces your three separate templates with a modern, scalable, and maintainable solution optimized for oil and gas operations management.