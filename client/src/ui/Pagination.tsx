import { useEffect, useState } from "react";
import { config } from "../config";
import getData from "../lib";
import { ProductProps } from "../type";
import ReactPaginate from "react-paginate"
import ProductCard from "./ProductCard";

const Items = ({currentItems}:{currentItems: ProductProps[]}) => {
    return(
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentItems && currentItems.map((item)=>(
                <ProductCard item={item} key={item?._id}/>
            ))}
        </div>
    );
}

const Pagination = ({itemsPerPage}: {itemsPerPage: number}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [itemStart, setItemStart] = useState(1);

    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const fetchData = async() => {
            const endpoint = `${config.baseUrl}/products`;
            try {
                const data = await getData(endpoint);
 
                
                setProducts(data);
            } catch (error) {
                console.error("Fetching Error", error);
            }
        }
        fetchData();
    },[]);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);
    
    const handlePageClick = (event: {selected: number}) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        const newStart = newOffset + 1;
        setItemOffset(newOffset);
        setItemStart(newStart);
    };
    
    return (
        <div>
            <Items currentItems={currentItems} />
            <div className="flex flex-col items-center md:flex-row md:justify-between">
                <ReactPaginate
                    nextLabel = ""
                    nextClassName="hidden"
                    marginPagesDisplayed={10}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel=""
                    previousLinkClassName="hidden"
                    className="flex cursor-pointer"
                    pageLinkClassName="block font-bold w-9 h-9 text-center leading-8 hover:bg-skyText/50 duration-200"
                    pageClassName="mr-4"
                    activeClassName="bg-skyText text-whiteText border-black"
                />
                <p className="mt-4">Products from {itemStart} to {Math.min(endOffset, products?.length)} of {products?.length}</p>
            </div>
        </div>
    );
};

export default Pagination;