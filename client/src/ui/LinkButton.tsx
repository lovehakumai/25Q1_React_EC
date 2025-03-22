import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
    showButton?: boolean;
    link?: string;
    className?: string;
}

const LinkButton = ({showButton, link, className}:Props) => {
    const newClassName = 
        twMerge("bg-darkText/80 hover:bg-darkText hover:text-whiteText py-2.5 px-6 rounded-full flex items-center gap-2 duration-200",className);

    return (
        <Link to={link? link:'/product'} className={newClassName}>
            {showButton && <FaArrowLeft />}start Shopping
        </Link>
    );
};

export default LinkButton;