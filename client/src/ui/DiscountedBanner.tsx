import { Link } from "react-router-dom";
import Container from "./Container";
import Title from "./Title";
import { brandFive, brandFour, brandOne, brandSix, brandThree, brandTwo, discountImgOne, discountImgTwo } from "../assets";

const DiscountedBanner = () => {
    const popularSearchItems = [
        {title: "Smart Watches", link: "smartWatches"},
        {title: "Headphone", link: "headphones"},
        {title: "Cameras", link: "camerasAndPhotos"},
        {title: "Audio", link: "tvAndPhotos"},
        {title: "Laptop & Computers", link: "tvAndAudio"},
        {title: "Cell Phone", link: "cellPhones"},
    ]
    return (
        <Container className="w-full">
            <Title title="PopularSearch" link="/category/tvAndAudio" />
            <div className="flex flex-wrap gap-4 mb-4">
                {popularSearchItems.map((item)=>(
                    <Link
                        key={item?.title}
                        to={`/categories/${item?.link}`} 
                        className="border border-gray-200 rounded-full px-4 py-2 font-bold text-md tracking-tight hover:bg-darkText hover:text-whiteText duration-300">
                        {item?.title}
                    </Link>
                ))}
            </div>
            <div className="flex justify-between w-full bg-gray-100 mb-8">
                <div>
                    <img src={discountImgOne} alt="" className="object-cover h-36 w-full"/>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row items-center py-2">
                        <p className="font-bold text-4xl">Sony HeadPhone </p>
                        <Link to={""} className="block border-2 font-bold text-3xl text-redText border-red-500 rounded-full px-4 py-2 mx-4">Discount 20%</Link>
                    </div>
                    <p className="block">You’re out to play or stepping out to make</p>
                </div>
                <div>
                    <img src={discountImgTwo} alt="" className="object-cover h-36 w-full"/>
                </div>
            </div>
            <div className="my-4">
                <p className="font-bold">Brands We Distribute</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    <div className="flex justify-center items-center border border-gray-100 px-6 py-2 hover:opacity-50 duration-300">
                        <img src={brandOne} alt="brandImg" className="w-36 h-auto"/>
                    </div>
                    <div className="flex justify-center items-center border border-gray-100 px-6 py-2 hover:opacity-50 duration-300">
                        <img src={brandTwo} alt="brandImg" className="w-36 h-auto" />
                    </div>
                    <div className="flex justify-center items-center border border-gray-100 px-6 py-2 hover:opacity-50 duration-300">
                        <img src={brandThree} alt="brandImg" className="w-36 h-auto" />
                    </div>
                    <div className="flex justify-center items-center border border-gray-100 px-6 py-2 hover:opacity-50 duration-300">
                        <img src={brandFour} alt="brandImg" className="w-36 h-auto"/>
                    </div>
                    <div className="flex justify-center items-center border border-gray-100 px-6 py-2 hover:opacity-50 duration-300">
                        <img src={brandFive} alt="brandImg" className="w-36 h-auto" />
                    </div>
                    <div className="flex justify-center items-center border border-gray-100 px-6 py-2 hover:opacity-50 duration-300">
                        <img src={brandSix} alt="brandImg"  className="w-36 h-auto"/>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default DiscountedBanner;