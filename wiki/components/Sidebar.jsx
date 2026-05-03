import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home, 
  Database, 
  BarChart2, 
  Cpu, 
  GitMerge, 
  Activity, 
  Code, 
  Info,
  HelpCircle,
  Brain
} from 'lucide-react';

const navigation = [
  { name: 'Project Overview', href: '/', icon: Home },
  { name: 'Dataset Info', href: '/dataset', icon: Database },
  { name: 'EDA Results', href: '/eda', icon: BarChart2 },
  { name: 'Model Comparison', href: '/models', icon: Cpu },
  { name: 'Class Imbalance', href: '/smote', icon: GitMerge },
  { name: 'Activity Summaries', href: '/activities', icon: Activity },
  { name: 'Code Snippets', href: '/snippets', icon: Code },
  { name: 'About', href: '/about', icon: Info },
  { name: 'FAQ', href: '/faq', icon: HelpCircle },
];

const demoNavigation = [
  { name: 'Try the Detector', href: '/detector', icon: Brain },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-sidebar border-r border-border-primary transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-border-primary">
            <span className="text-lg font-bold text-foreground">Student Depression Detector Wiki</span>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-accent/10 text-accent' 
                      : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-foreground/50'}`} />
                  {item.name}
                </Link>
              );
            })}

            {/* Live Demo separator */}
            <div className="pt-4 pb-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-foreground/30">Live Demo</p>
            </div>

            {demoNavigation.map((item) => {
              const isActive = router.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-foreground/50'}`} />
                  {item.name}
                  <span className="ml-auto text-[10px] font-bold bg-accent/15 text-accent px-1.5 py-0.5 rounded-full">LIVE</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-border-primary">
            <a 
              href="https://github.com/CyberSphinxxx/student-depression-detector" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-slate-800 dark:bg-slate-700 rounded-md hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-sm"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
