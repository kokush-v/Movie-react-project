import MovieHeader from "./componets/MovieHeader";
import { MoiveList } from "./componets/MovieList";

function App() {
   return (
      <div className="App flex flex-col items-center ">
         <div
            className="w-4/5 min-h-full bg-slate-900 flex flex-col items-center "
            style={{
               boxShadow: "0px 0px 60px 60px rgba(15, 23, 42, 1)",
            }}
         >
            <MovieHeader />
            <MoiveList />
         </div>
      </div>
   );
}

export default App;
