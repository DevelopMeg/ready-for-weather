export const convertSecToTime = (dt) => {
  return new Date(dt * 1000).toLocaleTimeString().slice(0, -3);
};

export const clearSearchDiacriticSpace = (search) => {
  const Diacritics = require("diacritic");
  return Diacritics.clean(search).split(" ").join("");
};
