const getLocale = () => {
  const navigator = window.navigator;

  if (navigator.languages) {
    return navigator.languages[0];
  }

  return navigator.language;
};

export default getLocale;
