import { useEffect, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import {
  Menu,
  PanelLeft,
  PanelLeftClose,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  User,
  LogOut
} from 'lucide-react';

import { useTheme } from '@/contexts/ThemeContext';
import { formatDate, formatTime } from '@/utils/format';
import { SiNpm } from 'react-icons/si';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from '@tanstack/react-router';

interface BrandType {
  title?: string;
  subtitle?: string;
  logo?: string;
}

interface TopBarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;

  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;

  pageTitle?: string;
  brand?: BrandType;

  npmLink?: string;
  showClock?: boolean;
  showNotification?: boolean;
  showThemeToggle?: boolean;
}

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-right hidden md:flex flex-col shrink-0">
      <p className="text-gray-900 dark:text-white text-[15px] font-semibold tabular-nums leading-tight tracking-wide">
        {formatTime(now)}
      </p>
      <p className="text-[#A2A9B6] text-xs font-medium leading-tight">
        {formatDate(now)}
      </p>
    </div>
  );
}

export function TopBar({
  collapsed,
  setCollapsed,
  sidebarOpen,
  setSidebarOpen,

  pageTitle,
  brand,

  npmLink = 'https://www.npmjs.com/package/@ragdalion/cli',
  showClock = true,
  showNotification = true,
  showThemeToggle = true,
}: TopBarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.navigate({ to: "/login" });
  };

  const title =
    pageTitle ||
    brand?.title ||
    (pathname === '/' ? 'Dashboard' : pathname.replace('/', '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()));

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 lg:px-6 gap-3 shrink-0 shadow-sm transition-colors duration-200">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0 lg:hidden"
      >
        <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0 hidden lg:flex"
      >
        {collapsed ? (
          <PanelLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <PanelLeftClose className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>



      <div className="flex-1" />

      {showThemeToggle && (
        <button
          onClick={toggleTheme}
          className="p-2 mr-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>
      )}

      <div className="flex items-center gap-4 shrink-0">
        {showClock && <Clock />}

        <div className="h-10 w-px bg-gray-200 dark:bg-gray-700 shrink-0 mx-1" />

        {showNotification && (
          <button className="p-2 relative hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors shrink-0">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800"></span>
          </button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1.5 pl-2 pr-3 rounded-lg transition-colors outline-none">
              <div className="w-9 h-9 rounded-full bg-[#4279ED] flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none mb-1">Admin</span>
                <span className="text-xs text-gray-400 font-medium leading-none">Super Admin</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-0 rounded-xl shadow-lg border-gray-100">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900">admin asep</p>
              <p className="text-xs text-slate-400 font-medium">12345678901011</p>
            </div>
            <DropdownMenuSeparator className="bg-gray-100" />
            <div className="p-1">
              <DropdownMenuItem className="px-3 py-2.5 text-gray-600 cursor-pointer hover:bg-gray-50 focus:bg-gray-50">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                Profile
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-gray-100" />
            <div className="p-1">
              <DropdownMenuItem 
                onClick={handleLogout}
                className="px-3 py-2.5 text-red-500 cursor-pointer hover:bg-red-50 focus:bg-red-50 focus:text-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
