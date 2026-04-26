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
  Info 
} from 'lucide-react';

const navigation = [
  { name: 'Project Overview', href: '/', icon: Home },
  { name: 'Dataset Info', href: '/dataset', icon: Database },
  { name: 'EDA Results', href: '/eda', icon: BarChart2 },
  { name: 'Model Comparison', href: '/models', icon: Cpu },
  { name: 'SMOTE Explanation', href: '/smote', icon: GitMerge },
  { name: 'Activity Summaries', href: '/activities', icon: Activity },
  { name: 'Code Snippets', href: '/snippets', icon: Code },
  { name: 'About', href: '/about', icon: Info },
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
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-lg font-bold text-gray-800">ML Wiki</span>
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
                      ? 'bg-gray-200 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <a 
              href="https://github.com/CyberSphinxxx/student-depression-detector" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
