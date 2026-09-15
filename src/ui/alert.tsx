import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Bell,
  X,
} from 'lucide-react';
import { cn } from '@/utils/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';
type AlertStyle = 'default' | 'filled' | 'outline' | 'toast';

interface AlertProps {
  variant?: AlertVariant;
  style?: AlertStyle;
  title?: string;
  description: string;
  dismissible?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantMap: Record<
  AlertVariant,
  {
    bg: string;
    border: string;
    icon: React.ReactNode;
    titleCls: string;
    descCls: string;
  }
> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: <Info className="w-4 h-4 text-blue-500" />,
    titleCls: 'text-blue-800 dark:text-blue-300',
    descCls: 'text-blue-700 dark:text-blue-400',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    titleCls: 'text-green-800 dark:text-green-300',
    descCls: 'text-green-700 dark:text-green-400',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    titleCls: 'text-amber-800 dark:text-amber-300',
    descCls: 'text-amber-700 dark:text-amber-400',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    icon: <XCircle className="w-4 h-4 text-red-500" />,
    titleCls: 'text-red-800 dark:text-red-300',
    descCls: 'text-red-700 dark:text-red-400',
  },
  neutral: {
    bg: 'bg-gray-50 dark:bg-gray-700/40',
    border: 'border-gray-200 dark:border-gray-600',
    icon: <Bell className="w-4 h-4 text-gray-500" />,
    titleCls: 'text-gray-800 dark:text-gray-200',
    descCls: 'text-gray-600 dark:text-gray-400',
  },
};

const filledMap: Record<AlertVariant, string> = {
  info: 'bg-blue-500 border-blue-500 text-white',
  success: 'bg-green-500 border-green-500 text-white',
  warning: 'bg-amber-500 border-amber-500 text-white',
  error: 'bg-red-500 border-red-500 text-white',
  neutral: 'bg-gray-800 border-gray-800 text-white dark:bg-gray-700',
};

export function Alert({
  variant = 'info',
  style = 'default',
  title,
  description,
  dismissible = false,
  icon,
  action,
  onClose,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const cfg = variantMap[variant];
  const resolvedIcon = icon ?? cfg.icon;

  if (style === 'filled') {
    return (
      <div
        className={cn(
          `relative flex items-start gap-3 rounded-xl border px-4 py-3 text-white ${filledMap[variant]} ${className}`,
        )}
      >
        <span className="mt-0.5 shrink-0 opacity-90">{resolvedIcon}</span>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold leading-none mb-1 text-white">
              {title}
            </p>
          )}
          <p className="text-xs opacity-90">{description}</p>
          {action && <div className="mt-2">{action}</div>}
        </div>
        {dismissible && (
          <button
            onClick={() => {
              setDismissed(true);
              onClose?.();
            }}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  if (style === 'outline') {
    return (
      <div
        className={cn(
          `relative flex items-start gap-3 rounded-xl border-2 bg-white dark:bg-transparent px-4 py-3 ${cfg.border} ${className}`,
        )}
      >
        <span className="mt-0.5 shrink-0">{resolvedIcon}</span>
        <div className="flex-1 min-w-0">
          {title && (
            <p
              className={cn(
                `text-sm font-semibold leading-none mb-1 ${cfg.titleCls}`,
              )}
            >
              {title}
            </p>
          )}
          <p className={cn(`text-xs ${cfg.descCls}`)}>{description}</p>
          {action && <div className="mt-2">{action}</div>}
        </div>
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  if (style === 'toast') {
    return (
      <div
        className={cn(
          `flex items-center gap-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md px-4 py-3 ${className}`,
        )}
      >
        <span className="shrink-0">{resolvedIcon}</span>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-xs font-semibold text-gray-900 dark:text-white">
              {title}
            </p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  // default
  return (
    <div
      className={cn(
        `relative flex items-start gap-3 rounded-xl border px-4 py-3 ${cfg.bg} ${cfg.border} ${className}`,
      )}
    >
      <span className="mt-0.5 shrink-0">{resolvedIcon}</span>
      <div className="flex-1 min-w-0">
        {title && (
          <p
            className={cn(
              `text-sm font-semibold leading-none mb-1 ${cfg.titleCls}`,
            )}
          >
            {title}
          </p>
        )}
        <p className={cn(`text-xs ${cfg.descCls}`)}>{description}</p>
        {action && <div className="mt-2">{action}</div>}
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
