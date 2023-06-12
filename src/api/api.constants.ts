export const OPTIONS_GET = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.REACT_APP_API_TOKEN
    }
  }
export const GET_GENRES ='https://api.themoviedb.org/3/genre/movie/list?language=uk'
export const GET_MOVIES = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=uk&page=1&sort_by=popularity.desc"


