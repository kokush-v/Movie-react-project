import { useEffect, useState } from "react";
import { GET_GENRES, OPTIONS_GET } from "../api/api.constants";
import { IGenre } from "../models";

interface MovieProps {
   title: string;
   imageUrl: string;
   genreId: number[];
   avarageVote: number;
}

export default function MovieItem({
   title,
   imageUrl,
   genreId,
   avarageVote,
}: MovieProps) {
   const [genre, setGenre] = useState<IGenre[]>([]);

   useEffect(() => {
      fetchGenres().then((g: IGenre[]) => {
         setGenre(g);
      });
   }, []);

   async function fetchGenres(): Promise<IGenre[]> {
      const response = await fetch(GET_GENRES, OPTIONS_GET);
      const genres: IGenre[] = (await response.json())?.genres;
      return genres;
   }

   return (
      <div
         className="rounded-xl w-fit relative overflow-hidden group"
         style={{ width: 220, height: 330 }}
      >
         <img
            className="rounded-xl"
            src={
               imageUrl !== null
                  ? "https://www.themoviedb.org/t/p/w220_and_h330_face/" +
                    imageUrl
                  : "https://d994l96tlvogv.cloudfront.net/uploads/film/poster/poster-image-coming-soon-placeholder-no-logo-500-x-740_29372.png"
            }
            alt="img"
         />
         <div
            className="absolute text-white text-base text-center rounded-xl w-full p-2"
            style={{
               background: "#141414",
               bottom: -1,
               border: "1px #141414 solid",
            }}
         >
            <h5>{title}</h5>
            <div
               className="h-0 hidden group-hover:block group-hover:h-auto"
               style={{ transition: "all easy-in-out 0.3s" }}
            >
               <div className="flex justify-center gap-1 flex-wrap mt-2 mb-2">
                  {genreId.map((elem, key = 0) => {
                     return (
                        <h5
                           key={key++}
                           className="bg-white text-black border-2 p-1 text-xs font-bold rounded-md"
                        >
                           {genre.find((g) => g.id === elem)?.name}
                        </h5>
                     );
                  })}
               </div>
               <span className="flex flex-row justify-center gap-2">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-6 h-6 m-0"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                     />
                  </svg>
                  <h5>{avarageVote}</h5>
               </span>
            </div>
         </div>
      </div>
   );
}
