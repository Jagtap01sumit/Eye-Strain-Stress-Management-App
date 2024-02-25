// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isBlinkReminderOn, setBlinkReminder] = useState(false);

  const toggleBlinkReminder = () => {
    setBlinkReminder((prevState) => !prevState);
  };

  const stopBlinkReminder = () => {
    setBlinkReminder(false);
  };

  return (
    <AppContext.Provider value={{ isBlinkReminderOn, toggleBlinkReminder, stopBlinkReminder }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
