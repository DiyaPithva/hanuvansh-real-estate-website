/**
 * AdminLayout.jsx — Fixed sidebar layout for all admin pages.
 *
 * Features:
 *  - Fixed 240px sidebar with navigation links to all admin sections
 *  - Active link highlighting via NavLink
 *  - Logout button at the bottom that dispatches logoutAdmin and redirects to /admin/login
 *  - Scrollable main content area with <Outlet />
 *
 * Requirements: 16.1, 15.5
 */

import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../store/authSlice.js';

// Navigation links for the sidebar
const NAV_LINKS = [
  { label: 'Dashboard',     to: '/admin/dashboard' },
  { label: 'Properties',    to: '/admin/properties' },
  { label: 'Add Property',  to: '/admin/properties/add' },
  { label: 'Inquiries',     to: '/admin/inquiries' },
  { label: 'Testimonials',  to: '/admin/testimonials' },
];

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutAdmin());
    navigate('/admin/login');
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: '#0a0a0a', color: '#FFFFFF' }}
    >
      {/* ----------------------------------------------------------------
          Fixed Sidebar
      ---------------------------------------------------------------- */}
      <aside
        style={{
          width: '240px',
          minHeight: '100vh',
          background: '#111111',
          borderRight: '1px solid rgba(212, 175, 55, 0.15)',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Brand / Logo area */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
          }}
        >
          <h1
            className="font-heading"
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#D4AF37',
              lineHeight: 1.3,
            }}
          >
            Hanuvansh Estate
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>
            Admin Panel
          </p>
        </div>

        {/* Navigation links */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin/dashboard'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#D4AF37' : '#9CA3AF',
                background: isActive
                  ? 'rgba(212, 175, 55, 0.08)'
                  : 'transparent',
                borderLeft: isActive
                  ? '3px solid #D4AF37'
                  : '3px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.getAttribute('aria-current')) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.background =
                    'rgba(255, 255, 255, 0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.getAttribute('aria-current')) {
                  e.currentTarget.style.color = '#9CA3AF';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout button at the bottom */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(212, 175, 55, 0.15)',
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: 'rgba(255, 107, 0, 0.1)',
              border: '1px solid rgba(255, 107, 0, 0.3)',
              borderRadius: '6px',
              color: '#FF6B00',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 0, 0.2)';
              e.currentTarget.style.borderColor = '#FF6B00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 0, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.3)';
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ----------------------------------------------------------------
          Main content area — scrollable
      ---------------------------------------------------------------- */}
      <main
        className="flex-1 overflow-auto"
        style={{ background: '#0a0a0a', minHeight: '100vh' }}
      >
        <Outlet />
      </main>
    </div>
  );
}
