import { useEffect, useState } from "react";
import getData from "../lib";
import { HighlightsType } from "../type";
import { config } from "../config";
import Container from "./Container";
import { Link } from "react-router-dom";

const Highlights = () => {
    const [highlights, setHighlights] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            const endpoint = `${config?.baseUrl}/highlights`;
            try {
                const data = await getData(endpoint);
                console.log("data", data);
                setHighlights(data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchData();
    },[]);

    return (
        <Container className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {highlights.map((item:HighlightsType)=>(
                <div key={item?._id} className="relative group">
                    <div className="h-60 overflow-hidden rounded-2xl">
                        <img
                            src={item?.image} 
                            alt="highlightsImage" 
                            className="block w-full h-full transition-transform object-cover group-hover:scale-110 duration-300" />
                    </div>
                    <div className="absolute z-10 px-4 py-4 top-0 flex flex-col select-none" style={{color:item?.color}}>
                        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{item?.name}</h1>
                        <p className="pt-4">{item?.title}</p>
                    </div>
                    <div className="absolute z-10 bottom-0 text-whiteText pb-4 pl-4">
                        <Link to={item?._base} className="">{item?.buttonTitle}</Link>
                    </div>
                </div>
            ))}
        </Container>
    );
};

export default Highlights;