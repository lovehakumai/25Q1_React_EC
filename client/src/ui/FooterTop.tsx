import { FaShippingFast } from "react-icons/fa";
import Container from "./Container";
import { FaHandHoldingHand } from "react-icons/fa6";
import { GiTrade } from "react-icons/gi";

const FooterTop = () => {
    const iconStyle = "text-6xl text-center mx-auto"
    const incentives = [
        {
            name: "Free shipping",
            icon:
              <FaShippingFast className={iconStyle}/>,
            description:
              "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
          },
          {
            name: "10-year warranty",
            icon: <FaHandHoldingHand className={iconStyle}/>,
            description:
              "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
          },
          {
            name: "Exchanges",
            icon: <GiTrade className={iconStyle}/>,
            description:
              "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
          },      
    ];
    return (
        <Container className="max-w-screen rounded-md bg-gray-100 mx-4">
            <h1 className="text-center text-xl md:text-2xl font-semibold mb-8">Incentives for your Satisfaction</h1>
            <div className="flex flex-col justify-center pb-10 gap-8 
                                md:flex-row md:max-w-[75%] md:m-auto"
            >
                {incentives.map((item)=>(
                    <div key={item?.name} 
                        className="flex items-center max-w-screen px-0 gap-8 
                                    md:flex-col md:text-center"
                    >
                        <div key={item?.name}>
                            {item?.icon}
                        </div>
                        <div>
                            <div className="font-semibold text-base md:text-lg">
                                {item?.name}
                            </div>
                            <div className="text-sm tracking-tight text-gray-500 max-[75%]">
                                {item?.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default FooterTop;