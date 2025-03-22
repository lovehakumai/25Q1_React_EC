import { useEffect, useState } from "react";
import { config } from "../config";
import getData from "../lib";
import { CategoryProps } from "../type";
import { Link, useParams } from "react-router-dom";

const CategoryFilters = () => {
    const [filters, setFilters] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
        const fetchData = async() => {
            const endpoint = `${config.baseUrl}/categories`;
            try {
                const data = await getData(endpoint);
                setFilters(data);
            } catch (error) {
                console.error("Fetching Error", error);
            }
        }
        fetchData();
    },[])
    return (
        <>
            <div className="hidden md:inline-flex flex-col gap-6">
                <h2 className="font-bold text-3xl">Filters</h2>
                <p className="underline underline-offset-4 decoration-gray-400 font-semibold">Select Categories</p>
                <div className="flex flex-col min-w-40 gap-4">
                    {filters.map((item: CategoryProps)=>(
                        <Link to={`/category/${item?._base}`}
                            key={item?._id}
                            className={`font-semibold text-gray-300 hover:underline hover:underline-offset-2 ${
                                item?._base === id
                                ? "text-greenText decoration-greenText"
                                : "text-lightText"
                            }`}
                        >
                            {item?.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CategoryFilters;