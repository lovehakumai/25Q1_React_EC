import { twMerge } from "tailwind-merge";
import { ProductProps } from "../type";

const PriceTag = ({item, className}:{item: ProductProps, className?: string}) => {
    return (
        <div className={twMerge("flex space-x-2 text-base", className)}>
            <span className="text-gray-600 line-through py-2">¥{item?.regularPrice}</span>
            <span className="text-skyText font-semibold rounded-md py-2">¥{item?.discountedPrice}</span>
        </div>
    );
};

export default PriceTag;