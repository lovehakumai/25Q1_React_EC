import { useEffect, useState } from "react";
import Container from "../ui/Container";
import { config } from "../config";
import getData from "../lib";
import ProductCard from "../ui/ProductCard";
import { ProductProps } from "../type";
import CategoryFilters from "../ui/CategoryFilters";
import { useParams } from "react-router-dom";
import PriceTag from "../ui/PriceTag";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineStarBorder } from "react-icons/md";
import _ from "lodash";
import AddToCartBtn from "../ui/AddToCartBtn";
import { payment } from "../assets";
import Loading from "../ui/Loading";

const Product = () => {
    const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
    const [productData, setProductData] = useState<ProductProps | null>(null);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const {id} = useParams();
    useEffect(()=>{
        const fetchData = async() => {
            const endpoint = id ? `${config.baseUrl}/products/${id}` : `${config.baseUrl}/products`
            try {
                setLoading(true);
                const data = await getData(endpoint);
                if(id){
                    setAllProducts([]);
                    setProductData(data);
                }else{
                    setAllProducts(data);
                    setProductData(null);
                }
            } catch (error) {
                console.error("Fetching Error", error);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[id]);

    useEffect(()=>{
        if(productData){
            setColor(productData.colors[0]);
            setImgUrl(productData.images[0]);
        }
    }, [productData])

    console.log("imgages", productData?.images);

    let savedAmount = 0;
    if(productData !== null){
        savedAmount = productData?.regularPrice - productData?.discountedPrice;
    }

    return (
        <div>
            {loading ? (<Loading />): (
                <Container className="max-w-screen-xl mx-auto py-10 px-10 lg:px-0">
                {!!id && productData && _.isEmpty(allProducts)? 
                (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="flex flex-start">
                                <div>
                                    {productData?.images.slice(1).map((item:string)=>(
                                        <img src={item} alt="productImg" key={item} onClick={()=>setImgUrl(item)}
                                            className={`w-24 h-24 object-cover hover:opacity-50 duration-300 ${imgUrl === item && "opacity-30 hover:opacity-20"}`}
                                        />
                                    ))}
                                </div>
                                <div className="w-[180px] h-[180px]">
                                    <img src={imgUrl} alt="productImg" className="w-full h-full object-cover"/>
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">
                                    {productData?.name}
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="flex justify-between">
                                            <PriceTag item={productData as ProductProps} className="text-2xl"/>
                                            <div className="flex items-center">
                                                <MdOutlineStarBorder />
                                                <MdOutlineStarBorder />
                                                <MdOutlineStarBorder />
                                                <MdOutlineStarBorder />
                                                <MdOutlineStarBorder />
                                                <p className="font-bold">({productData?.reviews}Reviews)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FaRegEye /><span className="font-semibold">{productData?.reviews}</span>{"　"}People are watching
                                    </div>
                                    <div>
                                        <p>You are saving <span className="font-bold text-green-500">¥{savedAmount}</span> upon purchase</p>
                                    </div>
                                    <div>
                                        {color && (
                                            <p>
                                                Color:{"　"}
                                                <span
                                                    className="capitalize font-bold" 
                                                    style={{color:color}}>
                                                    {color}
                                                </span>
                                            </p>
                                            )
                                        }        
                                    </div>
                                    <div className="flex gap-2">
                                        {productData.colors.map((item)=>(
                                            <div className="rounded-full w-10 h-10" style={{background:item}} onClick={()=>setColor(item)}></div>
                                        ))}
                                    </div>
                                    <div>
                                        Category: {productData?.brand}
                                    </div>
                                    <div>
                                        <PriceTag item={productData}/>
                                    </div>
                                    <AddToCartBtn />
                                    <div className="bg-gray-100 flex flex-col items-center gap-2 p-4 rounded-md">
                                        <img src={payment} alt="payment-img" className="object-cover"/>
                                        <span>Guranteed safe & secure checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                <>
                    <h1 className="text-4xl font-bold text-center mb-8">Products Collection</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex gap-10 m-auto">
                            <CategoryFilters />
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {allProducts.map((item: ProductProps)=>(
                                    <ProductCard key={item?._id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
                )}
            </Container>
            )}
        </div>
    );
};

export default Product;