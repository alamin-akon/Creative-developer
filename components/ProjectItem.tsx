
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el || !imageRef.current) return;

    // Image Scale Reveal (Parallax zoom out effect)
    gsap.fromTo(imageRef.current, 
      { scale: 1.3 },
      { 
        scale: 1, 
        ease: "none",
        scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
      }
    );

    // Fade and Slide up interaction on scroll
    gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="group flex flex-col w-full cursor-pointer"
    >
      {/* Image Container */}
      <div 
        className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-sm mb-6"
        data-cursor="view"
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
        <img 
          ref={imageRef}
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover will-change-transform"
        />
        
        {/* Floating View Button (Only visible on hover/focus inside) */}
        <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
             <ArrowUpRight className="text-black w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start space-y-3">
        <div className="flex flex-wrap gap-2 mb-1">
            {project.tags.map((tag, i) => (
                <span key={i} className="text-[10px] md:text-xs font-sans uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full text-gray-300">
                    {tag}
                </span>
            ))}
        </div>
        
        <div className="w-full flex justify-between items-baseline border-b border-white/10 pb-6 group-hover:border-white/40 transition-colors duration-500">
            <h3 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase text-white group-hover:pl-2 transition-all duration-500">
                {project.title}
            </h3>
            <span className="font-sans text-sm text-gray-500">{project.year}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
