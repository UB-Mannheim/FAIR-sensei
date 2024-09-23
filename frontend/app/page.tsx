'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import SearchArea from '@/components/SearchArea';
import Context from '@/context';

export default function Home() {
  const { dispatch } = useContext(Context);
  const router = useRouter();

// Handler to navigate to a search query
  const handleSuggestedSearch = (query: string) => {
    // Navigate immediately, dispatch can follow
    router.push(`/search?threadId=${uuidv4()}&q=${encodeURIComponent(query)}`);
    // Update the query state after navigation is triggered
    dispatch!({ type: 'UPDATE_CURRENT_QUERY', payload: query });
  };

  return (
    <main
      className="flex items-center justify-center min-h-screen px-4 sm:px-0"
      style={{ minHeight: 'calc(100vh - 60px)' }}
    >
      <div className="w-full sm:max-w-2xl flex flex-col items-center">
        <div>
          <pre className="font-display text-3xl font-regular mb-4 w-full whitespace-pre-wrap">
            FAIR-sensei: LLM-based RDM-search
          </pre>
        </div>

        {/* Search Input Area */}
        <SearchArea
          onSearch={(val) => {
            // Navigate immediately, then update the query state
            router.push(`/search?threadId=${uuidv4()}&q=${encodeURIComponent(val)}`);
            dispatch!({ type: 'UPDATE_CURRENT_QUERY', payload: val });
          }}
        />

        {/* Suggested Search Queries */}
        <div className="suggested-queries flex justify-center flex-wrap gap-4 mt-6">
          <button
            onClick={() => handleSuggestedSearch('Explain RDM')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full shadow-sm hover:bg-gray-200 hover:shadow-md transition duration-300 ease-in-out"
          >
            Explain RDM
          </button>
          <button
            onClick={() => handleSuggestedSearch('What is FAIR?')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full shadow-sm hover:bg-gray-200 hover:shadow-md transition duration-300 ease-in-out"
          >
            What is FAIR?
          </button>
          <button
            onClick={() => handleSuggestedSearch('Provide DMP templates')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full shadow-sm hover:bg-gray-200 hover:shadow-md transition duration-300 ease-in-out"
          >
            Provide DMP templates
          </button>
        </div>
      </div>
    </main>
  );
}
