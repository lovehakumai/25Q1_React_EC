import { Link } from "react-router-dom";

interface Props{
    title: string
    link?: string
}
const Title = ({title, link}:Props) => {
    const resultLink = link ? link : "/";
    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="font-bold text-xl md:text-4xl">{title}</p>
                    <Link to={resultLink} className="relative group overflow-hidden">
                        Show All {title}
                        <span className="absolute bottom-0 left-0 w-full block h-[1px] bg-gray-600 -translate-x-[100%] group-hover:translate-x-0 duration-700"></span>
                    </Link>
            </div>
            <div className="my-4 content-[''] w-full h-[1px] bg-gray-300"/>
        </div>
    );
};

export default Title;