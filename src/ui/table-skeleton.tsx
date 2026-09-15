import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { Table, TBody, Td, Th, THead, Tr } from "./table";

export default memo(function TableSkeleton({ 
  rowCount = 5, 
  colCount = 5,
  headClassName = "",
  bodyClassName = "",
}: { 
  rowCount?: number; 
  colCount?: number; 
  headClassName?: string; 
  bodyClassName?: string; 
}) {
  const cols = [...Array(colCount)].map((_, i) => <Th key={i}     colSpan={colCount}><div className={twMerge("w-full h-[20px] rounded bg-slate-200 animate-pulse", headClassName)}></div></Th>);
  const rows = [...Array(rowCount)].map((_, i) => <Tr key={i}><Td colSpan={colCount}><div className={twMerge("w-full h-[44px] rounded bg-slate-200 animate-pulse", bodyClassName)}></div></Td></Tr>);

  return (
    <Table>
      <THead><Tr className="border-b bg-[#F0F1F3]">{cols}</Tr></THead>
      <TBody>{rows}</TBody>
    </Table>
  );
});