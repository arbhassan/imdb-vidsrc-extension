import React, { useState, useEffect } from 'react';
import { Film, ExternalLink } from 'lucide-react';

const MovieLinkGenerator: React.FC = () => {
  const [imdbId, setImdbId] = useState<string | null>(null);
  const [vidsrcLink, setVidsrcLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchImdbId = async () => {
      if (import.meta.env.PROD) {
        // Production mode: use Chrome API
        if ('chrome' in window) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const url = tabs[0].url;
            if (url && url.includes('imdb.com/title/')) {
              const match = url.match(/\/title\/(tt\d+)/);
              if (match && match[1]) {
                setImdbId(match[1]);
                setVidsrcLink(`https://vidsrc.to/embed/movie/${match[1]}`);
              }
            }
          });
        }
      } else {
        // Development mode: use dummy data
        const dummyId = 'tt0137523';
        setImdbId(dummyId);
        setVidsrcLink(`https://vidsrc.to/embed/movie/${dummyId}`);
      }
    };

    fetchImdbId();
  }, []);

  const copyToClipboard = () => {
    if (vidsrcLink) {
      navigator.clipboard.writeText(vidsrcLink);
    }
  };

  return (
    <div className="w-64 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Film className="mr-2" /> Movie Link
      </h1>
      {imdbId ? (
        <div>
          <p className="mb-2">IMDb ID: {imdbId}</p>
          <div className="bg-white/20 p-2 rounded-md mb-4">
            <p className="text-sm break-all">{vidsrcLink}</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-md hover:bg-purple-100 transition-colors flex items-center justify-center"
          >
            <ExternalLink className="mr-2" size={16} />
            Copy Link
          </button>
        </div>
      ) : (
        <p>Please navigate to an IMDb movie page and try again.</p>
      )}
    </div>
  );
};

export default MovieLinkGenerator;