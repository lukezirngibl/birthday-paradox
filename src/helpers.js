
export const factorilize = (num, limit) => {
  if (num === 0 || num === limit) {
    return 1;
  } else {
    return num * factorilize(num - 1, limit);
  }
}

export const computeChance = (n, p) => {
  const different = Math.pow((1 / p), n) * factorilize(p, p - n);
  const match = 1 - different;
  return match * 100;
}

export const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
