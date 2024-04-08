import { useState, useEffect } from "react";
import { promotionCarosalImageUrl } from "../../utils/constants";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { GoDot, GoDotFill } from "react-icons/go";

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
        className="absolute top-[50%] left-0 text-white rounded-md px-2 text-4xl"
        onClick={handlePrev}
      >
        <IoMdArrowDropleftCircle />
      </button>

      {promotionCarosalImageUrl?.map((item, index) => {
        if (imgIndex === index) {
          return (
            <div className="static flex">
              <img
                className="rounded-lg w-[1250px] ease-in"
                src={item}
                key={index}
                alt={item}
              ></img>

              <div className="absolute flex justify-center text-base bottom-4 left-0 right-0">
                {promotionCarosalImageUrl?.map((image, index) => (
                  <button onClick={() => setImgIndex(index)}>
                    {imgIndex === index ? <GoDotFill /> : <GoDot />}
                  </button>
                ))}
              </div>
            </div>
          );
        }
      })}

      <button
        className="absolute top-[50%] right-0 text-white rounded-md px-2 text-4xl"
        onClick={handleNext}
      >
        <IoMdArrowDroprightCircle />
      </button>
    </div>
  );
}

export default PromotionCarosal;
