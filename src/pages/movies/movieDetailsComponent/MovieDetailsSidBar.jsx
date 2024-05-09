import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../../../redux-system/redux-slices/moviesSlice/movieDetailsSlice";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const MovieDetailsSidBar = ({ movieid }) => {
  const { movieDetailsdata } = useSelector((state) => state.moviesDetails);
  const [keyWords, setKeyWords] = useState(null);
  const dispatch = useDispatch();
  const getKeyWords = () => {
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieid}/keywords`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
      },
    }).then((res) => {
      setKeyWords(res.data.keywords);
    });
  };

  useEffect(() => {
    dispatch(getMovieDetails(movieid));
    getKeyWords();
  }, [movieid]);

  return (
    <div className="px-2 my-10 flex flex-col justify-evenly items-center md:items-start">
      <div className="flex justify-evenly w-full ">
        <div>
          <FaFacebook className="text-2xl text-light-blue-500 " />
        </div>
        <div>
          <FaTwitter className="text-2xl text-light-blue-500 " />
        </div>
        <div>
          <FaInstagram className="text-2xl text-light-blue-500 " />
        </div>
        <div>
          <AiOutlineHome className="text-2xl text-light-blue-500 " />
        </div>
      </div>
      <div className="flex flex-col justify-evenly gap-2 my-10">
        <div>
          <h1 className="text-white text-xl drop-shadow-3xl">Status</h1>
          <p className="text-light-blue-500 text-lg my-2">
            {movieDetailsdata?.status}
          </p>
        </div>
        <div>
          <h1 className="text-white text-xl drop-shadow-3xl">
            Original Language
          </h1>
          <p className="text-light-blue-500 text-lg my-2 uppercase">
            {movieDetailsdata?.original_language}
          </p>
        </div>
        <div>
          <h1 className="text-white text-xl drop-shadow-3xl">Budget</h1>
          {movieDetailsdata?.budget !== 0 ? (
            <p className="text-light-blue-500 text-lg my-2">
              $ {movieDetailsdata?.budget.toLocaleString()}
            </p>
          ) : (
            <p className="text-light-blue-500 text-lg my-2">-</p>
          )}
        </div>
        <div>
          <h1 className="text-white text-xl drop-shadow-3xl">Revenue</h1>
          {movieDetailsdata?.revenue !== 0 ? (
            <p className="text-light-blue-500 text-lg my-2">
              $ {movieDetailsdata?.revenue.toLocaleString()}
            </p>
          ) : (
            <p className="text-light-blue-500 text-lg my-2">-</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-light-blue-500 text-3xl font-bold mb-5">
          Keywords
        </h1>
        <div>
          {keyWords?.map((ele, ind) => (
            <Button
              key={ind}
              className=" hover:-translate-y-1 hover:scale-110 hover:bg-gray-600 hover:text-light-blue-500 p-2 m-1"
            >
              {ele.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSidBar;
