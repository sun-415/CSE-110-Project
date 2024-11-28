import plant1 from "../assets/garden/plants/plant1.png";
import plant2 from "../assets/garden/plants/plant2.png";
import plant3 from "../assets/garden/plants/plant3.png";
import plant4 from "../assets/garden/plants/plant4.png";
import plant5 from "../assets/garden/plants/plant5.png";

export interface Level {
  num: number;
  requiredScore: number;
  plant: string;
}

export const levels: Level[] = [
  {
    num: 1,
    requiredScore: 100,
    plant: plant1,
  },
  {
    num: 2,
    requiredScore: 200,
    plant: plant2,
  },
  {
    num: 3,
    requiredScore: 300,
    plant: plant3,
  },
  {
    num: 4,
    requiredScore: 400,
    plant: plant4,
  },
  {
    num: 5,
    requiredScore: 500,
    plant: plant5,
  },
];
