import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getData } from "../store/action";
import classes from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.dataReducer.data);

  console.log(apiData);
  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    apiData.results && (
      <nav className={classes.navBar}>
        <ul className={classes.ul}>
          {apiData.results.map((data) => {
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
