
import React from 'react';
import ProjectItem from './ProjectItem';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Aesop Skin",
    tags: ["eCommerce", "Art Direction"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Basic / Dept",
    tags: ["Development", "Interaction"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Oculus VR",
    tags: ["Immersive Web", "WebGL"],
    year: "2022",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2340&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Monograph",
    tags: ["Editorial Design", "Typography"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2540&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Rimowa",
    tags: ["Campaign", "Motion"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1560769629-975e13f085e6?q=80&w=2400&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Spotify Wrapped",
    tags: ["Data Viz", "Frontend"],
    year: "2022",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop"
  }
];

const WorkSection: React.FC = () => {
  // Split projects into two columns for the staggered effect
  const leftColumnProjects = projects.filter((_, i) => i % 2 === 0);
  const rightColumnProjects = projects.filter((_, i) => i % 2 !== 0);

  return (
    <section id="works" className="relative px-6 md:px-10 py-20 md:py-40 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 md:mb-40 flex flex-col items-start">
          <span className="text-sm font-sans uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-700 pb-2">Selected Works (06)</span>
          <h2 className="text-[12vw] md:text-[8vw] font-display font-bold uppercase leading-[0.85] text-white">
            Featured<br/>
            <span className="ml-[10vw] text-transparent" style={{ WebkitTextStroke: '1px white' }}>Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {/* Left Column */}
          <div className="flex flex-col gap-20 md:gap-40">
            {leftColumnProjects.map((project, index) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>

          {/* Right Column - Staggered with padding top */}
          <div className="flex flex-col gap-20 md:gap-40 md:pt-40">
            {rightColumnProjects.map((project, index) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
