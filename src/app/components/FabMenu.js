'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Plus, 
  Settings, 
  ChevronUp,
  BarChart2,
  UserPlus
} from 'react-feather';

export default function FabMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: 'Dashboard',
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
      label: 'Create User',
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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <div 
        className={`flex flex-col items-end gap-4 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg ${item.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setIsOpen(false)}
          >
            <span className="text-sm font-medium">{item.label}</span>
            <span className="flex items-center justify-center">
              {item.icon}
            </span>
          </Link>
        ))}
      </div>

      
      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${isOpen ? 'bg-blue-500 text-white rotate-45' : 'bg-blue-600 text-white'} transition-all duration-300`}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <ChevronUp size={24} />
        ) : (
          <Plus size={24} />
        )}
      </button>
    </div>
  );
}