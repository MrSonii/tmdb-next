import Link from "next/link";
import { get } from "axios";
import Image from "next/image";

import classes from "../styles/Home.module.css";

export const getServerSideProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_APIKEY;
  const resp = await get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=a&page=1&include_adult=false`
  );

  const { results } = resp.data;

  return {
    props: {
      results,
    },
  };
};

export default function Home({ results }) {
  return (
    results && (
      <nav className={classes.navBar}>
        <ul className={classes.ul}>
          {results.map((data) => {
            return (
              <Link key={data.id} href={`./pageDetail/${data.id}`}>
                <li data-all={JSON.stringify(data)} className={classes.li}>
                  <div className={classes.poster}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${data.poster_path}`}
                      alt={data.original_title}
                      // layout="fill"
                      width={1000}
                      height={1500}
                    />
                  </div>

                  <p>{data.original_title}</p>
                  <p>Rating: {data.vote_average}</p>
                </li>
              </Link>
            );
          })}
        </ul>
        {/* <div className={classes.page_nav}>
          {apiData.page > 1 && (
            <button
              className={`${classes.page_nav_button} ${classes.pad_10}`}
              // onClick={handleApiData(apiData.page - 1)}
            >
              prev
            </button>
          )}
          {apiData.page < 500 && (
            <button
              className={`${classes.page_nav_button} ${classes.pad_20LR}`}
              // onClick={handleApiData(apiData.page + 1)}
            >
              move to {apiData.page + 1}
            </button>
          )}
        </div> */}
      </nav>
    )
  );
}
