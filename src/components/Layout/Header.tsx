// Header.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Accessibility, MessageCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
      'hover:bg-gray-100',
      isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-700'
    );

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center">
        <div className="flex gap-4">
          <NavLink to="/" className={navLinkClass}>
            <Map className="w-5 h-5" />
            <span>Map</span>
          </NavLink>
          <NavLink to="/accessibility" className={navLinkClass}>
            <Accessibility className="w-5 h-5" />
            <span>Accessibility Check</span>
          </NavLink>
          <NavLink to="/complaints" className={navLinkClass}>
            <MessageCircle className="w-5 h-5" />
            <span>My Complaints</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
