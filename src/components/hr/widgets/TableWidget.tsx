/**
 * Table Widget Component
 * =====================
 * 
 * Advanced data table with sorting, filtering, pagination,
 * and customizable actions.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { TableConfig, WidgetConfig, TableColumn } from '@/config/hrDashboardConfig';
import { 
  Table,
  Search,
  Filter,
  Download,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TableWidgetProps {
  config: TableConfig;
  data: any;
  isCustomizing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<WidgetConfig>) => void;
  onRemove: () => void;
  theme: 'light' | 'dark';
  density: 'compact' | 'comfortable' | 'spacious';
}

const TableWidget: React.FC<TableWidgetProps> = ({
  config,
  data,
  isCustomizing,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
  theme,
  density
}) => {
  const tableConfig = config.table;
  const tableData = data.tableData || [];
  
  // Table state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Process and filter data
  const processedData = useMemo(() => {
    let filtered = [...tableData];

    // Apply search
    if (searchTerm && tableConfig.searchable) {
      filtered = filtered.filter((row: any) =>
        Object.values(row).some((value: any) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([column, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter((row: any) => {
          const cellValue = row[column];
          if (typeof filterValue === 'string') {
            return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
          }
          return cellValue === filterValue;
        });
      }
    });

    // Apply sorting
    if (sortColumn) {
      filtered.sort((a: any, b: any) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = aVal.toString().toLowerCase();
        const bStr = bVal.toString().toLowerCase();
        
        if (sortDirection === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return filtered;
  }, [tableData, searchTerm, filters, sortColumn, sortDirection, tableConfig.searchable]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / tableConfig.pageSize);
  const startIndex = (currentPage - 1) * tableConfig.pageSize;
  const paginatedData = processedData.slice(startIndex, startIndex + tableConfig.pageSize);

  const handleSort = (column: string) => {
    const columnConfig = tableConfig.columns.find(col => col.key === column);
    if (!columnConfig?.sortable) return;

    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleRowSelect = (rowId: string) => {
    if (!tableConfig.selectable) return;
    
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((row: any) => row.id)));
    }
  };

  const renderCellContent = (row: any, column: TableColumn) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }

    switch (column.type) {
      case 'avatar':
        return (
          <div className="flex items-center justify-center">
            {value ? (
              <img
                src={value}
                alt={row.name || 'Avatar'}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        );
      case 'boolean':
        return (
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
            value 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {value ? 'Yes' : 'No'}
          </div>
        );
      case 'status':
        const statusColors: Record<string, string> = {
          active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
          inactive: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
          pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
          draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
        return (
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[value?.toLowerCase()] || statusColors.draft
          }`}>
            {value}
          </div>
        );
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '-';
      case 'number':
        if (column.format === 'percentage') {
          return `${Number(value).toFixed(1)}%`;
        }
        return Number(value).toLocaleString();
      case 'action':
        return (
          <div className="flex items-center space-x-1">
            {tableConfig.rowActions?.map((action) => (
              <button
                key={action.key}
                onClick={() => action.handler(row)}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  action.type === 'danger' ? 'text-red-600 hover:text-red-700' :
                  action.type === 'primary' ? 'text-blue-600 hover:text-blue-700' :
                  'text-gray-600 hover:text-gray-700'
                }`}
                title={action.label}
              >
                {action.icon || <MoreHorizontal className="w-4 h-4" />}
              </button>
            ))}
          </div>
        );
      default:
        return value || '-';
    }
  };

  const getDensityClasses = () => {
    switch (density) {
      case 'compact':
        return 'p-3';
      case 'spacious':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const cardClasses = `
    relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700
    ${getDensityClasses()}
    ${isCustomizing ? 'cursor-pointer hover:shadow-lg transition-all duration-200' : ''}
    ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''}
  `;

  return (
    <motion.div
      className={cardClasses}
      onClick={isCustomizing ? onSelect : undefined}
      whileHover={isCustomizing ? { scale: 1.01 } : {}}
      layout
    >
      {/* Customization Controls */}
      {isCustomizing && isSelected && (
        <div className="absolute top-2 right-2 flex space-x-1 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            title="Edit Widget"
          >
            <Edit className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
            title="Remove Widget"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Table className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {config.title}
            </h3>
            {config.subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {config.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Table Controls */}
        <div className="flex items-center space-x-2">
          {tableConfig.exportable && (
            <button
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Export Data"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      {(tableConfig.searchable || tableConfig.filterable) && (
        <div className="flex items-center space-x-4 mb-4">
          {tableConfig.searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
          
          {tableConfig.filterable && (
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {tableConfig.selectable && (
                <th className="w-10 px-3 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {tableConfig.columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-300' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={`w-3 h-3 ${
                            sortColumn === column.key && sortDirection === 'asc' 
                              ? 'text-blue-500' : 'text-gray-300'
                          }`} 
                        />
                        <ChevronDown 
                          className={`w-3 h-3 -mt-1 ${
                            sortColumn === column.key && sortDirection === 'desc' 
                              ? 'text-blue-500' : 'text-gray-300'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((row: any, index: number) => (
              <tr 
                key={row.id || index} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                {tableConfig.selectable && (
                  <td className="px-3 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                {tableConfig.columns.map((column) => (
                  <td 
                    key={column.key} 
                    className="px-3 py-4 text-sm text-gray-900 dark:text-gray-100"
                  >
                    {renderCellContent(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {processedData.length === 0 && (
        <div className="text-center py-12">
          <Table className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Data Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || Object.keys(filters).length > 0 
              ? 'No results match your search criteria.' 
              : 'No data available to display.'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {tableConfig.pagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + tableConfig.pageSize, processedData.length)} of {processedData.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TableWidget;