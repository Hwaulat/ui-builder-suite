import { type ColumnDef, flexRender, type Table as ReactTable } from '@tanstack/react-table';
import { Table, THead, Tr, Th, TBody, Td } from '../table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  table: ReactTable<TData>;
}

export function TableFilter<TData, TValue>({
  columns,
  table,
}: DataTableProps<TData, TValue>) {
  return (
    <>
      <div className="overflow-hidden rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">
        <Table>
          <THead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr
                key={headerGroup.id}
                className="bg-[#F8FAFC] dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      className="text-left px-4 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wide"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </THead>
          <TBody>
            {table.getFilteredRowModel().rows?.length ? (
              table.getFilteredRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="px-2 py-2 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 last:border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} className="px-4 py-3.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </Td>
              </Tr>
            )}
          </TBody>
        </Table>
      </div>
    </>
  );
}
