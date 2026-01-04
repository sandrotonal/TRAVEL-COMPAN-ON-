import React, { useState, useEffect } from 'react';
import { currencyService } from '../services/api';
import { ArrowLeftRight, TrendingUp } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState(['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'TRY']);

  useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency]);

  const handleConvert = async () => {
    if (!amount) {
        setResult(null);
        return;
    }

    // Simple optimization to avoid API call if currencies are same
    if (fromCurrency === toCurrency) {
        setResult(amount);
        return;
    }

    setLoading(true);
    try {
      // Frankfurter free API handles conversions from base currencies.
      // Note: Frankfurter Base defaults to EUR usually, but supports 'from' param.
      const data = await currencyService.convert(amount, fromCurrency, toCurrency);
      if (data && data.rates && data.rates[toCurrency]) {
          setResult(data.rates[toCurrency]);
      } else {
        // Fallback or manual calculation if possible
        // Actually for public free version of Frankfurter, 'from' needs to be one of the supported currencies.
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
  }

  return (
    <div className="space-y-6">
       <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Currency Converter
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Real-time exchange rates.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                <TrendingUp size={24} />
            </div>
        </div>

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-3 px-4 text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
            </div>

            <div className="flex items-center gap-3">
                <div className="flex-1">
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
                     <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-3 px-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     >
                        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                </div>

                <button
                    onClick={swapCurrencies}
                    className="mt-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeftRight size={20} className="text-gray-500" />
                </button>

                <div className="flex-1">
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                     <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-3 px-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     >
                        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 text-center">
                {loading ? (
                     <div className="animate-pulse h-8 w-32 bg-gray-200 dark:bg-slate-700 rounded mx-auto"></div>
                ) : (
                    <>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {result ? result : '---'} <span className="text-lg font-medium text-gray-500">{toCurrency}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-2">1 {fromCurrency} = {(result / amount).toFixed(4)} {toCurrency}</p>
                    </>
                )}
            </div>
        </div>
      </div>

      <div className="text-center">
          <p className="text-xs text-gray-400">Rates provided by Frankfurter API</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
