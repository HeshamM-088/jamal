import React, { useEffect, useState } from "react";
import { Tabs, TabsHeader, TabsBody } from "@material-tailwind/react";
import axios from "axios";
import ReactShowMoreText from "react-show-more-text";

const SocialMovieDetails = ({ movieid }) => {
  const [allReviews, setAllReviews] = useState(null);

  const getReviews = () => {
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieid}/reviews`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
      },
    }).then((res) => setAllReviews(res.data.results));
  };

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div className="px-10">
      <div className="text-2xl font-medium text-light-blue-500">Social</div>
      <div className="">
        <Tabs className="my-10 " value={"Reviews"}>
          <TabsHeader
            className="rounded-none border-b-2 border-[#9C27B0] text-[#9C27B0] text-lg font-semibold bg-transparent w-1/4"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            Reviews ({allReviews?.length}){" "}
          </TabsHeader>
          {allReviews
            ?.filter((ele, ind) => ind < 1)
            .map((ele, ind) => (
              <TabsBody
                key={ind}
                className=" bg-blue-gray-300 flex gap-10 rounded-xl flex-col lg:flex-row p-5 items-center lg:items-start"
              >
                <div className="w-[75px] h-[75px] rounded-full bg-gray-700 text-center text-white text-xl font-semibold content-center m-3">
                  {ele?.author.charAt(0)}
                </div>
                <div className="text-white text-lg space-x-1 my-5">
                  <div>
                    {" "}
                    <span className="font-bold text-2xl">A review by</span>{" "}
                    <span className="text-light-blue-700 font-semibold text-xl">
                      {ele?.author}
                    </span>
                  </div>
                  Written by{" "}
                  <span className="text-light-blue-700 font-semibold text-xl">
                    {ele?.author}
                  </span>{" "}
                  on{" "}
                  <span className="text-light-blue-700 font-semibold text-xl">
                    {new Date(ele?.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <div className="text-xl text-blue-800 font-semibold">
                    content :{" "}
                  </div>
                  <div className="w-full text-base">
                    <ReactShowMoreText
                      lines={5}
                      more="Show more"
                      width={512}
                      less="Show less"
                      className="content-css"
                      anchorClass="show-more-less-clickable text-light-blue-700 underline cursor-pointer	"
                      expanded={false}
                      truncatedEndingComponent={"  ... "}
                    >
                      {ele.content}
                    </ReactShowMoreText>
                  </div>
                </div>
              </TabsBody>
            ))}
        </Tabs>
      </div>
      {allReviews?.length > 0 && (
        <div className="text-light-blue-500 m-2 font-medium ">
          Read All Reviews
        </div>
      )}
    </div>
  );
};

export default SocialMovieDetails;
