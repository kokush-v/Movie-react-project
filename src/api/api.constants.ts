export const OPTIONS_GET = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDdlYjE2MzUyZTIzZDU4OTIwYWIzYzU4MThjODlhZCIsInN1YiI6IjY0ODRiMDc5YmYzMWYyNTA1NjliNzY0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1-vvMMDOvUm3064gHcRhUT5mEdK0RywyoqTggCF5uM'
    }
  }
export const GET_GENRES ='https://api.themoviedb.org/3/genre/movie/list?language=uk'
export const GET_MOVIES = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=uk&page=1&sort_by=popularity.desc"


