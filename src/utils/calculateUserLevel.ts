const userLevel = (userPoint: number) => {
  if (userPoint < 100) {
    return { level: 1, minPoint: 0, maxPoint: 100 };
  } else if (userPoint >= 100 && userPoint < 200) {
    return { level: 2, minPoint: 100, maxPoint: 200 };
  } else if (userPoint >= 200 && userPoint < 350) {
    return { level: 3, minPoint: 200, maxPoint: 350 };
  } else if (userPoint >= 350 && userPoint < 500) {
    return { level: 4, minPoint: 350, maxPoint: 500 };
  } else if (userPoint >= 500) {
    return { level: 5, minPoint: 500, maxPoint: 1000 };
  }
};

export default userLevel;
