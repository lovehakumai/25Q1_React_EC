import { useEffect, useState } from "react";
import Container from "./Container";
import { config } from "../config";
import getData from "../lib";
import { CategoryProps } from "../type";
import { Link } from "react-router-dom";
import Title from "./Title";



const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const endpoint = `${config?.baseUrl}/categories`;
            try {
                const data = await getData(endpoint);
                setCategories(data);   
            } catch (error) {
                console.error("Fetching error", error);
            }
        }
        fetchData();
    },[])
    return (
        <Container className="w-full">
            <Title title="Categories" link="/category/tvAndAudio"/>
            <div  className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-7 text-whiteText"> 
                {categories.map((item: CategoryProps)=>(
                    <Link to={`category/${item?._base}`} key={item._id} className="relative aspect-square group rounded-lg overflow-hidden">
                        <div
                            style={{
                                backgroundImage:`url(${item.image})`
                            }}
                            className="group-hover:scale-110 duration-200 w-full h-full"
                        />
                        <p className="absolute bottom-0 w-full text-center z-10">{item?.name}</p>
                    </Link>
                ))}
            </div>
        </Container>
    );
};

export default Categories;