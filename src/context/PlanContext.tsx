import React, { createContext, useState, ReactNode, useContext } from 'react';

interface PlanPropsContext {
  tourPlan: string;
  setTourPlan: React.Dispatch<React.SetStateAction<string>>;
}

const PlanContext = createContext<PlanPropsContext | undefined>(undefined);

export const GetPlanProps = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

interface PlanProviderProps {
  children: ReactNode;
}

export const PlanProvider: React.FC<PlanProviderProps> = ({ children }) => {
  const [tourPlan, setTourPlan] = useState<string>('');

  return (
    <PlanContext.Provider value={{ tourPlan, setTourPlan }}>
      {children}
    </PlanContext.Provider>
  );
};
