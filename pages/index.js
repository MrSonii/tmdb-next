import Link from "next/link";
import { get } from "axios";
import Image from "next/image";
import { useState } from "react";

// import"from""../pageStyles/Home.css";

function getCookie(name) {
  if (process.browser) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}

function setCookie(key, value) {
  if (process.browser) {
    document.cookie = `${key}=${value}`;
  }
}

export const getServerSideProps = async (context) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_APIKEY;
  const resp = await get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=a&page=1&include_adult=false`
  );

  const darkModeSer = context.req.cookies.dark || false;

  console.log(darkModeSer);

  const { results } = resp.data;
  return {
    props: {
      results,
      darkModeSer,
    },
  };
};

const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const blurURL = `data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`;

//
//
export default function Home({ results, darkModeSer }) {
  const [darkMode, setDarkMode] = useState(darkModeSer);

  const handleDarkMode = () => {
    setCookie("dark", !darkMode);
    setDarkMode(!darkMode);
  };

  return (
    results && (
      <div data-dark={darkMode}>
        <header className="header">
          {!darkMode && (
            <button onClick={handleDarkMode} className="dark_mode_button">
              &#127770;
            </button>
          )}
          {darkMode && (
            <button onClick={handleDarkMode} className="dark_mode_button">
              &#127773;
            </button>
          )}
        </header>
        <nav className="navBar">
          <ul className="ul">
            {results.map((data) => {
              return (
                <Link key={data.id} href={`./pageDetail/${data.id}`}>
                  <li data-all={JSON.stringify(data)} className="li">
                    <div className="poster">
                      <Image
                        placeholder="blur"
                        blurDataURL={`${blurURL}`}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face${data.poster_path}`}
                        alt={data.original_title}
                        layout="fill"
                        quality={100}
                      />
                    </div>

                    <p>{data.original_title}</p>
                    <p>Rating: {data.vote_average}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    )
  );
}
