import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

export function SortIcon({
  column,
  sortKey,
  sortDir,
}: {
  column: string;
  sortKey: string;
  sortDir: 'asc' | 'desc';
}) {
  if (column !== sortKey)
    return <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300 ml-1" />;
  return sortDir === 'asc' ? (
    <ChevronUp className="w-3.5 h-3.5 text-[#1F5AA6] ml-1" />
  ) : (
    <ChevronDown className="w-3.5 h-3.5 text-[#1F5AA6] ml-1" />
  );
}