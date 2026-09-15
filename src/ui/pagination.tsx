import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react';

type PaginationVariant = 'default' | 'pill' | 'minimal' | 'outline' | 'compact';

interface PaginationProps {
  total: number;
  page?: number;
  onPageChange?: (page: number) => void;
  initialPage?: number;
  sibling?: number;
  variant?: PaginationVariant;
  showFirstLast?: boolean;
  showInfo?: boolean;
  pageSize?: number;
  className?: string;
}

export function Pagination({
  total,
  page,
  onPageChange,
  initialPage = 1,
  sibling = 1,
  variant = 'default',
  showFirstLast = false,
  showInfo = false,
  pageSize = 10,
  className,
}: PaginationProps) {
  const [internalPage, setInternalPage] = useState(initialPage);

  const currentPage = page ?? internalPage;
  const totalPages = Math.ceil(total / pageSize);

  const changePage = (p: number) => {
    if (p < 1 || p > totalPages) return;

    if (onPageChange) onPageChange(p);
    if (page === undefined) setInternalPage(p);
  };

  const getPages = () => {
    const pages: (number | '...')[] = [];

    const left = Math.max(2, currentPage - sibling);
    const right = Math.min(totalPages - 1, currentPage + sibling);

    pages.push(1);

    if (left > 2) pages.push('...');

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - 1) pages.push('...');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const btnBase =
    'inline-flex items-center justify-center text-xs font-medium transition-colors select-none cursor-pointer disabled:opacity-40 disabled:pointer-events-none';

  const variantStyles: Record<
    PaginationVariant,
    { page: (active: boolean) => string; nav: string; size: string }
  > = {
    default: {
      page: (a) =>
        a
          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg',
      nav: 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg',
      size: 'w-8 h-8',
    },
    pill: {
      page: (a) =>
        a
          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-full'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full',
      nav: 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full',
      size: 'w-8 h-8',
    },
    outline: {
      page: (a) =>
        a
          ? 'border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg'
          : 'border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-400 rounded-lg',
      nav: 'border border-gray-200 dark:border-gray-600 text-gray-400 hover:border-gray-400 dark:hover:border-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg',
      size: 'w-8 h-8',
    },
    minimal: {
      page: (a) =>
        a
          ? 'text-gray-900 dark:text-white font-bold underline underline-offset-2'
          : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
      nav: 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
      size: 'w-6 h-8 px-1',
    },
    compact: {
      page: (a) =>
        a
          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded',
      nav: 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded',
      size: 'w-7 h-7 text-[11px]',
    },
  };

  const s = variantStyles[variant];

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className ?? ""}`}>
        <button
          onClick={() => changePage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`${btnBase} ${s.nav} ${s.size}`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${s.nav} ${s.size}`}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <div className="flex items-center gap-1 flex-wrap">
        {showFirstLast && (
          <button
            onClick={() => changePage(1)}
            disabled={currentPage === 1}
            className={`${btnBase} ${s.nav} ${s.size}`}
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => changePage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`${btnBase} ${s.nav} ${s.size}`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        {getPages().map((p, i) =>
          p === '...' ? (
            <span
              key={`e-${i}`}
              className="w-8 h-8 flex items-center justify-center text-gray-400"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </span>
          ) : (
            <button
              key={p}
              onClick={() => changePage(p as number)}
              className={`${btnBase} ${s.page(currentPage === p)} ${s.size}`}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${s.nav} ${s.size}`}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        {showFirstLast && (
          <button
            onClick={() => changePage(totalPages)}
            disabled={currentPage === totalPages}
            className={`${btnBase} ${s.nav} ${s.size}`}
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {showInfo && (
        <p className="text-[10px] text-gray-400 dark:text-gray-500">
          Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, total)}{' '}
          of {total} results
        </p>
      )}
    </div>
  );
}
