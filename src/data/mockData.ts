// Mock Data for Development and Testing
// This file provides realistic sample data for the oil & gas dashboard

export const mockAssets = [
  {
    id: "asset-001",
    name: "Well Alpha-7",
    type: "well",
    location: {
      id: "loc-001",
      name: "North Field Alpha",
      latitude: 29.8047,
      longitude: -95.3635,
      address: "North Field, Houston, TX",
      facility: "Alpha Production Facility",
      zone: "Zone A"
    },
    status: "operational",
    specifications: [
      { key: "depth", value: "8500", unit: "ft", category: "physical" },
      { key: "diameter", value: "8.5", unit: "in", category: "physical" },
      { key: "production_rate", value: "450", unit: "bbl/day", category: "performance" }
    ],
    sensors: [
      {
        id: "sensor-001",
        name: "Wellhead Pressure",
        type: "pressure",
        unit: "psi",
        currentValue: 1250,
        status: "active",
        lastReading: new Date().toISOString(),
        thresholds: {
          critical: { min: 800, max: 1500 },
          warning: { min: 900, max: 1400 },
          normal: { min: 1000, max: 1300 }
        }
      },
      {
        id: "sensor-002",
        name: "Downhole Temperature",
        type: "temperature",
        unit: "°F",
        currentValue: 185,
        status: "active",
        lastReading: new Date().toISOString(),
        thresholds: {
          critical: { max: 220 },
          warning: { max: 200 },
          normal: { max: 190 }
        }
      }
    ],
    alerts: [
      {
        id: "alert-001",
        title: "Pressure Slightly Elevated",
        message: "Wellhead pressure is approaching warning threshold",
        severity: "medium",
        type: "threshold_exceeded",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        acknowledged: false,
        resolved: false,
        assetId: "asset-001",
        sensorId: "sensor-001"
      }
    ],
    lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    nextMaintenance: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "asset-002",
    name: "Pipeline Beta-Main",
    type: "pipeline",
    location: {
      id: "loc-002",
      latitude: 29.7604,
      longitude: -95.3698,
      address: "Main Transport Line, Houston, TX",
      facility: "Central Processing Hub",
      zone: "Zone B"
    },
    status: "operational",
    specifications: [
      { key: "length", value: "25.5", unit: "mi", category: "physical" },
      { key: "diameter", value: "24", unit: "in", category: "physical" },
      { key: "material", value: "Steel", unit: "", category: "construction" }
    ],
    sensors: [
      {
        id: "sensor-003",
        name: "Line Pressure",
        type: "pressure",
        unit: "psi",
        currentValue: 875,
        status: "active",
        lastReading: new Date().toISOString(),
        thresholds: {
          critical: { min: 700, max: 1100 },
          warning: { min: 750, max: 1050 },
          normal: { min: 800, max: 1000 }
        }
      },
      {
        id: "sensor-004",
        name: "Flow Rate",
        type: "flow_rate",
        unit: "bbl/hr",
        currentValue: 1250,
        status: "active",
        lastReading: new Date().toISOString(),
        thresholds: {
          critical: { min: 500, max: 2000 },
          warning: { min: 600, max: 1800 },
          normal: { min: 800, max: 1600 }
        }
      }
    ],
    alerts: [],
    lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    nextMaintenance: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "asset-003",
    name: "Compressor Station Gamma",
    type: "compressor",
    location: {
      id: "loc-003",
      latitude: 29.7230,
      longitude: -95.4077,
      address: "Gamma Station, Houston, TX",
      facility: "Compression Facility Gamma",
      zone: "Zone C"
    },
    status: "warning",
    specifications: [
      { key: "capacity", value: "15000", unit: "scf/min", category: "performance" },
      { key: "stages", value: "3", unit: "", category: "configuration" },
      { key: "power", value: "2500", unit: "hp", category: "electrical" }
    ],
    sensors: [
      {
        id: "sensor-005",
        name: "Suction Pressure",
        type: "pressure",
        unit: "psi",
        currentValue: 425,
        status: "active",
        lastReading: new Date().toISOString(),
        thresholds: {
          critical: { min: 300, max: 600 },
          warning: { min: 350, max: 550 },
          normal: { min: 400, max: 500 }
        }
      },
      {
        id: "sensor-006",
        name: "Vibration Level",
        type: "vibration",
        unit: "mm/s",
        currentValue: 12.5,
        status: "active",
        lastReading: new Date().toISOString(),
        thresholds: {
          critical: { max: 20 },
          warning: { max: 15 },
          normal: { max: 10 }
        }
      }
    ],
    alerts: [
      {
        id: "alert-002",
        title: "High Vibration Detected",
        message: "Compressor vibration levels exceed normal operating range",
        severity: "high",
        type: "threshold_exceeded",
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        acknowledged: true,
        acknowledgedBy: "john.doe@company.com",
        acknowledgedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        resolved: false,
        assetId: "asset-003",
        sensorId: "sensor-006"
      }
    ],
    lastMaintenance: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    nextMaintenance: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockUsers = [
  {
    id: "user-001",
    email: "john.doe@company.com",
    name: "John Doe",
    role: "operator",
    department: "operations",
    permissions: [
      { id: "perm-001", name: "read:dashboard", description: "View dashboard", module: "dashboard" },
      { id: "perm-002", name: "read:operations", description: "View operations data", module: "operations" },
      { id: "perm-003", name: "write:operations", description: "Modify operations data", module: "operations" }
    ],
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isActive: true
  },
  {
    id: "user-002",
    email: "jane.smith@company.com",
    name: "Jane Smith",
    role: "supervisor",
    department: "safety",
    permissions: [
      { id: "perm-001", name: "read:dashboard", description: "View dashboard", module: "dashboard" },
      { id: "perm-004", name: "read:safety", description: "View safety data", module: "safety" },
      { id: "perm-005", name: "write:safety", description: "Modify safety data", module: "safety" },
      { id: "perm-006", name: "admin:alerts", description: "Manage system alerts", module: "alerts" }
    ],
    lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isActive: true
  }
];

export const mockDashboardData = {
  kpis: {
    production_rate: {
      current: 15750,
      unit: "bbl/day",
      change: 2.5,
      changeType: "increase",
      target: 16000,
      status: "good"
    },
    safety_score: {
      current: 94.2,
      unit: "%",
      change: -0.8,
      changeType: "decrease",
      target: 95.0,
      status: "warning"
    },
    efficiency_index: {
      current: 87.5,
      unit: "%",
      change: 1.2,
      changeType: "increase",
      target: 90.0,
      status: "good"
    },
    revenue: {
      current: 2.1,
      unit: "M USD",
      change: 5.3,
      changeType: "increase",
      target: 2.0,
      status: "excellent"
    }
  },
  
  productionTrend: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Oil Production",
        data: [14200, 14800, 15100, 15600, 15400, 15750],
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        tension: 0.4
      },
      {
        label: "Gas Production",
        data: [8500, 8750, 8900, 9100, 8950, 9200],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4
      }
    ]
  },

  alertSummary: {
    critical: 2,
    high: 5,
    medium: 12,
    low: 8,
    info: 15
  },

  assetStatusDistribution: {
    labels: ["Operational", "Warning", "Critical", "Maintenance", "Offline"],
    datasets: [
      {
        data: [75, 12, 3, 8, 2],
        backgroundColor: [
          "#22c55e",
          "#eab308",
          "#ef4444",
          "#0ea5e9",
          "#64748b"
        ]
      }
    ]
  }
};

export const mockTimeSeriesData = {
  wellPressure: {
    "asset-001": Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
      value: 1200 + Math.sin(i * 0.5) * 50 + Math.random() * 20
    }))
  },
  
  pipelineFlow: {
    "asset-002": Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
      value: 1250 + Math.cos(i * 0.3) * 100 + Math.random() * 30
    }))
  }
};

// Export all mock data
export const mockData = {
  assets: mockAssets,
  users: mockUsers,
  dashboard: mockDashboardData,
  timeSeries: mockTimeSeriesData
};

export default mockData;
