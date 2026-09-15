import { useMemo, useState } from 'react';
import Pagination1 from '../pagination/pagination-default';
import { Table, TBody, Td, Th, THead, Tr } from '../table';
import type { SortDir } from '../table';
import { SortIcon } from '../sort';
import { PackageSearch } from 'lucide-react';

export type SortKey = string;
export type { SortDir };

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (row: any, idx: number) => React.ReactNode;
  className?: string;
}

interface Table1Props {
  data: any[];
  columns: TableColumn[];
  spacing?: string; // e.g. "px-2 py-2"
  rowsPerPageOptions?: number[];
}

export default function TableWrapper({
  data,
  columns,
  spacing = 'px-4 py-3.5',
  rowsPerPageOptions = [5, 10, 20, 50],
}: Table1Props) {
  const [sortKey, setSortKey] = useState<SortKey>(columns[0]?.key || '');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1] || 10);

  const filteredData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const cmp =
        a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const paginated = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <>
      <div className="overflow-x-auto">
        <Table className="w-full text-sm min-w-[900px]">
          <THead>
            <Tr className="bg-[#F8FAFC] dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
              {columns.map((col) => (
                <Th
                  key={col.key}
                  className={`${spacing} ${col.className || ''} text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wide ${col.sortable ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none' : ''}`}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  style={{ textAlign: col.align || 'left' }}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && (
                      <SortIcon
                        column={col.key}
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    )}
                  </div>
                </Th>
              ))}
            </Tr>
          </THead>
          <TBody>
            {paginated.length === 0 ? (
              <Tr>
                <Td
                  colSpan={columns.length}
                  className={`${spacing} text-center`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <PackageSearch className="w-10 h-10 text-gray-200 dark:text-gray-600" />
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                      No data found
                    </p>
                  </div>
                </Td>
              </Tr>
            ) : (
              paginated.map((row, idx) => (
                <Tr
                  key={row.id || idx}
                  className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-blue-50/30 dark:hover:bg-gray-700/30 transition-colors last:border-0"
                >
                  {columns.map((col) => (
                    <Td
                      key={col.key}
                      className={`${spacing} ${col.className || ''}`}
                      style={{ textAlign: col.align || 'left' }}
                    >
                      {col.render ? col.render(row, idx) : row[col.key]}{' '}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </TBody>
        </Table>
      </div>

      <Pagination1
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / rowsPerPage)}
        rowsPerPage={rowsPerPage}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(n) => {
          setRowsPerPage(n);
          setCurrentPage(1);
        }}
        rowsPerPageOptions={rowsPerPageOptions}
        spacing="gap-4" // contoh custom spacing
      />
    </>
  );
}
