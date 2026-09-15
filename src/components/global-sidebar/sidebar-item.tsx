import React, { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import type { SidebarItemType } from '@/types/layout';

interface Props {
  item: SidebarItemType;
  collapsed: boolean;
  isMobile: boolean;
  canAccess: (module?: string) => boolean;
}

const SidebarItem: React.FC<Props> = ({
  item,
  collapsed,
  // isMobile,
  canAccess,
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [open, setOpen] = useState(false);

  if (item.type === 'section') return null;

  const Icon = item.icon;
  if (!Icon) return null;

  const active = item.path
    ? item.path === '/'
      ? pathname === '/'
      : pathname.startsWith(item.path)
    : false;

  if (item.children) {
    const children = item.children.filter((c) => canAccess(c.module));

    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
            active
              ? 'bg-[#1F5AA6]/20 text-white'
              : 'text-[#7A9BBE] hover:bg-white/5 hover:text-white'
          }`}
        >
          <Icon className="w-5 h-5" />
          {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
          {!collapsed && (
            <ChevronDown
              className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`}
            />
          )}
        </button>

        {open && !collapsed && (
          <div className="ml-4 mt-1 border-l border-white/10 pl-3 space-y-1">
            {children.map((child) => {
              const ChildIcon = child.icon;
              return (
                <Link
                  key={child.path}
                  to={child.path || '#'}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#7A9BBE] hover:bg-white/5 hover:text-white"
                  activeProps={{ className: "text-white bg-white/5" }}
                >
                  {ChildIcon && <ChildIcon className="w-4 h-4" />}
                  {child.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path || '#'}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
        active
          ? 'bg-[#1F5AA6] text-white'
          : 'text-[#7A9BBE] hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      {!collapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && item.badge}
        </>
      )}
    </Link>
  );
};

export default SidebarItem;
