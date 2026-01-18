'use client';

import { useEffect, useState } from 'react';

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;
    const trailLength = 10;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add new point to trail
      const newPoint = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrail((prev) => {
        const newTrail = [newPoint, ...prev].slice(0, trailLength);
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Cursor trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${20 - index * 1.5}px`,
            height: `${20 - index * 1.5}px`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(201, 169, 98, ${0.8 - index * 0.08}) 0%, transparent 70%)`,
            opacity: 1 - index * 0.1,
            transition: 'all 0.1s ease-out',
          }}
        />
      ))}

      {/* Main cursor glow */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '30px',
          height: '30px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(201, 169, 98, 0.6) 0%, rgba(201, 169, 98, 0.3) 50%, transparent 70%)',
          boxShadow: '0 0 20px rgba(201, 169, 98, 0.5)',
          transition: 'all 0.05s ease-out',
        }}
      />
    </>
  );
}
