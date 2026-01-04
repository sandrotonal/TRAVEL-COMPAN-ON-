import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { countryService } from '../services/api';
import { motion } from 'framer-motion';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [search, countries]);

  const fetchCountries = async () => {
    try {
      const data = await countryService.getAllCountries();
      // Sort alphabetically
      const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(sorted);
      setFilteredCountries(sorted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const CountryCard = ({ country }) => (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/country/${country.cca3}`)}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex items-center gap-4 cursor-pointer border border-gray-100 dark:border-slate-700"
    >
      <div className="w-16 h-12 rounded-md overflow-hidden shadow-sm flex-shrink-0 bg-gray-100">
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {country.name.common}
        </h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          <MapPin size={14} className="mr-1" />
          {country.region}
        </div>
      </div>
    </motion.div>
  );

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 flex items-center gap-4 border border-gray-100 dark:border-slate-700 animate-pulse">
      <div className="w-16 h-12 rounded-md bg-gray-200 dark:bg-slate-700" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Explore the World
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Discover new places and experiences.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm"
        />
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No countries found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
