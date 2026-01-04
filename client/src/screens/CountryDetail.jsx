import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Building, CloudSun, DollarSign, Wallet } from 'lucide-react';
import { countryService, weatherService, currencyService } from '../services/api';

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currencyRate, setCurrencyRate] = useState(null);
  const [conversionAmount, setConversionAmount] = useState('');
  const [convertedValue, setConvertedValue] = useState(null);

  useEffect(() => {
    fetchData();
  }, [code]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const countryData = await countryService.getCountryByCode(code);
      setCountry(countryData);

      // Fetch Weather if capital exists
      if (countryData.capitalInfo?.latlng) {
        const [lat, lng] = countryData.capitalInfo.latlng;
        const weatherData = await weatherService.getWeather(lat, lng);
        setWeather(weatherData);
      }

      // Fetch Currency Rate if exists
      if (countryData.currencies) {
        const currencyCode = Object.keys(countryData.currencies)[0];
        if (currencyCode && currencyCode !== 'USD') {
            try {
                const rateData = await currencyService.getRates('USD');
                if (rateData && rateData.rates[currencyCode]) {
                    setCurrencyRate({ code: currencyCode, rate: rateData.rates[currencyCode] });
                }
            } catch (err) {
                console.log("Currency not supported by Frankfurter");
            }
        } else if (currencyCode === 'USD') {
             setCurrencyRate({ code: 'USD', rate: 1 });
        }
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = () => {
    if (!currencyRate || !conversionAmount) return;
    const val = parseFloat(conversionAmount) * currencyRate.rate;
    setConvertedValue(val.toFixed(2));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!country) return <div className="text-center py-10">Country not found</div>;

  const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : null;
  const currencyName = currencyCode ? country.currencies[currencyCode].name : 'N/A';

  return (
    <div className="space-y-6 pb-6">
      {/* Header Image */}
      <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg mb-6 group">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h1 className="text-3xl font-bold text-white">{country.name.common}</h1>
          <p className="text-gray-200 text-sm flex items-center">
            <MapPin size={14} className="mr-1" /> {country.region}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
            <Building size={20} />
            <span className="text-sm font-medium">Capital</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {country.capital?.[0] || 'N/A'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
            <Users size={20} />
            <span className="text-sm font-medium">Population</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {country.population.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Weather Card */}
      {weather && weather.current_weather && (
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Current Weather</p>
              <h3 className="text-3xl font-bold">{weather.current_weather.temperature}°C</h3>
            </div>
            <CloudSun size={48} className="text-blue-200" />
          </div>
          <p className="text-blue-100 text-sm mt-2 flex items-center gap-1">
             <MapPin size={12}/> {country.capital?.[0]}
          </p>
        </div>
      )}

      {/* Currency Converter Section */}
      {currencyCode && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
            <div className="flex items-center gap-2 text-amber-500 mb-4">
                <Wallet size={20} />
                <h3 className="font-bold text-gray-900 dark:text-white">Currency Converter</h3>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {currencyName} ({currencyCode})
            </p>

            <div className="flex items-end gap-3">
                <div className="flex-1">
                    <label className="text-xs font-medium text-gray-500 mb-1 block">USD Amount</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="number"
                            value={conversionAmount}
                            onChange={(e) => {
                                setConversionAmount(e.target.value);
                                if (!e.target.value) setConvertedValue(null);
                            }}
                            className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            placeholder="100"
                        />
                    </div>
                </div>
                <button
                    onClick={handleConvert}
                    disabled={!currencyRate}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                    Convert
                </button>
            </div>

            {convertedValue && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                    <p className="text-sm text-amber-800 dark:text-amber-200 text-center font-medium">
                        {conversionAmount} USD ≈ {convertedValue} {currencyCode}
                    </p>
                </div>
            )}

            {!currencyRate && currencyCode !== 'USD' && (
                 <p className="text-xs text-red-400 mt-2">Conversion rate unavailable for {currencyCode}</p>
            )}
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
