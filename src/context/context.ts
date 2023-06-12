import { createContext } from 'react';

export interface GenreContextType{
    selectedGenres: number[]
    updateSelectedGenres: (newValue: number[]) => void 
}

export const GenreContext = createContext<GenreContextType | undefined>(undefined)