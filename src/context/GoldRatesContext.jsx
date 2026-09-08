import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLiveRates, FALLBACK_RATES } from '../services/ratesService';

const GoldRatesContext = createContext({
  rates: FALLBACK_RATES,
  isLoading: false,
  lastUpdated: '10:00 AM Today',
  isLive: false,
  refreshRates: () => {}
});

export function GoldRatesProvider({ children }) {
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [isLoading, setIsLoading] = useState(false);

  const loadRates = async () => {
    setIsLoading(true);
    const updatedRates = await fetchLiveRates();
    setRates(updatedRates);
    setIsLoading(false);
  };

  useEffect(() => {
    loadRates();
    // Poll for updated rates every 5 minutes (300000ms)
    const interval = setInterval(loadRates, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GoldRatesContext.Provider value={{
      rates,
      isLoading,
      lastUpdated: rates.lastUpdated,
      isLive: rates.isLive,
      refreshRates: loadRates
    }}>
      {children}
    </GoldRatesContext.Provider>
  );
}

export function useGoldRates() {
  return useContext(GoldRatesContext);
}
