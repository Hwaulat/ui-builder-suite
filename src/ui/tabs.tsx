import { useState } from 'react';

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export type TabVariant =
  | 'default'
  | 'pill'
  | 'underline'
  | 'bordered'
  | 'solid';

export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps {
  items: TabItem[];
  variant?: TabVariant;
  orientation?: TabsOrientation;
  defaultValue?: string;
  fullWidth?: boolean;
}

const variantList: Record<TabVariant, string> = {
  default: 'bg-gray-100 dark:bg-gray-700/60 rounded-xl p-1 h-auto',
  pill: 'bg-transparent gap-1 h-auto',
  underline:
    'bg-transparent border-b border-gray-200 dark:border-gray-700 rounded-none h-auto gap-0 p-0',
  bordered:
    'bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl p-1 h-auto',
  solid: 'bg-gray-900 dark:bg-gray-700 rounded-xl p-1 h-auto',
};

const variantTrigger: Record<TabVariant, { base: string; active: string }> = {
  default: {
    base: 'text-gray-500 dark:text-gray-400 rounded-lg text-xs data-[state=inactive]:hover:text-gray-700 dark:data-[state=inactive]:hover:text-gray-300',
    active:
      'data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm',
  },
  pill: {
    base: 'rounded-full text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border border-transparent',
    active:
      'data-[state=active]:bg-gray-900 dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-gray-900 data-[state=active]:border-transparent',
  },
  underline: {
    base: 'rounded-none text-xs text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:text-gray-700 dark:hover:text-gray-300 pb-2 shadow-none bg-transparent px-3',
    active:
      'data-[state=active]:border-gray-900 dark:data-[state=active]:border-white data-[state=active]:text-gray-900 dark:data-[state=active]:text-white',
  },
  bordered: {
    base: 'text-xs text-gray-500 dark:text-gray-400 rounded-lg',
    active:
      'data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white',
  },
  solid: {
    base: 'text-xs text-gray-400 rounded-lg',
    active:
      'data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm',
  },
};

export function Tabs({
  items,
  variant = 'default',
  orientation = 'horizontal',
  defaultValue,
  fullWidth = false,
}: TabsProps) {
  const [active, setActive] = useState(defaultValue ?? items[0]?.value);

  const listCls = variantList[variant];
  const { base, active: activeCls } = variantTrigger[variant];

  const activeItem = items.find((i) => i.value === active);

  return (
    <div
      className={`flex ${
        orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col'
      }`}
    >
      <div
        className={`flex ${
          orientation === 'vertical' ? 'flex-col' : ''
        } ${listCls} ${fullWidth ? 'w-full' : ''}`}
      >
        {items.map((item) => {
          const isActive = active === item.value;

          return (
            <button
              key={item.value}
              disabled={item.disabled}
              onClick={() => setActive(item.value)}
              className={`${base} ${
                isActive ? activeCls : ''
              } h-8 px-3 font-medium transition-colors flex items-center gap-1.5 ${
                fullWidth ? 'flex-1' : ''
              }`}
            >
              {item.icon && (
                <span className="[&_svg]:w-3.5 [&_svg]:h-3.5 shrink-0">
                  {item.icon}
                </span>
              )}

              {item.label}

              {item.badge && (
                <span className="ml-0.5 text-[9px] bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-1 rounded-full leading-4">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className={orientation === 'vertical' ? 'flex-1' : 'mt-4'}>
        {activeItem?.content}
      </div>
    </div>
  );
}
