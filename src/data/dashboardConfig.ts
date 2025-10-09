// Dynamic Configuration Data for Oil & Gas Operations Dashboard
// This file contains all configurable elements using soft coding principles

export const dashboardConfig = {
  // Application Branding
  branding: {
    appName: "Oil & Gas Operations Center",
    companyName: "Your Company Name",
    logo: "/images/logo/logo.svg",
    favicon: "/images/logo/favicon.ico",
    theme: {
      primary: "#0ea5e9",
      secondary: "#eab308",
      accent: "#22c55e",
      danger: "#ef4444",
      neutral: "#64748b"
    }
  },

  // Navigation Menu Configuration
  navigation: {
    mainMenu: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "ChartBarIcon",
        href: "/dashboard",
        permissions: ["read:dashboard"]
      },
      {
        id: "operations",
        label: "Operations",
        icon: "CogIcon",
        href: "/operations",
        permissions: ["read:operations"],
        submenu: [
          { id: "wells", label: "Wells", href: "/operations/wells" },
          { id: "pipelines", label: "Pipelines", href: "/operations/pipelines" },
          { id: "facilities", label: "Facilities", href: "/operations/facilities" }
        ]
      },
      {
        id: "monitoring",
        label: "Monitoring",
        icon: "EyeIcon",
        href: "/monitoring",
        permissions: ["read:monitoring"],
        submenu: [
          { id: "realtime", label: "Real-time Data", href: "/monitoring/realtime" },
          { id: "alerts", label: "Alerts", href: "/monitoring/alerts" },
          { id: "sensors", label: "Sensors", href: "/monitoring/sensors" }
        ]
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: "ChartLineIcon",
        href: "/analytics",
        permissions: ["read:analytics"]
      },
      {
        id: "maintenance",
        label: "Maintenance",
        icon: "WrenchIcon",
        href: "/maintenance",
        permissions: ["read:maintenance"]
      },
      {
        id: "reports",
        label: "Reports",
        icon: "DocumentIcon",
        href: "/reports",
        permissions: ["read:reports"]
      },
      {
        id: "settings",
        label: "Settings",
        icon: "SettingsIcon",
        href: "/settings",
        permissions: ["admin:system"]
      }
    ],
    quickActions: [
      {
        id: "emergency",
        label: "Emergency Stop",
        icon: "ExclamationTriangleIcon",
        action: "emergency_stop",
        variant: "danger"
      },
      {
        id: "new_alert",
        label: "Create Alert",
        icon: "BellIcon",
        action: "create_alert",
        variant: "warning"
      }
    ]
  },

  // Dashboard Widget Layouts
  dashboardLayouts: {
    executive: {
      name: "Executive Overview",
      description: "High-level KPIs and critical alerts",
      widgets: [
        {
          id: "kpi_overview",
          type: "metric_grid",
          position: { x: 0, y: 0, w: 12, h: 4 },
          config: {
            metrics: ["production_rate", "safety_score", "efficiency_index", "revenue"]
          }
        },
        {
          id: "production_trend",
          type: "line_chart",
          position: { x: 0, y: 4, w: 8, h: 6 },
          config: {
            title: "Production Trends",
            dataSource: "production_data",
            timeRange: "7d"
          }
        },
        {
          id: "critical_alerts",
          type: "alert_list",
          position: { x: 8, y: 4, w: 4, h: 6 },
          config: {
            title: "Critical Alerts",
            maxItems: 5,
            severity: ["critical", "high"]
          }
        }
      ]
    },
    operational: {
      name: "Operations Dashboard",
      description: "Real-time operational data and controls",
      widgets: [
        {
          id: "asset_status_map",
          type: "asset_map",
          position: { x: 0, y: 0, w: 8, h: 8 },
          config: {
            title: "Asset Status Map",
            defaultZoom: 10,
            showSensors: true
          }
        },
        {
          id: "sensor_readings",
          type: "sensor_grid",
          position: { x: 8, y: 0, w: 4, h: 4 },
          config: {
            title: "Live Sensor Data",
            refreshInterval: 5000
          }
        },
        {
          id: "recent_events",
          type: "event_timeline",
          position: { x: 8, y: 4, w: 4, h: 4 },
          config: {
            title: "Recent Events",
            maxItems: 10
          }
        }
      ]
    }
  },

  // Form Configurations
  forms: {
    asset_creation: {
      title: "Add New Asset",
      fields: [
        {
          name: "name",
          label: "Asset Name",
          type: "text",
          required: true,
          validation: { minLength: 2, maxLength: 50 }
        },
        {
          name: "type",
          label: "Asset Type",
          type: "select",
          required: true,
          options: [
            { value: "well", label: "Well" },
            { value: "pump", label: "Pump" },
            { value: "pipeline", label: "Pipeline" },
            { value: "valve", label: "Valve" },
            { value: "compressor", label: "Compressor" },
            { value: "separator", label: "Separator" }
          ]
        },
        {
          name: "location",
          label: "Location",
          type: "location_picker",
          required: true
        },
        {
          name: "specifications",
          label: "Technical Specifications",
          type: "key_value_pairs",
          required: false
        }
      ]
    },
    alert_creation: {
      title: "Create Alert",
      fields: [
        {
          name: "title",
          label: "Alert Title",
          type: "text",
          required: true
        },
        {
          name: "message",
          label: "Description",
          type: "textarea",
          required: true
        },
        {
          name: "severity",
          label: "Severity",
          type: "select",
          required: true,
          options: [
            { value: "critical", label: "Critical", color: "red" },
            { value: "high", label: "High", color: "orange" },
            { value: "medium", label: "Medium", color: "yellow" },
            { value: "low", label: "Low", color: "blue" },
            { value: "info", label: "Information", color: "gray" }
          ]
        },
        {
          name: "asset_id",
          label: "Related Asset",
          type: "asset_select",
          required: false
        }
      ]
    }
  },

  // Chart and Visualization Templates
  chartTemplates: {
    production_trend: {
      type: "line",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: "Production Trend Analysis" },
          legend: { position: "top" }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Production (bbl/day)" }
          },
          x: {
            title: { display: true, text: "Time" }
          }
        }
      }
    },
    pressure_distribution: {
      type: "doughnut",
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Pressure Distribution Across Assets" },
          legend: { position: "right" }
        }
      }
    },
    efficiency_comparison: {
      type: "bar",
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Operational Efficiency Comparison" }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: { display: true, text: "Efficiency %" }
          }
        }
      }
    }
  },

  // Notification Templates
  notifications: {
    templates: {
      safety_alert: {
        title: "Safety Alert",
        icon: "ExclamationTriangleIcon",
        sound: true,
        persistent: true,
        actions: [
          { label: "Acknowledge", action: "acknowledge" },
          { label: "View Details", action: "view_details" }
        ]
      },
      maintenance_reminder: {
        title: "Maintenance Reminder",
        icon: "WrenchIcon",
        sound: false,
        persistent: false,
        actions: [
          { label: "Schedule", action: "schedule_maintenance" },
          { label: "Dismiss", action: "dismiss" }
        ]
      },
      system_update: {
        title: "System Update",
        icon: "InformationCircleIcon",
        sound: false,
        persistent: false,
        actions: [
          { label: "Learn More", action: "learn_more" }
        ]
      }
    }
  }
};

