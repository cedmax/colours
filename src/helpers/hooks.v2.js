import { useState, useEffect } from "react";
import {
  objectToHistory,
  subscribeToHistory,
  unsubscribeFromHistory,
} from "./utils";

export const useQueryString = (values, setters, defaults) => {
  const [historyListener, setHistoryListener] = useState(null);
  useEffect(() => {
    if (!historyListener) {
      const listener = subscribeToHistory(data => {
        Object.keys(values).forEach(k => {
          const value = data[k];
          setters[k](value || defaults[k]);
        });
      });
      setHistoryListener(() => listener);
    } else {
      objectToHistory(values);
    }
    return () => unsubscribeFromHistory(historyListener);
  }, Object.values(values));
};
