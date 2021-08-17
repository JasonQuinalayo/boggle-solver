const getRandomIntInclusive = (min, max) => {
  const lmin = Math.ceil(min);
  const lmax = Math.floor(max);
  return Math.floor(Math.random() * (lmax - lmin + 1) + lmin);
};

export default getRandomIntInclusive;
