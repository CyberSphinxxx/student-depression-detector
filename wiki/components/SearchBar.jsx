import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

const searchIndex = [
  { title: 'Project Overview', href: '/', section: 'Home' },
  { title: 'Dataset Info', href: '/dataset', section: 'Dataset' },
  { title: 'EDA Results', href: '/eda', section: 'EDA' },
  { title: 'Model Comparison', href: '/models', section: 'Models' },
  { title: 'SMOTE Explanation', href: '/smote', section: 'SMOTE' },
  { title: 'Activity Summaries', href: '/activities', section: 'Activities' },
  { title: 'Code Snippets', href: '/snippets', section: 'Snippets' },
  { title: 'About', href: '/about', section: 'About' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filteredResults = searchIndex.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.section.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search sections..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 border-transparent rounded-md focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
        />
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-50 overflow-hidden">
          {filteredResults.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredResults.map((item, i) => (
                <li key={i}>
                  <Link 
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                  >
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.section}</div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
