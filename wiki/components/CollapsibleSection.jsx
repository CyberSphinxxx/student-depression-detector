import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border-primary rounded-lg my-6 bg-card overflow-hidden shadow-sm">
      <button
        type="button"
        className="w-full px-4 py-4 flex items-center justify-between bg-sidebar hover:bg-foreground/5 transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-foreground">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-foreground/40" />
        ) : (
          <ChevronRight className="w-5 h-5 text-foreground/40" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 py-5 border-t border-border-primary text-foreground/80">
          {children}
        </div>
      )}
    </div>
  );
}
