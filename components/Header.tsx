import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useGSAP(() => {
    const menu = menuRef.current;
    if (!menu) return;

    // Create timeline once and store it in ref
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(menu, {
      y: '0%',
      duration: 1,
      ease: 'power4.inOut',
    })
    .from(linkRefs.current, {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5');

  }, { scope: menuRef }); // Dependencies removed to prevent recreation

  // Control playback based on isOpen state
  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Projects", href: "#works" },
    { name: "Services", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-40 mix-blend-difference text-white">
        <div className="text-2xl font-bold font-display tracking-tighter">
          BILLO
        </div>
        <button 
          onClick={toggleMenu} 
          className="flex items-center gap-2 uppercase text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
        >
          <span className="hidden md:block">{isOpen ? 'Close' : 'Menu'}</span>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Overlay Menu */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 bg-[#0a0a0a] z-30 transform translate-y-[-100%] flex flex-col justify-center items-center"
      >
        <nav className="flex flex-col items-center gap-4">
          {navLinks.map((link, index) => (
            <div key={link.name} className="overflow-hidden">
              <a
                href={link.href}
                ref={(el) => { linkRefs.current[index] = el; }}
                onClick={() => setIsOpen(false)}
                className="block text-6xl md:text-8xl font-display font-bold text-transparent text-stroke-2 hover:text-white transition-colors duration-500 uppercase tracking-tight"
                style={{ WebkitTextStroke: '1px white' }}
              >
                {link.name}
              </a>
            </div>
          ))}
        </nav>
        
        <div className="absolute bottom-10 flex gap-6 text-sm text-gray-400 uppercase tracking-widest">
           <span>Instagram</span>
           <span>Twitter</span>
           <span>LinkedIn</span>
        </div>
      </div>
    </>
  );
};

export default Header;