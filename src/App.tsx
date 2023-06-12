import { useEffect, useState } from "react";
import MovieHeader from "./componets/MovieHeader";
import { IGenre } from "./models";
import { fetchGenres, fetchMoviesWithFilters } from "./api/api.functions";
import MoiveList from "./componets/MovieList";
import { GenreContext, GenreContextType } from "./context/context";

function App() {
   const [genre, setGenre] = useState<IGenre[]>([]);
   const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

   const updateSelectedGenres = (newValue: number[]) => {
      setSelectedGenres(newValue);
   };

   const myContext: GenreContextType = {
      selectedGenres,
      updateSelectedGenres,
   };

   useEffect(() => {
      fetchGenres().then((g) => {
         g.forEach((elem: IGenre) => {
            elem.color = getRandomColor();
         });

         setGenre(g);
      });
   }, []);

   function getRandomColor(): string {
      const letters = "89ABCDEF";
      let color = "#";

      for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * letters.length)];
      }

      return color;
   }

   return (
      <GenreContext.Provider value={myContext}>
         <div className="App flex flex-col items-center ">
            <div
               className="w-4/5 min-h-full bg-slate-900 flex flex-col items-center "
               style={{
                  boxShadow: "0px 0px 60px 60px rgba(15, 23, 42, 1)",
               }}
            >
               <MovieHeader genreProps={genre} />
               <MoiveList genreProps={genre} />
            </div>
         </div>{" "}
      </GenreContext.Provider>
   );
}

export default App;
