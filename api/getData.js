import { request } from "axios";

export default function requestGetUser() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_APIKEY;

  return request({
    method: "get",
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=a&page=1&include_adult=false`,
  });
}