// Asset Type Configurations
export const assetTypes = {
  well: {
    name: "Oil Well",
    icon: "oil-well",
    color: "#0ea5e9",
    sensors: ["pressure", "temperature", "flow_rate", "gas_detection"],
    specifications: [
      { key: "depth", label: "Depth (ft)", type: "number", unit: "ft" },
      { key: "diameter", label: "Diameter (in)", type: "number", unit: "in" },
      { key: "production_rate", label: "Production Rate (bbl/day)", type: "number", unit: "bbl/day" }
    ]
  },
  pump: {
    name: "Pump",
    icon: "pump",
    color: "#22c55e",
    sensors: ["pressure", "vibration", "power", "temperature"],
    specifications: [
      { key: "capacity", label: "Capacity (gpm)", type: "number", unit: "gpm" },
      { key: "head", label: "Total Head (ft)", type: "number", unit: "ft" },
      { key: "efficiency", label: "Efficiency (%)", type: "number", unit: "%" }
    ]
  },
  pipeline: {
    name: "Pipeline",
    icon: "pipeline",
    color: "#eab308",
    sensors: ["pressure", "flow_rate", "temperature", "corrosion"],
    specifications: [
      { key: "length", label: "Length (mi)", type: "number", unit: "mi" },
      { key: "diameter", label: "Diameter (in)", type: "number", unit: "in" },
      { key: "material", label: "Material", type: "select", options: ["Steel", "HDPE", "PVC"] }
    ]
  }
};

// Theme Configuration
export const themes = {
  light: {
    name: "Light Theme",
    colors: {
      background: "#ffffff",
      surface: "#f8fafc",
      primary: "#0ea5e9",
      text: "#1e293b"
    }
  },
  dark: {
    name: "Dark Theme",
    colors: {
      background: "#0f172a",
      surface: "#1e293b",
      primary: "#38bdf8",
      text: "#f1f5f9"
    }
  },
  industrial: {
    name: "Industrial Theme",
    colors: {
      background: "#18181b",
      surface: "#27272a",
      primary: "#0ea5e9",
      text: "#f4f4f5"
    }
  }
};

export default dashboardConfig;