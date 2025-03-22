import { useEffect, useState } from "react";
import { ProductProps } from "../type";
import PriceTagCalc from "./PriceTagCalc";
import { store } from "../lib/store";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { FaMinus, FaPlus } from "react-icons/fa";

interface AddToCartBtnType {
    title?: string;
    product?: ProductProps;
    showPrice?: boolean;
    className?: string;
}

const AddToCartBtn = ({className, title, product, showPrice=true}: AddToCartBtnType) => {
    const [existingProduct, setExistingProduct] = useState<ProductProps | null>(null);
    const { addToCart,  cartProduct, decreaseQuantity} = store();

    useEffect(()=>{
        const availableItem  = cartProduct.find(
            (item) => item?._id === product?._id
        );
        setExistingProduct(availableItem || null);
    }, [product, cartProduct]);

const handleAddToCart = () =>{
    if(product){
        addToCart(product);
        toast.success(`${product?.name.substring(0,10)} added successfully!`);
    }else{
        toast.error("Product is undefined");
    }
}

const handleDeleteProduct = () => {
    if(existingProduct){
        if(existingProduct?.quantity > 1){
            decreaseQuantity(existingProduct?._id);
            toast.success(
                `${product?.name.substring(0,10)} decreased successfully`
            );
        }else{
            toast.error("You can not decrease less than 1");
        }
    }else{
        toast.error("ERROR: Decrease Request for unexisted Product");
    }
}

const getRegularPrice = () =>{
    if(existingProduct){
        if(product){
            return product?.regularPrice * existingProduct?.quantity;
        }
    } else {
        return product?.regularPrice;
    }
}

const getDiscountedPrice = () => {
    if(existingProduct){
        if(product){
            return product?.discountedPrice * existingProduct?.quantity;
        }
    }else{
        return product?.discountedPrice;
    }
}

const newClassName = twMerge("bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-whiteText hover:scale-105 duration-200 cursor-pointer",className)

    return (
        <>
            {showPrice && (
                <div>
                    <PriceTagCalc 
                        regularPrice={getRegularPrice()}
                        discountedPrice={getDiscountedPrice()}
                    />
                </div>
            )}
            {existingProduct ? 
                (
                    <div className="flex items-center justify-center gap-2 ">
                        <button 
                            onClick={handleDeleteProduct}
                            className="bg-[#f7f7f7] rounded-full text-black p-2 border-[1px] border-gray-200 hover:border-skyText text-sm hover:bg-white duration-200 cursor-pointer"
                        >
                            <FaMinus />
                        </button>
                        <p>
                            {existingProduct?.quantity}
                        </p>
                        <button 
                            onClick={handleAddToCart}
                            className="bg-[#f7f7f7] rounded-full text-black p-2 border-[1px] border-gray-200 hover:border-skyText text-sm hover:bg-white duration-200 cursor-pointer"
                        >
                            <FaPlus />
                        </button>
                    </div>
                ):(
                    <button className={newClassName} onClick={handleAddToCart}>
                        {title ? title: "Add to Cart"}
                    </button>
                )}
        </>
    );
};

export default AddToCartBtn;