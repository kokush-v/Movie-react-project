import { IGenre, MovieRes } from '../models';
import { GET_GENRES, OPTIONS_GET, GET_MOVIES, GET_RECOMEND } from './api.constants';

export async function fetchGenres(): Promise<IGenre[]> {
    const response = await fetch(GET_GENRES, OPTIONS_GET);
    const genres: IGenre[] = (await response.json())?.genres;
    
    return genres;
 }

export async function fetchMovies(setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<MovieRes> {
    setLoading(true);
    const response = await fetch(GET_MOVIES, OPTIONS_GET);
    const movieData: MovieRes = await response.json();

    return movieData;
 }

 export  async function fetchMoreMovies(page:number, setLoading: React.Dispatch<React.SetStateAction<boolean>>, genres:number[]): Promise<MovieRes> {
   setLoading(true);
   const response = await fetch(
       GET_MOVIES.replace("&page=1&", `&page=${page}&`)+"&with_genres="+genres?.join("%2C"),
       OPTIONS_GET
    );
    const movieData: MovieRes = await response.json();

    return movieData;
 } 

 export async function fetchMoviesWithFilters(genres:number[], setLoading: React.Dispatch<React.SetStateAction<boolean>>):Promise<MovieRes> {
   setLoading(true);
   const response = await fetch(GET_MOVIES+"&with_genres="+genres.join("%2C"), OPTIONS_GET);
   const movieData: MovieRes = await response.json();

   return movieData;
 }

 export async function fetchMovieRecomendation(): Promise<MovieRes> {
   const response = await fetch(GET_RECOMEND, OPTIONS_GET);
   const movieData: MovieRes = await response.json();

   return movieData
 }