import { useContext, useEffect, useRef, useState } from "react";
import { IGenre } from "../models";
import { GenreContext, GenreContextType } from "../context/context";

interface MovieHeaderProps {
   genreProps: IGenre[];
}

export default function MovieHeader({ genreProps }: MovieHeaderProps) {
   const [showModal, setShowModal] = useState(false);
   const [genre, setGenre] = useState<IGenre[]>([]);
   const context: GenreContextType | any = useContext(GenreContext);
   const { selectedGenres, updateSelectedGenres }: GenreContextType = context;
   const genreRef = useRef<HTMLHeadingElement>(null);

   function toggleModal() {
      if (showModal) {
         setShowModal(false);
      } else {
         setShowModal(true);
      }
   }

   const toggleSelected = (e: React.MouseEvent<HTMLElement>, key: number) => {
      var element = e.target as HTMLDivElement;
      element.classList.toggle("active");

      if (!element.classList.contains("active")) {
         element.style.border = "none";
         const updatedNumbers = selectedGenres.filter(
            (number: number) => number !== key
         );

         updateSelectedGenres(updatedNumbers);
      } else {
         var color = window.getComputedStyle(element).color;
         element.style.border = "1px " + color + " solid";
         updateSelectedGenres([...selectedGenres, key]);
      }
   };

   useEffect(() => {
      setGenre(genreProps);
   }, [genreProps]);

   return (
      <header className="w-11/12 h-20 flex justify-between items-center top-0 bg-slate-900">
         <h1 className="text-white text-3xl">
            Movie.<b className="text-slate-500">CHECKER</b>
         </h1>
         <label className="relative block w-1/3">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="w-6 h-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
               </svg>
            </span>
            <input
               className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
               placeholder="Знайти фільм..."
               type="text"
               name="search"
            />
         </label>

         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-10 h-10 cursor-pointer z-50"
            onClick={() => {
               toggleModal();
            }}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
            />
         </svg>
         {showModal && (
            <div
               className="modal absolute w-2/6 h-auto flex flex-row justify-center flex-wrap gap-3 p-5 z-40 top-24 right-60 rounded-xl"
               style={{
                  boxShadow: "0px 0px 91px 30px rgba(20,20,20,1)",
                  background: "#141414",
               }}
            >
               {genre.map((elem) => {
                  return (
                     <h5
                        ref={genreRef}
                        key={elem.id}
                        className="p-2 text-xl rounded-xl cursor-pointer"
                        style={
                           selectedGenres.find((g) => g === elem.id) ===
                           undefined
                              ? {
                                   background: `${elem.color}30`,
                                   color: elem.color,
                                }
                              : {
                                   background: `${elem.color}30`,
                                   color: elem.color,
                                   border: `1px solid ${elem.color}`,
                                }
                        }
                        onClick={(event) => {
                           toggleSelected(event, elem.id);
                        }}
                     >
                        {elem.name}
                     </h5>
                  );
               })}
            </div>
         )}
      </header>
   );
}
