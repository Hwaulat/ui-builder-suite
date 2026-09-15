import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotificationDropdown() {
  return (
    <Button variant="ghost" size="icon" className="shrink-0 relative">
      <Bell className="w-5 h-5 text-gray-500" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </Button>
  );
}
