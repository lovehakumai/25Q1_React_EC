import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";

interface Props{
    children: React.ReactNode,
}

const Layout = ({children}: Props) => {
  return (
    <>
        <Header />
          {children}
        <Footer />
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          toastOptions={{
            style: {
              backgroundColor: "black",
              color: "white",
            },
          }}
        />
    </>
  );
};

export default Layout;