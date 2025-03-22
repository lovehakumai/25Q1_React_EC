
import { ProductProps } from "../type";
import AddToCartBtn from "./AddToCartBtn";
import { Link } from "react-router-dom";
import { MdOutlineStarOutline } from "react-icons/md";
import ProductCardSideNav from "./ProductCardSideNav";
import { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";

interface Props{
    item: ProductProps;
}

const ProductCard = ({item}:Props) => {
    const discountRate = Math.trunc(((item?.regularPrice - item?.discountedPrice)/item?.regularPrice) * 100)
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="border border-gray-300 hover:border-gray-600 rounded">
                <div className="relative overflow-hidden group h-60">
                    <Link to={`/product/${item?._id}`} className="rounded-lg">
                        <img src={item?.images[0]} alt="itemImg" 
                            className="object-cover w-full h-full scale-[90%] rounded-lg group-hover:scale-100 duration-300"/>
                    </Link>
                    <span
                        onClick={()=>setIsOpen(true)} 
                        className="absolute inline-block py-1 px-2 z-10 top-0 left-0 rounded-md bg-black/30 text-whiteText cursor-pointer"
                    >
                        save {discountRate}%
                    </span>
                    <ProductCardSideNav product={item} newClassName="absolute top-0 right-0 h-20 group-hover:translate-x-0 duration-300 h-[75%]"/>
                </div>
                <div className="flex flex-col mx-4 justify-between">
                    <p className="font-semibold text-gray-900/30 tracking-tight">{item?.overView}</p>
                    <p className="mt-2 font-bold text-lg leading-8 line-clamp-2">{item?.name}</p>
                    <div className="flex mt-2">
                        <MdOutlineStarOutline />
                        <MdOutlineStarOutline />
                        <MdOutlineStarOutline />
                        <MdOutlineStarOutline />
                        <MdOutlineStarOutline />
                    </div>
                    <div className="my-4">
                        <AddToCartBtn product={item} className="w-full"/>
                    </div>
                </div>
                <Dialog 
                    open={isOpen} onClose={() => setIsOpen(false)} 
                    transition
                    className="relative z-50 transition duration-300 data-[closed]:opacity-0"
                >
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 text-whiteText bg-black rounded-2xl py-6 px-10">
                        <DialogTitle className="font-bold">Hurry UP!</DialogTitle>
                        <Description>You can Save <span className="text-skyText">${discountRate}%</span> only for now</Description>
                        <div className="flex gap-4">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-100 duration-300 cursor-pointer"
                        >
                            Thanks,Got It.
                        </button>
                        </div>
                    </DialogPanel>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

export default ProductCard;