'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const SearchAgent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const agents = [
    { symbol: 'Trading', name: 'RVX Trading' },
    { symbol: 'Contents', name: 'RVX Contents' },
    { symbol: 'Data', name: 'RVX Data' },
    { symbol: 'sns', name: 'RVX SNS' },
    { symbol: 'Research', name: 'RVX Research' },
  ];

  // Filter agents based on search input
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    agent.symbol.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  return (
    <div className="relative mb-6 w-full hidden">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Search an agent..."
          className="w-full bg-[#0A4729] backdrop-blur-lg border border-green-400/20 border-l-2 border-l-green-500/30 border-r-2 border-r-green-500/30 rounded-xl px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-none transition-colors"
        />
        <svg
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-green-950 border border-green-500/70 rounded-xl mt-1 z-50 max-h-48 overflow-y-auto shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <Link
                  key={agent.symbol}
                  href={`/?tab=SPAI&agent=${agent.symbol}`}
                  className="block px-4 py-3 text-white transition-colors border-b border-green-500/50 last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{agent.name}</span>
                    {/* <span className="text-gray-400 text-sm">{agent.symbol}</span> */}
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400 text-center">
                No agents found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invisible overlay to close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchAgent;