import { useState, useEffect } from "react";
import { promotionCarosalImageUrl } from "../../utils/constants";

function PromotionCarosal() {
  const [imgIndex, setImgIndex] = useState(0);

  const handlePrev = () => {
    imgIndex === 0
      ? setImgIndex(promotionCarosalImageUrl.length - 1)
      : setImgIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    imgIndex < promotionCarosalImageUrl.length - 1
      ? setImgIndex((prev) => prev + 1)
      : setImgIndex(0);
  };

  useEffect(() => {
    let timer = setTimeout(() => handleNext(), 2000);
    return () => clearTimeout(timer);
  }, [imgIndex]);

  return (
    <div className="bg-gray-300 py-2 relative text-white flex justify-center">
      <button
        className="absolute top-2/4 left-0 bg-black/50 rounded-md px-2 text-2xl"
        onClick={handlePrev}
      >
        {"<"}
      </button>

      {promotionCarosalImageUrl?.map((item, index) => {
        if (imgIndex === index) {
          return (
            <img
              className="rounded-lg w-[1250px] ease-in"
              src={item}
              key={index}
              alt={item}
            ></img>
          );
        }
      })}

      <button
        className="absolute top-2/4 right-0 bg-black/50 rounded-md px-2 text-2xl"
        onClick={handleNext}
      >
        {">"}
      </button>
    </div>
  );
}

export default PromotionCarosal;
