import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { store } from "../lib/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { ProductProps } from "../type";

const ProductCardSideNav = ({product, newClassName}: {product: ProductProps,newClassName: string}) => {
    const addToFavorite = store((state)=>state.addToFavorite);
    const favoriteProduct = store((state)=>state.favoriteProduct)
    const [existingProduct, setExistingProduct] = useState<ProductProps | null>(null);

    useEffect(()=>{
        const availableItem = favoriteProduct.find((item)=>item?._id===product?._id);
        if(availableItem){
            setExistingProduct(availableItem);
        }else{
            setExistingProduct(null);
        }
    },[product, favoriteProduct])

    const handleFavorite = () => {
        console.log("product", product)
        if(product){
            addToFavorite(product).then(()=>{
                toast.success(
                    existingProduct
                        ? `${product?.name.substring(0,10)} removed successfully`
                        : `${product?.name.substring(0,10)} added successfully`
                );
            });
        }
    };
    return (
        <div className={twMerge("flex flex-col justify-around text-xl text-darkText/75 transition-all translate-x-full",newClassName)}>
            <div 
                onClick={handleFavorite}
                className="rounded-full hover:bg-black hover:text-gray-300 p-3 duration-300 cursor-pointer"
            >
                {existingProduct ? <FaStar /> : <FaRegStar />}
            </div>
    
            <div className="rounded-full hover:bg-black hover:text-gray-300 p-3 duration-300 cursor-pointer">
                <LuArrowLeftRight />
            </div>
    
            <div className="rounded-full hover:bg-black hover:text-gray-300 p-3 duration-300 cursor-pointer">
               <FaRegEye />
            </div>
        </div>
    );
};

export default ProductCardSideNav;