import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subTextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Text Reveal Animation
    tl.from(textRefs.current, {
      y: '100%',
      skewY: 7,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power4.out',
    })
    .from(subTextRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power3.out',
    }, '-=1');

    // Parallax Effect on Scroll
    gsap.to(containerRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

  }, { scope: containerRef });

  const titleWords = ["CREATIVE", "DEVELOPER", "&", "DESIGNER"];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        <h1 className="flex flex-col text-[13vw] md:text-[11vw] leading-[0.85] font-display font-bold uppercase tracking-tighter">
          {titleWords.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <span 
                ref={(el) => { textRefs.current[i] = el; }}
                className="block origin-bottom-left"
              >
                {word}
              </span>
            </div>
          ))}
        </h1>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-6">
           <p ref={subTextRef} className="max-w-md text-lg md:text-xl text-gray-400 font-light leading-relaxed">
             Crafting immersive digital experiences with a focus on motion, typography, and interactivity. Based in New York.
           </p>
           <div className="mt-6 md:mt-0 animate-bounce">
             (Scroll Down)
           </div>
        </div>
      </div>
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-white/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;