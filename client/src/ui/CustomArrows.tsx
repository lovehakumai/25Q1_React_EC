import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const CustomRightArrow = ({ onClick }:any) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 
      transform -translate-y-1/2 cursor-pointer
      z-10 p-2 bg-white rounded-full shadow
      hover:ring-inset hover:ring-2 hover:ring-skyText duration-100"
    >
      <HiArrowRight size={24} />
    </button>
  );
  
  const CustomLeftArrow = ({ onClick }:any) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 
      transform -translate-y-1/2 cursor-pointer
      z-10 p-2 bg-white rounded-full shadow
      hover:ring-inset hover:ring-2 hover:ring-skyText duration-300"
    >
      <HiArrowLeft size={24} />
    </button>
  );

export {CustomLeftArrow, CustomRightArrow};