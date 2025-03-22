import { homeBanner } from "../assets";
import Container from "./Container";
import LinkButton from "./LinkButton";
const HomeBanner = () => {
    return (
        <Container className="w-full overflow-hidden py-0">
            <div className="relative py-0"> 
                <img src={homeBanner} alt="homebanner" className="w-full h-full object-cover rounded-lg"/>
                <div className="absolute inset-0 flex flex-col items-start gap-2 top-0 left-2 md:top-1/4 md:left-4 text-whiteText">
                    <h1 className="text-xl font-bold select-none md:text-4xl lg:text-6xl">DO IT, BE GREATLY!</h1>
                    <p className="leading-5 text-sm font-semibold select-none md:text-base lg:text-base max-w-[250px]">SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE</p>
                    <LinkButton className="w-44 flex item-center justify-center bg-white text-darkText"/>
                </div>
            </div>
        </Container>
    );
};

export default HomeBanner;