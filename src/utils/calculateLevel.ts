export const calculateLevel = (experience: number) => {
  let i = 0;
  let xp = 0;
  while (true) {
    xp += 5 * Math.pow(i, 2) + 50 * i + 100;
    if (xp > experience) {
      return i;
    }
    i++;
  }
};

export const calculateExperience = (level: number) => {
  let xp = 0;
  for (let i = 0; i < level; i++) {
    xp += 5 * Math.pow(i, 2) + 50 * i + 100;
  }
  return xp;
};
