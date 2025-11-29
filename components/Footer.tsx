import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0a0a0a] text-white py-20 px-6 md:px-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div>
           <h2 className="text-[12vw] leading-[0.8] font-display font-bold uppercase tracking-tighter mb-4">
             Let's Talk
           </h2>
           <a href="mailto:hello@billo.com" className="text-2xl md:text-3xl border-b border-white pb-1 inline-block hover:opacity-70 transition-opacity">
             hello@billo.com
           </a>
        </div>
        
        <div className="flex flex-col gap-2 text-gray-400 text-sm uppercase tracking-widest text-right w-full md:w-auto">
           <span>New York, NY</span>
           <span>© 2024 Billo Design</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;