import { get } from "axios";

import styles from "./details.module.css";

export const getServerSideProps = async ({ params }) => {
  const id = params.details;
  const resp = await get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY}&language=en-US`
  );

  const { data } = resp;

  return { props: { data } };
};

export default function Details({ data }) {
  return (
    <div className={styles.grey_custom}>
      <h2>Movie Name: {data.title}</h2>
      <h2>Movie Average: {data.vote_average}</h2>
      <h2>Movie OverView: {data.overview}</h2>
    </div>
  );
}
