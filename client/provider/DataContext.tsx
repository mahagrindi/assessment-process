// DataContext.tsx
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

 

interface DataContextProps {
  data: Challenge[];
  setData: Dispatch<SetStateAction<Challenge[]>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<Challenge[]>([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
