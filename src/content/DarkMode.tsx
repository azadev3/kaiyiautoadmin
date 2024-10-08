import React, { useEffect, useState } from "react";

const DarkMode: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode) {
      setIsDarkMode(storedMode === "true");
      document.body.classList.toggle("dark", storedMode === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    document.body.classList.toggle("dark", newMode);
  };

  return (
    <div className="darkmode-component">
      <div className="toggle-switch">
        <label className="switch-label">
          <input type="checkbox" className="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default DarkMode;
