import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";
import { getReviewOfMoviewApi } from "../../utils/axios";

function rateMovie() {
  let reviews = [
    <IoMdStarOutline />,
    <IoMdStarOutline />,
    <IoMdStarOutline />,
    <IoMdStarOutline />,
    <IoMdStarOutline />
  ];
  
  return (
    <div className="">
      <div className="flex space-x-4">
        <h2 className="text-xl font-semibold">Rating</h2>
        <div className="text-2xl">
          {reviews.map((item, index) => {
            return (
              <button key={index} onClick={() => console.log(index+1)}>
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MovieRating({ id }) {
  const [allReviews, setAllReviews] = useState(null);

  useEffect(() => {
    //get review of the movie
    async function getReviews() {
      let data = await getReviewOfMoviewApi(id);
      setAllReviews(data?.data);
    }
    getReviews();
  }, [id]);

  return (
    <div className="mt-2 px-4 space-y-4">
      {rateMovie()}
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Rating & Reviews</h2>
          <h2 className="text-green-500 flex items-center font-semibold space-x-1">
            <span className="text-xl">{allReviews?.overallRating}</span>
            <IoStar />
          </h2>
        </div>

        <button className="h-fit text-white text-base border-[1px] border-black px-2 rounded-sm bg-cyan-900 hover:text-base">
          Rate Movie
        </button>
      </div>

      {allReviews?.results?.length === 0 ? (
        <p className="text-sm">No review</p>
      ) : (
        <div className="">
          {allReviews?.results?.map((review, index) => {
            if (index < 5) {
              const reviewDate = new Date(review.reviewDate)
                .toDateString()
                .split(" ");

              return (
                <div className="border-[1px] border-black/5 p-4" key={index}>
                  <div className="flex space-x-4">
                    <div className="bg-green-600 px-2 rounded-sm text-sm text-white flex items-center space-x-1">
                      <span className="text-base"> {review?.rating}</span>{" "}
                      <IoStar />
                    </div>
                    <p className="text-sm font-semibold ">{review.review}</p>
                  </div>

                  <div className="space-x-2 text-sm opacity-70">
                    <span className=" opacity-70">{review.fullName}</span>
                    <span>{`${reviewDate[1]}, ${reviewDate[3]}`}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}

      <div className="flex space-x-8 mt-4">
        {allReviews?.results?.length > 0 && (
          <button className="h-fit text-white text-sm border-[1px] border-black px-2 rounded-sm bg-cyan-900 hover:text-base">
            All reviews
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieRating;
