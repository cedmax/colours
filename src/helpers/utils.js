import tinycolor from "tinycolor2";
import qs from "query-string";

export const getMostReadable = hex =>
  tinycolor.mostReadable(hex, ["#ffffff", "#000000"]).toHexString();

export const getFilteredColors = (list, filter) =>
  list.filter(color => {
    return color.name.toLowerCase().includes(filter.toLowerCase());
  });

export const objectToHistory = obj => {
  const qsObj = Object.keys(obj)
    .filter(k => !!obj[k])
    .reduce((acc, k) => {
      acc[k] = obj[k];
      return acc;
    }, {});

  if (`?${qs.stringify(qsObj)}` !== window.location.search) {
    window.history.pushState({}, "", `?${qs.stringify(qsObj)}`);
  }
};

export const listenToHistory = callback => {
  const getQs = () => qs.parse(window.location.search);
  window.addEventListener("popstate", () => callback(getQs()));
  callback(getQs());
};

export const subscribeToHistory = callback => {
  const listener = () => callback(qs.parse(window.location.search));
  window.addEventListener("popstate", listener);
  listener();
  return listener;
};

export const unsubscribeFromHistory = listener => {
  window.removeEventListener("popstate", listener);
};
