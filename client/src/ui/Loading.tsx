import {PacmanLoader} from "react-spinners";
const Loading = () => {

    return (
        <div className="w-full h-full bg-black/80 absolute top-0 left-0 flex flex-col gap-1 items-center justify-center">
            <PacmanLoader 
                size={15}
                margin={0}
                color="#29db35"
                loading={true}
            />
            <p className="text-whiteText text-2xl font-bold tracking-widest">
                Loading ...
            </p>
        </div>
    );
};

export default Loading;
