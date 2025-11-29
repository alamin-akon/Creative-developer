import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    const cursor = cursorRef.current;
    const text = cursorTextRef.current;
    if (!cursor || !text) return;

    // Center the cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      // Smooth follow logic
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over a project or clickable element
      if (target.closest('[data-cursor="view"]')) {
        setIsHovering(true);
        gsap.to(cursor, { scale: 3.5, backgroundColor: '#ffffff', mixBlendMode: 'difference', duration: 0.3 });
        gsap.to(text, { opacity: 1, scale: 0.3, duration: 0.3 }); // Scale down text to fit inverted circle
      } else if (target.closest('a') || target.closest('button')) {
         setIsHovering(true);
         gsap.to(cursor, { scale: 1.5, backgroundColor: 'transparent', border: '1px solid white', duration: 0.3 });
         gsap.to(text, { opacity: 0, duration: 0.3 });
      } else {
        setIsHovering(false);
        gsap.to(cursor, { scale: 1, backgroundColor: '#ffffff', border: 'none', mixBlendMode: 'normal', duration: 0.3 });
        gsap.to(text, { opacity: 0, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
    >
      <span ref={cursorTextRef} className="opacity-0 text-[3px] font-bold text-black uppercase tracking-widest">
        View
      </span>
    </div>
  );
};

export default CustomCursor;