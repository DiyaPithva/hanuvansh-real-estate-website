// Feature: hanuvansh-mern-estate, Property 9: ProtectedRoute redirects unauthenticated users

/**
 * Property 9: ProtectedRoute redirects unauthenticated users
 * Validates: Requirements 15.4
 *
 * When `adminToken` is absent from localStorage, ProtectedRoute renders <Navigate>.
 * When `adminToken` is a non-empty string, ProtectedRoute renders its children.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import ProtectedRoute from './ProtectedRoute';

// Helper: render ProtectedRoute inside a MemoryRouter with a sentinel child
function renderProtectedRoute(token) {
  // Mock localStorage.getItem to return the given token value
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'adminToken') return token;
    return null;
  });

  return render(
    <MemoryRouter initialEntries={['/admin/dashboard']}>
      <ProtectedRoute>
        <div data-testid="protected-child">Protected Content</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
}

describe('ProtectedRoute – Property 9: redirects unauthenticated users', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when a non-empty token is present', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary non-empty strings as tokens
        fc.string({ minLength: 1 }),
        (token) => {
          const { unmount } = renderProtectedRoute(token);

          // Children should be rendered
          const child = screen.queryByTestId('protected-child');
          expect(child).not.toBeNull();

          unmount();
          vi.restoreAllMocks();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('renders Navigate (redirect) when token is null', () => {
    // null simulates localStorage.getItem returning null (key not set)
    const { container } = renderProtectedRoute(null);

    // Children should NOT be rendered
    expect(screen.queryByTestId('protected-child')).toBeNull();

    // The component should not render any visible content (Navigate redirects)
    // MemoryRouter will handle the redirect internally; the child is absent
    expect(container.firstChild).toBeNull();
  });

  it('renders Navigate (redirect) when token is empty string', () => {
    const { container } = renderProtectedRoute('');

    expect(screen.queryByTestId('protected-child')).toBeNull();
    expect(container.firstChild).toBeNull();
  });

  it('renders Navigate (redirect) for all absent/falsy token values via property test', () => {
    // Absent tokens: null, undefined, empty string
    const absentTokens = fc.oneof(
      fc.constant(null),
      fc.constant(undefined),
      fc.constant('')
    );

    fc.assert(
      fc.property(absentTokens, (token) => {
        const { container, unmount } = renderProtectedRoute(token);

        // Children must NOT be rendered
        expect(screen.queryByTestId('protected-child')).toBeNull();
        // Container should be empty (Navigate produces no DOM output in MemoryRouter)
        expect(container.firstChild).toBeNull();

        unmount();
        vi.restoreAllMocks();
      }),
      { numRuns: 100 }
    );
  });
});
