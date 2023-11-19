import { useEffect } from 'react';
import { useColorTheme } from '../../../hooks/useColorTheme';

const InitColorTheme = () => {
  const { initColorTheme } = useColorTheme();

  useEffect(() => {
    initColorTheme();
  }, []);

  return null;
};

export default InitColorTheme;
