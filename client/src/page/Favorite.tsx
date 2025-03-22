import { Link } from "react-router-dom";
import { store } from "../lib/store";
import Container from "../ui/Container";
import FavoriteProduct from "../ui/FavoriteProduct";

const Favorite = () => {
    const favoriteProduct = store((state)=>state.favoriteProduct);

    return (
        <Container>
            {favoriteProduct?.length > 0 ? (
                <div>
                    <div className="border-b border-gray-300 pb-6">
                        <h2 className="font-bold text-2xl tracking-tight text-gray-900 sm:text-3xl">
                            Favorite Products
                        </h2>
                        <p className="text-gray-400 text-sm mt-2 max-w-[500px] tracking-wide">
                            samplesamplesamplesamplesamplesamplesamplesamplesample
                            samplesamplesamplesamplesamplesamplesamplesamplesample
                            samplesamplesamplesamplesamplesamplesamplesamplesample
                        </p>
                    </div>
                    <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
                        <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
                            {favoriteProduct?.map((product) => (
                                <FavoriteProduct key={product?._id} productId={product?._id} />
                            ))}
                        </div>
                    </div>
                </div>
            ):(
                <div className="mx-auto flex max-w-3xl flex-col gap-3 items-center text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Nothing added to Favorite
                    </h2>
                    <p className="text-lg tracking-wide leading-6 text-gray-500">
                        samplesamplesamplesamplesamplesamplesamplesamplesample
                        samplesamplesamplesamplesamplesamplesamplesamplesample
                        samplesamplesamplesamplesamplesamplesamplesamplesample
                    </p>
                    <Link 
                        to={"/product"}
                        className="w-full mt-2 rounded-md border border-transparent px-8 py-3 text-base font-bedium text-amber-900 bg-gray-100 sm:w-auto hover:bg-black"
                    >
                        Add Products
                    </Link>
                </div>
            )}        
        </Container>
    );
};

export default Favorite;