import { XCircle } from 'lucide-react';

export type BadgeColor =
  | 'gray'
  | 'blue'
  | 'green'
  | 'red'
  | 'amber'
  | 'purple'
  | 'pink'
  | 'cyan';
export type BadgeStyle = 'soft' | 'solid' | 'outline' | 'dot';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  style?: BadgeStyle;
  size?: BadgeSize;
  icon?: React.ReactNode;
  dot?: boolean;
  removable?: boolean;
  className?: string;
}

const colorMap: Record<
  BadgeColor,
  { soft: string; solid: string; outline: string; dot: string }
> = {
  gray: {
    soft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    solid: 'bg-gray-800 text-white',
    outline:
      'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 bg-transparent',
    dot: 'bg-gray-400',
  },
  blue: {
    soft: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    solid: 'bg-blue-600 text-white',
    outline:
      'border border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-400 bg-transparent',
    dot: 'bg-blue-500',
  },
  green: {
    soft: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    solid: 'bg-green-600 text-white',
    outline:
      'border border-green-300 text-green-700 dark:border-green-600 dark:text-green-400 bg-transparent',
    dot: 'bg-green-500',
  },
  red: {
    soft: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    solid: 'bg-red-600 text-white',
    outline:
      'border border-red-300 text-red-700 dark:border-red-600 dark:text-red-400 bg-transparent',
    dot: 'bg-red-500',
  },
  amber: {
    soft: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    solid: 'bg-amber-500 text-white',
    outline:
      'border border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-400 bg-transparent',
    dot: 'bg-amber-500',
  },
  purple: {
    soft: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    solid: 'bg-purple-600 text-white',
    outline:
      'border border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-400 bg-transparent',
    dot: 'bg-purple-500',
  },
  pink: {
    soft: 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    solid: 'bg-pink-500 text-white',
    outline:
      'border border-pink-300 text-pink-700 dark:border-pink-600 dark:text-pink-400 bg-transparent',
    dot: 'bg-pink-500',
  },
  cyan: {
    soft: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
    solid: 'bg-cyan-600 text-white',
    outline:
      'border border-cyan-300 text-cyan-700 dark:border-cyan-600 dark:text-cyan-400 bg-transparent',
    dot: 'bg-cyan-500',
  },
};

const sizeMap: Record<BadgeSize, string> = {
  sm: 'text-[10px] h-4 px-1.5 gap-0.5',
  md: 'text-xs h-5 px-2 gap-1',
  lg: 'text-sm h-6 px-2.5 gap-1.5',
};

export function Badge({
  children,
  color = 'gray',
  style = 'soft',
  size = 'md',
  icon,
  dot = false,
  removable = false,
  className = '',
}: BadgeProps) {
  const colorCls = colorMap[color][style];
  const sizeCls = sizeMap[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${colorCls} ${sizeCls} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${colorMap[color].dot}`}
        />
      )}

      {icon && <span className="shrink-0 [&_svg]:w-3 [&_svg]:h-3">{icon}</span>}

      {children}

      {removable && (
        <button className="ml-0.5 opacity-60 hover:opacity-100">
          <XCircle className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
