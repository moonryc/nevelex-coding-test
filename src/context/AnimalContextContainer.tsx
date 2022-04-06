import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAnimal } from '../types';


interface IAnimalsContext {
  allAnimals: IAnimal[] | null,
  setAllAnimals: (value: IAnimal[] | null) => void,
  nameFilter: string,
  setNameFilter: (value: string) => void
  selectedAnimal: IAnimal | null,
  setSelectedAnimal: (value: IAnimal | null) => void
}

export const AnimalsContext = createContext<IAnimalsContext>({
  allAnimals: null,
  setAllAnimals: (value: IAnimal[] | null) => {
  },
  nameFilter: '',
  setNameFilter: (value: string) => {
  },
  selectedAnimal: null,
  setSelectedAnimal: (value: IAnimal | null) => {
  }
});

export const useAnimalsContext = () => useContext(AnimalsContext);

interface props {
  [x: string]: any;
}

const AnimalContextContainer: React.FC<props> = ({ children }) => {
  const [allAnimals, setAllAnimals] = useState<IAnimal[] | null>(null);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [selectedAnimal, setSelectedAnimal] = useState<IAnimal | null>(null);


  return (
    <AnimalsContext.Provider value={{
      allAnimals, setAllAnimals,
      nameFilter, setNameFilter,
      setSelectedAnimal, selectedAnimal
    }}>
      {children}
    </AnimalsContext.Provider>
  );
};

export default AnimalContextContainer;
