import { createContext, useState} from "react";

//Define the shape of the context
interface PointsContextType{
  totalScore: number,
  setTotalScore: React.Dispatch<React.SetStateAction<number>>,
  lastNotifiedLevel: number,
  setLastNotifiedLevel: React.Dispatch<React.SetStateAction<number>>,

}

const initialState: PointsContextType = {
  totalScore: 0,
  setTotalScore: () => {},
  lastNotifiedLevel: 0,
  setLastNotifiedLevel: () => {},
};

//Create the context
export const PointsContext = createContext<PointsContextType>(initialState);


//Provide the context
export const PointsProvider = (props: any) => {
  const [totalScore, setTotalScore] = useState<number>(initialState.totalScore);
  const [lastNotifiedLevel, setLastNotifiedLevel] = useState<number>(0);

  return(
    <PointsContext.Provider 
      value={{
        totalScore: totalScore,
        setTotalScore: setTotalScore,
        lastNotifiedLevel: lastNotifiedLevel,
        setLastNotifiedLevel: setLastNotifiedLevel,
      }}>
      {props.children}
    </PointsContext.Provider>

  );
}
