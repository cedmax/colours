import { useState, useEffect } from "react";
import { objectToHistory, listenToHistory } from "./utils";

export const useQueryString = (values, setters, defaults) => {
  const [urlRestored, setUrlRestored] = useState(false);

  useEffect(() => {
    if (!urlRestored) {
      listenToHistory(data => {
        Object.keys(values).forEach(k => {
          const value = data[k];
          setters[k](value || defaults[k]);
        });
      });
      setUrlRestored(true);
    } else {
      objectToHistory(values);
    }
  }, Object.values(values));
};
