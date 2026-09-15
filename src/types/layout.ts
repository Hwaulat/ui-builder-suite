import { LucideIcon } from "lucide-react";

export type SidebarItemType = {
  label: string;
  type?: 'section' | 'item';
  path?: string;
  icon?: LucideIcon;
  module?: string;
  badge?: React.ReactNode;
  children?: SidebarItemType[];
};
