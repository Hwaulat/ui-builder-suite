import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

interface Props {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  rowsPerPageOptions?: number[];
  spacing?: string;
}
export default function PaginationDefault({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 20, 50],
  spacing = 'gap-3',
}: Props) {
  const options = rowsPerPageOptions.map((n) => ({
    label: n,
    value: String(n),
  }));
  return (
    <div
      className={`flex flex-wrap items-center justify-between ${spacing} px-5 py-4 border-t border-gray-100 dark:border-gray-700`}
    >
      <div
        className={`flex items-center ${spacing} text-sm text-gray-500 dark:text-gray-400`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-nowrap font-medium">Rows per page</span>
          <Select
            value={String(rowsPerPage)}
            onValueChange={(value) => onRowsPerPageChange(Number(value))}
          >
            <SelectTrigger className="border border-gray-100 dark:border-gray-700 h-8 w-[77px] px-2 py-0.5 rounded-lg text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="text-sm tracking-widest font-medium dark:text-gray-500">
          {totalItems === 0
            ? '0'
            : `${(currentPage - 1) * rowsPerPage + 1}–${Math.min(currentPage * rowsPerPage, totalItems)}`}{' '}
          of {totalItems}
        </span>
      </div>
      <div className={`flex items-center gap-1`}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let page = i + 1;
          if (totalPages > 5 && currentPage > 3) page = currentPage - 2 + i;
          if (page > totalPages) return null;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-[#1F5AA6] text-white'
                  : 'border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
