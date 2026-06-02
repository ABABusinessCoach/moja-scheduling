import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutGrid,
  Users,
  UserRound,
  CalendarDays,
  AlertTriangle,
  LogOut,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',     label: 'Dashboard',     icon: <LayoutGrid size={16} /> },
  { id: 'schedule',      label: 'Schedule',      icon: <CalendarDays size={16} /> },
  { id: 'staff',         label: 'Staff',         icon: <Users size={16} /> },
  { id: 'clients',       label: 'Clients',       icon: <UserRound size={16} /> },
  { id: 'cancellations', label: 'Cancellations', icon: <AlertTriangle size={16} /> },
];

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { user, signOut } = useAuth();
  const initials = (user?.email?.[0] ?? 'U').toUpperCase();

  return (
    <aside
      className="w-[214px] flex-shrink-0 flex flex-col h-full relative overflow-hidden"
      style={{
        background: '#355574',
        borderRight: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      {/* Brand accent blobs — irregular circles at 35% transparency per brand guide */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-40px',
          right: '-30px',
          width: '130px',
          height: '140px',
          borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
          background: '#6dccc2',
          opacity: 0.35,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '80px',
          left: '-30px',
          width: '110px',
          height: '120px',
          borderRadius: '45% 55% 40% 60% / 55% 45% 55% 45%',
          background: '#e66d38',
          opacity: 0.25,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-20px',
          right: '-20px',
          width: '90px',
          height: '95px',
          borderRadius: '50% 50% 40% 60% / 45% 55% 50% 50%',
          background: '#df76b6',
          opacity: 0.2,
        }}
      />

      {/* Logo */}
      <div className="px-5 pt-6 pb-5 relative">
        <div className="flex items-center gap-3">
          {/* Brand mark: two overlapping circles from the logo */}
          <div className="relative w-9 h-9 flex-shrink-0">
            <span
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full"
              style={{ background: '#e66d38' }}
            />
            <span
              className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full"
              style={{ background: '#6dccc2', opacity: 0.95 }}
            />
          </div>
          <div className="leading-none">
            <p className="font-bold text-[18px] tracking-tight text-white leading-none">moja</p>
            <p
              className="text-[9px] font-bold uppercase mt-1"
              style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.16em' }}
            >
              Behavioral Services
            </p>
          </div>
        </div>

        <div
          className="mt-5 h-px"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        />
      </div>

      {/* Section label */}
      <p
        className="px-5 mb-1.5 relative text-[10px] font-bold uppercase"
        style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em' }}
      >
        Menu
      </p>

      {/* Nav items */}
      <nav className="flex-1 px-2.5 space-y-0.5 overflow-y-auto relative">
        {NAV_ITEMS.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150 text-left relative group"
              style={
                active
                  ? {
                      background: 'rgba(255,255,255,0.18)',
                      color: '#ffffff',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                    }
                  : { color: 'rgba(255,255,255,0.65)' }
              }
            >
              {!active && (
                <span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />
              )}
              <span
                className="relative z-10 flex-shrink-0 transition-colors"
                style={{ color: active ? '#6dccc2' : 'rgba(255,255,255,0.5)' }}
              >
                {item.icon}
              </span>
              <span className="relative z-10 group-hover:text-white transition-colors">
                {item.label}
              </span>
              {active && (
                <span
                  className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#6dccc2' }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2.5 pb-4 mt-2 relative">
        <div
          className="h-px mb-3 mx-2"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />

        {/* User row */}
        <div className="flex items-center gap-2.5 px-3 py-2 mb-0.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            {initials}
          </div>
          <p
            className="text-xs truncate font-medium"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {user?.email}
          </p>
        </div>

        {/* Sign out */}
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 group relative"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          <span
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(0,0,0,0.1)' }}
          />
          <LogOut
            size={15}
            className="relative z-10"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          />
          <span className="relative z-10 group-hover:text-white transition-colors">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
