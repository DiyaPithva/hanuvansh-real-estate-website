/**
 * SkeletonLoader — configurable skeleton card with shimmer animation.
 * Uses the `.skeleton` CSS class defined in index.css.
 *
 * Props:
 *   count     {number}  Number of skeleton cards to render (default: 3)
 *   className {string}  Additional CSS classes for each skeleton card
 */

import React from 'react';

export default function SkeletonLoader({ count = 3, className = '' }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`skeleton rounded-lg ${className}`}
          style={{
            minHeight: '280px',
            background: 'rgba(255,255,255,0.05)',
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
