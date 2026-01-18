'use client';

import { useState } from 'react';
import { GODS } from '@/lib/gods';
import type { GodName } from '@/types';

interface GodAvatarProps {
  godName: GodName;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-32 h-32',
};

// Fallback images for Greek gods (using Wikipedia Commons as backup)
const fallbackImages: Record<GodName, string> = {
  zeus: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Zeus_Otricoli_Pio-Clementino_Inv257.jpg/512px-Zeus_Otricoli_Pio-Clementino_Inv257.jpg',
  athena: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Athena_Parthenos_Altemps_Inv8622.jpg/512px-Athena_Parthenos_Altemps_Inv8622.jpg',
  hermes: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Hermes_Logios_Altemps_Inv8626.jpg/512px-Hermes_Logios_Altemps_Inv8626.jpg',
};

export function GodAvatar({ godName, size = 'md', className = '' }: GodAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const god = GODS[godName];
  const currentImage = imageError ? fallbackImages[godName] : god.avatar;

  if (imageError) {
    // Fallback - show a placeholder with god's initial
    const shineClass = 
      godName === 'athena' ? 'golden-shine-A' :
      godName === 'zeus' ? 'golden-shine-Z' :
      godName === 'hermes' ? 'golden-shine-H' : '';
    
    return (
      <div className={`${sizeClasses[size]} rounded-full border-2 border-gold/30 bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center ${className}`}>
        <span className={`text-gold font-serif font-bold text-xl ${shineClass}`}>
          {god.displayName[0]}
        </span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-gold/40 bg-black/40 shadow-lg shadow-gold/20 ${className} relative`}>
      <img
        src={currentImage}
        alt={god.displayName}
        className="w-full h-full object-cover object-center"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        onError={() => {
          setImageError(true);
        }}
        loading="eager"
      />
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-gold/10 pointer-events-none" />
    </div>
  );
}
