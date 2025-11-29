import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Marquee: React.FC = () => {
  const firstText = useRef<HTMLDivElement>(null);
  const secondText = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  
  let xPercent = 0;
  let direction = -1;

  useGSAP(() => {
    // Basic setup for infinite loop
    const animate = () => {
      if (xPercent <= -100) {
        xPercent = 0;
      }
      if (xPercent > 0) {
        xPercent = -100;
      }
      
      gsap.set(firstText.current, { xPercent: xPercent });
      gsap.set(secondText.current, { xPercent: xPercent });
      
      xPercent += 0.05 * direction; // Adjust speed here
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="relative flex overflow-hidden py-24 bg-white text-black">
      <div ref={slider} className="relative whitespace-nowrap flex">
        <div ref={firstText} className="flex gap-10 px-5">
           <MarqueeText />
           <MarqueeText />
           <MarqueeText />
        </div>
        <div ref={secondText} className="flex gap-10 px-5 absolute top-0 left-full">
           <MarqueeText />
           <MarqueeText />
           <MarqueeText />
        </div>
      </div>
    </div>
  );
};

const MarqueeText = () => (
    <h2 className="text-[8vw] font-display font-bold uppercase tracking-tight leading-none flex items-center gap-10">
        <span>Strategy</span>
        <span className="w-4 h-4 rounded-full bg-black block mt-2"></span>
        <span>Design</span>
        <span className="w-4 h-4 rounded-full bg-black block mt-2"></span>
        <span>Development</span>
        <span className="w-4 h-4 rounded-full bg-black block mt-2"></span>
    </h2>
);

export default Marquee;