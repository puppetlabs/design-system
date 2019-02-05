const getLocale = () => {
  const { navigator } = window;

  if (navigator.languages) {
    return navigator.languages[0];
  }

  return navigator.language;
};

export default getLocale;
