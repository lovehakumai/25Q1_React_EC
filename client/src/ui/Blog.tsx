import { useEffect, useState } from "react";
import getData from "../lib";
import { BlogProps } from "../type";
import Title from "./Title";
import { config } from "../config";
import Container from "./Container";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        const fetchData = async() =>{
            const endpoint = `${config.baseUrl}/blogs`;
            try {
                const data = await getData(endpoint);
                setBlogs(data);
            } catch (error) {
                console.error("Fetching Error", error)
            }
        }
        fetchData();
    },[]);
    return (
        <Container className="w-full">
            <Title title="Blogs"/>
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden mx-4">
                    {blogs.map((item: BlogProps)=>(
                        <div className="m-auto overflow-hidden" key={item?._id}>
                            <img src={item?.image} alt="blogImage" className="aspect-square"/>
                            <div className="">
                                <p className="text-lg text-gray-300 font-bold tracking-tight">{item?._base}</p>
                                <p className="text-lg tracking-tight line-clamp-1">{item?.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Blog;