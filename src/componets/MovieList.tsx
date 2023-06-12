import { useContext, useEffect, useState } from "react";
import { IGenre, IMovieItem, MovieRes } from "../models";
import List from "./List";
import MovieItem from "./MovieItem";
import {
   fetchMovies,
   fetchMoreMovies,
   fetchMoviesWithFilters,
} from "../api/api.functions";
import { GenreContextType, GenreContext } from "../context/context";

interface MoiveListProps {
   genreProps: IGenre[];
}

export default function MoiveList({ genreProps }: MoiveListProps) {
   const [movieItems, setMovieItems] = useState<IMovieItem[]>([]);
   const [page, setPage] = useState<number>(0);
   const [loading, setLoading] = useState<boolean>(true);
   const context: GenreContextType | any = useContext(GenreContext);
   const { selectedGenres }: GenreContextType = context;

   useEffect(() => {
      fetchMoviesWithFilters(selectedGenres, setLoading)
         .then((movie: MovieRes) => {
            setMovieItems(movie.results);
         })
         .then(() => setLoading(false));
   }, [selectedGenres]);

   useEffect(() => {
      fetchMovies(setLoading)
         .then((movie: MovieRes) => {
            setMovieItems(movie.results);
            if (movie.page < movie.total_pages) setPage(movie.page + 1);
            else setPage(-1);
         })
         .then(() => setLoading(false));
   }, []);

   return (
      <div className="p-1 flex flex-col items-center">
         <List
            items={movieItems}
            renderItem={({
               title,
               backdrop_path,
               genre_ids,
               vote_average,
               id,
            }: IMovieItem) => (
               <MovieItem
                  title={title}
                  imageUrl={backdrop_path}
                  genreId={genre_ids}
                  genresArr={genreProps}
                  avarageVote={vote_average}
                  key={id}
               />
            )}
         />
         {loading ? (
            <svg
               version="1.1"
               id="L5"
               xmlns="http://www.w3.org/2000/svg"
               x="0px"
               y="0px"
               viewBox="0 0 100 100"
               enable-background="new 0 0 0 0"
               className="w-20 h-20"
            >
               <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                  <animateTransform
                     attributeName="transform"
                     dur="1s"
                     type="translate"
                     values="0 15 ; 0 -15; 0 15"
                     repeatCount="indefinite"
                     begin="0.1"
                  />
               </circle>
               <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
                  <animateTransform
                     attributeName="transform"
                     dur="1s"
                     type="translate"
                     values="0 10 ; 0 -10; 0 10"
                     repeatCount="indefinite"
                     begin="0.2"
                  />
               </circle>
               <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
                  <animateTransform
                     attributeName="transform"
                     dur="1s"
                     type="translate"
                     values="0 5 ; 0 -5; 0 5"
                     repeatCount="indefinite"
                     begin="0.3"
                  />
               </circle>
            </svg>
         ) : (
            page !== -1 && (
               <input
                  type="button"
                  className="w-1/3 cursor-pointer mt-10 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  value="Показати більше..."
                  onClick={(e) => {
                     setLoading(true);
                     fetchMoreMovies(page, setLoading, selectedGenres)
                        .then((movie: MovieRes) => {
                           setMovieItems([...movieItems, ...movie.results]);
                           if (movie.page < movie.total_pages)
                              setPage(movie.page + 1);
                           else setPage(-1);
                        })
                        .then(() => setLoading(false));
                  }}
               />
            )
         )}
      </div>
   );
}
