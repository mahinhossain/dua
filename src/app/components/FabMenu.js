'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  UserPlus, 
  BarChart2, 
  Settings 
} from 'react-feather';

export default function BottomNavigationBar() {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: 'Home',
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    {
      icon: <Users size={20} />,
      label: 'Users',
      href: '/dashboard/users',
      active: pathname.startsWith('/dashboard/users') && !pathname.includes('create'),
    },
    {
      icon: <UserPlus size={20} />,
      label: 'Add',
      href: '/dashboard/users/create',
      active: pathname === '/dashboard/users/create',
    },
    {
      icon: <BarChart2 size={20} />,
      label: 'Reports',
      href: '/dashboard/reports',
      active: pathname === '/dashboard/reports',
    },
    {
      icon: <Settings size={20} />,
      label: 'Settings',
      href: '/dashboard/settings',
      active: pathname === '/dashboard/settings',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md flex justify-around items-center h-16 ">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center justify-center text-xs ${
            item.active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div>{item.icon}</div>
          <span className="text-[10px] mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
