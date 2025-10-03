import React from 'react';
import { Icon } from '@iconify/react';
import { Switch, Tooltip } from '@heroui/react';
import { useTheme } from "@heroui/use-theme";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  
  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };
  
  return (
    <Tooltip 
      content={`Switch to ${isDark ? "light" : "dark"} mode`}
      placement="top"
    >
      <div className="flex items-center gap-2 bg-content1 p-2 rounded-full shadow-md">
        <Icon 
          icon="lucide:sun" 
          className={`text-xl ${!isDark ? "text-warning" : "text-default-500"}`} 
          aria-hidden="true"
        />
        <Switch 
          isSelected={isDark}
          onValueChange={handleToggle}
          size="lg" // Larger size for better accessibility
          color="primary"
          className="mx-1"
          aria-label="Toggle dark mode"
        />
        <Icon 
          icon="lucide:moon" 
          className={`text-xl ${isDark ? "text-primary" : "text-default-500"}`} 
          aria-hidden="true"
        />
      </div>
    </Tooltip>
  );
};
