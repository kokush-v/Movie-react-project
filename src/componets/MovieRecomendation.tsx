import { useEffect, useState } from "react";
import Carousel from "better-react-carousel";
import { fetchMovieRecomendation } from "../api/api.functions";
import { IGenre, IMovieItem, MovieRes } from "../models";

interface MoiveRecomendationProps {
   genreProps: IGenre[];
}

export default function MovieRecomendation({
   genreProps,
}: MoiveRecomendationProps) {
   const [recomendation, setRecomendation] = useState<IMovieItem[]>([]);
   const [genre, setGenre] = useState<IGenre[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      fetchMovieRecomendation()
         .then((res: MovieRes) => {
            setRecomendation(res.results);
            setGenre(genreProps);
         })
         .then(() => {
            setLoading(false);
         });
   }, [genreProps]);

   return !loading ? (
      <div className="relative mt-10">
         <h1 className="text-center text-4xl text-white font-bold">
            Популярні фільми
         </h1>
         <div className="m-9 mt-0 p-10 rounded-3xl relative z-20">
            <Carousel
               cols={4}
               rows={1}
               gap={20}
               loop
               autoplay={5000}
               hideArrow={true}
            >
               {recomendation.map(
                  ({
                     title,
                     backdrop_path,
                     vote_average,
                     genre_ids,
                  }: IMovieItem) => {
                     return (
                        <Carousel.Item>
                           <div className="rounded-xl w-full relative overflow-hidden group flex justify-center">
                              <img
                                 className="rounded-xl"
                                 src={
                                    backdrop_path !== null
                                       ? "https://www.themoviedb.org/t/p/w533_and_h300_bestv2" +
                                         backdrop_path
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
                                    style={{
                                       transition: "all easy-in-out 0.3s",
                                    }}
                                 >
                                    <div className="flex justify-center gap-1 flex-wrap mt-2 mb-2">
                                       {genre_ids.map((elem, key = 0) => {
                                          return (
                                             <h5
                                                key={key++}
                                                className="text-xs font-bold rounded-md p-1"
                                                style={{
                                                   background:
                                                      genre.find(
                                                         (g) => g.id === elem
                                                      )?.color + "25",
                                                   color: genre.find(
                                                      (g) => g.id === elem
                                                   )?.color,
                                                }}
                                             >
                                                {
                                                   genre.find(
                                                      (g) => g.id === elem
                                                   )?.name
                                                }
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
                                       <h5>{vote_average.toPrecision(2)}</h5>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </Carousel.Item>
                     );
                  }
               )}
            </Carousel>
         </div>
         <div
            className="absolute z-10"
            style={{
               width: 1490,
               height: 365,
               top: 0,
               left: 0,
               background:
                  "radial-gradient(103.03% 224.05% at 7% 45%, #FF007B 0%, #6B4EFF 85%) ",
               borderRadius: 30,
               filter: "blur(50px)",
               opacity: 0.5,
            }}
         ></div>
      </div>
   ) : null;
}
