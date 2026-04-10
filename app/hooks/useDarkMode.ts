import { useState } from 'react';

// Custom hook de exemplo
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggle = () => setIsDarkMode(!isDarkMode);

  return { isDarkMode, toggle };
}
