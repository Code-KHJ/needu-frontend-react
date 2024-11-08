import level_1 from "@/assets/images/level_1.png";
import level_2 from "@/assets/images/level_2.png";
import level_3 from "@/assets/images/level_3.png";
import level_4 from "@/assets/images/level_4.png";
import level_5 from "@/assets/images/level_5.png";

const userLevel = (userPoint: number) => {
  if (userPoint < 100) {
    return { level: 1, minPoint: 0, maxPoint: 100, icon: level_1 };
  } else if (userPoint >= 100 && userPoint < 200) {
    return { level: 2, minPoint: 100, maxPoint: 200, icon: level_2 };
  } else if (userPoint >= 200 && userPoint < 350) {
    return { level: 3, minPoint: 200, maxPoint: 350, icon: level_3 };
  } else if (userPoint >= 350 && userPoint < 500) {
    return { level: 4, minPoint: 350, maxPoint: 500, icon: level_4 };
  } else if (userPoint >= 500) {
    return { level: 5, minPoint: 500, maxPoint: 1000, icon: level_5 };
  }
};

export default userLevel;
