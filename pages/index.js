import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "axios";

import { getDataSucc } from "../store/action";
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataSucc(results));
  }, []);

  const apiData = useSelector((state) => state.dataReducer.data);

  return (
    apiData && (
      <nav className={classes.navBar}>
        <ul className={classes.ul}>
          {apiData.map((data) => {
            return (
              <Link key={data.id} href={`./pageDetail/${data.id}`}>
                <li data-all={JSON.stringify(data)} className={classes.li}>
                  <img
                    className={classes.poster}
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${data.poster_path}`}
                    alt={data.original_title}
                  />
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
