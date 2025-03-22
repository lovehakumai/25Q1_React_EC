import Container from "./Container";
import Title from "./Title";
import Pagination from "./Pagination";

const ProductList = () => {

    return (
        <Container className="w-full mb-8">
            <Title title="Product" link="/product"/>
            <Pagination itemsPerPage={9}/>
        </Container>
    );
};

export default ProductList;