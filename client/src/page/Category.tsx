import { useEffect, useState } from "react";
import { config } from "../config";
import getData from "../lib";
import { useParams } from "react-router-dom";
import { ProductProps } from "../type";
import Container from "../ui/Container";
import CategoryFilters from "../ui/CategoryFilters";
import ProductCard from "../ui/ProductCard";
import Loading from "../ui/Loading";

const Category = () => {
        const [loading, setLoading] = useState(false);
        const [products, setProducts] = useState([]);
        const {id} = useParams();
        useEffect(()=>{
            const fetchData = async() => {
                const endpoint = `${config.baseUrl}/categories/${id}`
                try {
                    setLoading(true);
                    const data = await getData(endpoint);
                    setProducts(data);
                } catch (error) {
                    console.error("Fetching Error",error);
                }finally{
                    setLoading(false);
                }
            }
            fetchData();
        },[id]);

        const formatedId = (id: string) =>{
            return id
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/(^\w|\s\w)/g, (match)=> match.toUpperCase())
        }
    
        return (
            <div>
            {loading ? (<Loading />):(
                    <Container className="max-w-screen-xl mx-auto py-10 px-10 lg:px-0">
                    <h1 className="text-4xl font-bold text-center mb-8">{formatedId(id as string)}</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex gap-10">
                            <CategoryFilters />
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 h-full">
                                {products.map((item: ProductProps)=>(
                                    <ProductCard key={item?._id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>   
            )
            }
            </div>
        );
    };

export default Category;