import { useEffect, useState } from "react";
import getData from "../lib";
import { config } from "../config";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { CategoryProps } from "../type";
import { CustomLeftArrow, CustomRightArrow } from "./CustomArrows";

const BannerCategories = () => {
    const [categories, setCategories] = useState([]);

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

    useEffect(()=>{
        const fetchData = async() => {
            const endpoint = `${config?.baseUrl}/categories`;
            try {
                const data = await getData(endpoint);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }
        fetchData();
    },[]);

    return (
        <Carousel
            responsive={responsive} 
            infinite={true}
            autoPlay={true}
            transitionDuration={1000}
            className='flex p-4 max-w-screen-xl mx-auto lg:px-0 relative'
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
        >
            {categories.map((item: CategoryProps)=>
                <Link 
                    key={item?._id}
                    to={`/category/${item?._base}`}
                    className="flex items-center rounded-lg duration-100 cursor-pointer 
                    border border-gray-400 gap-x-2 p-1 mr-1 flex-1
                    font-semibold tracking-tight text-sm
                    hover:border-skyText hover:ring-inset hover:ring-sky-400
                    hover:shadow-lg"
                >
                <img 
                    src={item?.image} 
                    alt="categoryImage" 
                    className="w-10 h-10 rounded-full object-cover"
                />
                    <p>{item?.name}</p>
                </Link>
            )}
        </Carousel>
    );
};

export default BannerCategories;