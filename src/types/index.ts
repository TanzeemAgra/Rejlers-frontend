// Type definitions for the Oil & Gas Frontend Application

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: Department;
  permissions: Permission[];
  lastLogin?: Date;
  isActive: boolean;
}

export enum UserRole {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  SUPERVISOR = 'supervisor',
  ENGINEER = 'engineer',
  SAFETY_OFFICER = 'safety_officer',
  MAINTENANCE = 'maintenance',
  VIEWER = 'viewer',
}

export enum Department {
  OPERATIONS = 'operations',
  SAFETY = 'safety',
  MAINTENANCE = 'maintenance',
  ENGINEERING = 'engineering',
  MANAGEMENT = 'management',
  IT = 'it',
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  module: string;
}

// Equipment and Asset Types
export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  location: Location;
  status: AssetStatus;
  specifications: AssetSpecification[];
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  sensors: Sensor[];
  alerts: Alert[];
}

export enum AssetType {
  WELL = 'well',
  PUMP = 'pump',
  PIPELINE = 'pipeline',
  VALVE = 'valve',
  COMPRESSOR = 'compressor',
  SEPARATOR = 'separator',
  TANK = 'tank',
  REFINERY_UNIT = 'refinery_unit',
}

export enum AssetStatus {
  OPERATIONAL = 'operational',
  MAINTENANCE = 'maintenance',
  OFFLINE = 'offline',
  CRITICAL = 'critical',
  WARNING = 'warning',
}

export interface AssetSpecification {
  key: string;
  value: string | number;
  unit?: string;
  category: string;
}

// Sensor and Monitoring Types
export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  unit: string;
  currentValue?: number;
  status: SensorStatus;
  lastReading?: Date;
  thresholds: SensorThreshold;
  location?: Location;
}

export enum SensorType {
  PRESSURE = 'pressure',
  TEMPERATURE = 'temperature',
  FLOW_RATE = 'flow_rate',
  LEVEL = 'level',
  VIBRATION = 'vibration',
  CORROSION = 'corrosion',
  GAS_DETECTION = 'gas_detection',
  POWER = 'power',
}

export enum SensorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error',
  CALIBRATING = 'calibrating',
}

export interface SensorThreshold {
  critical: { min?: number; max?: number };
  warning: { min?: number; max?: number };
  normal: { min?: number; max?: number };
}

// Location and Geographic Types
export interface Location {
  id?: string;
  name?: string;
  latitude: number;
  longitude: number;
  address?: string;
  facility?: string;
  zone?: string;
}

// Alert and Notification Types
export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  type: AlertType;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  assetId?: string;
  sensorId?: string;
  location?: Location;
}

export enum AlertSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info',
}

export enum AlertType {
  EQUIPMENT_FAILURE = 'equipment_failure',
  SAFETY_VIOLATION = 'safety_violation',
  ENVIRONMENTAL = 'environmental',
  MAINTENANCE_DUE = 'maintenance_due',
  SYSTEM_ERROR = 'system_error',
  THRESHOLD_EXCEEDED = 'threshold_exceeded',
}

// Dashboard and Analytics Types
export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
  position: WidgetPosition;
  config: WidgetConfig;
  dataSource?: string;
  refreshInterval?: number;
}

export enum WidgetType {
  CHART_LINE = 'chart_line',
  CHART_BAR = 'chart_bar',
  CHART_PIE = 'chart_pie',
  METRIC_CARD = 'metric_card',
  ALERT_LIST = 'alert_list',
  ASSET_STATUS = 'asset_status',
  MAP = 'map',
  TABLE = 'table',
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetConfig {
  [key: string]: any;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Configuration Types
export interface AppConfig {
  api: ApiConfig;
  auth: AuthConfig;
  app: AppSettings;
  features: FeatureFlags;
  monitoring: MonitoringConfig;
  maps: MapsConfig;
  charts: ChartsConfig;
  security: SecurityConfig;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

export interface AuthConfig {
  provider: string;
  clientId?: string;
  redirectUri?: string;
  scopes: string[];
}

export interface AppSettings {
  name: string;
  version: string;
  environment: string;
  debug: boolean;
  analytics?: string;
}

export interface FeatureFlags {
  realTimeMonitoring: boolean;
  aiPredictiveAnalytics: boolean;
  mobileApp: boolean;
  advancedReporting: boolean;
}

export interface MonitoringConfig {
  websocketUrl: string;
  alertThresholds: {
    pressure: { critical: number; warning: number };
    temperature: { critical: number; warning: number };
    flowRate: { critical: number; warning: number };
  };
}

export interface MapsConfig {
  provider: string;
  apiKey?: string;
  defaultCenter: { lat: number; lng: number };
  defaultZoom: number;
}

export interface ChartsConfig {
  theme: string;
  animations: boolean;
  refreshInterval: number;
}

export interface SecurityConfig {
  sessionTimeout: number;
  csrfProtection: boolean;
  encryptLocalStorage: boolean;
}