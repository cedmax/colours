import tinycolor from "tinycolor2";

const uniq = arr => [...new Set(arr)];

export default hex => {
  const color = tinycolor(hex);
  const complements = uniq(
    color.splitcomplement().map(an => an.toHexString().toUpperCase())
  );
  const triads = uniq(color.triad().map(an => an.toHexString().toUpperCase()));
  return {
    complements,
    triads,
  };
};
