import {useEffect} from 'react';
import {DarkModeButtonProps} from '../types';
import {IconButton} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function DarkModeButton({isDark, setIsDark}: DarkModeButtonProps) {
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <div className="DarkModeButton">
      <IconButton
        size="small"
        aria-label="toggle dark mode"
        style={{color: 'var(--bg-color)', marginLeft: 'auto'}}
        onClick={toggleDarkMode}
      >
        {isDark ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </div>
  );
}

export default DarkModeButton;
