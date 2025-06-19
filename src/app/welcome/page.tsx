
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

// It's good practice to add metadata, though for client components it's often set in layout.
// For a splash page, minimal metadata is fine.
// export const metadata: Metadata = {
//   title: 'Welcome to SharePlate!',
//   description: 'Experience the heart of SharePlate.',
// };

export default function WelcomePage() {
  const [animate, setAnimate] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setAnimate(true), 100); // Short delay to ensure mount

    // Attempt to play audio
    if (audioRef.current) {
      // Ensure the audio element has a valid src
      if (audioRef.current.src && audioRef.current.src !== window.location.href) { // Check if src is not just the base URL
        audioRef.current.play().catch(error => {
          console.warn("Audio playback failed:", error, "User interaction might be required, or the audio file might be missing/incorrectly pathed.");
        });
      } else {
        console.warn("Audio source is not set or invalid. Skipping playback.");
      }
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center p-4 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      {/* 
        Audio element for the coin sound. 
        1. Create a 'sounds' directory in your 'public' folder.
        2. Place your 'coin-drop.mp3' (or similar) file there.
        3. The 'src' attribute below should then correctly point to '/sounds/coin-drop.mp3'.
        If you don't have a sound file, this will not play.
      */}
      <audio ref={audioRef} src="/sounds/coin-drop.mp3" preload="auto" />

      <div className="space-y-10">
        <div
          className={`transform transition-all duration-[1500ms] ease-out ${
            animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
          }`}
        >
          <HandHeart
            className={`mx-auto h-20 w-20 sm:h-24 sm:w-24 text-primary transition-all delay-[100ms] duration-[1500ms] ease-out ${
              animate ? 'opacity-100 rotate-0 drop-shadow-lg' : 'opacity-0 -rotate-12'
            }`}
          />
          <h1
            className={`mt-4 text-4xl sm:text-6xl font-headline font-bold text-primary transition-all delay-[300ms] duration-[1500ms] ease-out ${
              animate ? 'opacity-100 translate-y-0 drop-shadow-md' : 'opacity-0 translate-y-8'
            }`}
          >
            SharePlate
          </h1>
        </div>

        <div
          className={`relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-[16/10] mx-auto rounded-xl overflow-hidden shadow-2xl transform transition-all delay-[600ms] duration-[1800ms] ease-out ${
            animate ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-[-3deg]'
          }`}
        >
          <Image
            src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8Rm9vZHxlbnwwfHx8fDE3NTAzNTIyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Delicious food being shared"
            layout="fill"
            objectFit="cover"
            data-ai-hint="charity food sharing"
            priority 
          />
        </div>
        
        <div
         className={`transition-opacity delay-[1800ms] duration-[1000ms] ${animate ? 'opacity-100' : 'opacity-0'}`}
        >
          <Link href="/listings" passHref>
            <Button size="lg" className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-8 py-6 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
