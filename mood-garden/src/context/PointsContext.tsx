import { createContext, useState} from "react";

//Define the shape of the context
interface PointsContextType{
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: PointsContextType = {
  totalScore: 0,
  setTotalScore: () => {},
};

//Create the context
export const PointsContext = createContext<PointsContextType>(initialState);


//Provide the context
export const PointsProvider = (props: any) => {
  const [totalScore, setTotalScore] = useState<number>(initialState.totalScore);

  return(
    <PointsContext.Provider 
      value={{
        totalScore: totalScore,
        setTotalScore: setTotalScore,
      }}>
      {props.children}
    </PointsContext.Provider>

  );
}
