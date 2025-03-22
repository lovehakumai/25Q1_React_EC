import { Link } from "react-router-dom";
import { logo } from "../assets";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import { Fragment, useEffect, useState } from "react";
import Container from "./Container";
import { Menu,MenuButton,Transition, MenuItems, MenuItem } from "@headlessui/react"
import getData from "../lib";
import { config } from "../config"
import { CategoryProps, ProductProps } from "../type";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
import _ from "lodash";
import ProductCard from "./ProductCard";
import { store } from "../lib/store";

const bottomNavigation = [
  {title: "Home", link:'/'},
  {title: "Shop", link:'/product'},
  {title: "Cart", link:'/cart'},
  {title: "Orders", link:'/orders'},
  {title: "My Account", link:'/profile'},
  {title: "Blog", link:'/blog'},
]

const Header = () => {
  const [searchText, setSearchText]=useState("");
  const [categories, setCategories]=useState([]);
  const [products, setProducts]=useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const currentUser = store((state)=>state.currentUser);
  
  const [open, setOpen]=useState(false);

  useEffect(()=>{
    const fetchData = async()=>{
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  },[]);

  useEffect(()=>{
    const fetchData = async()=>{
      const endpoint = `${config?.baseUrl}/products`;
      try {
        const data = await getData(endpoint);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  },[]);
  
  useEffect(()=>{
    const filtered = products.filter((item:ProductProps)=>item.name.toLowerCase().includes(searchText.toLowerCase()))
    setFilteredProducts(filtered);
  },[products,searchText]);

  const favoriteProduct = store((state)=>state.favoriteProduct);
  const cartProduct = store((state)=>state.cartProduct);

  return (
    <div className="w-full bg-whiteText md:sticky md:top-0 z-50"> {/** ヘッダー全体 */} 
      <div className="max-w-screen-xl mx-auto h-20 items-center justify-between flex px-4 gap-4 lg:px0 relative">
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo} className="w-44"/>
        </Link>
        {/* Searchbar */}
        <div className="hidden w-full max-w-3xl relative md:inline-flex">
          <input 
            type="text" 
            name="searchText"
            placeholder="SearchText...."
            onChange={(e)=>setSearchText(e.target.value)}
            value={searchText}
            className="w-full flex-1
                      text-gray-900
                      text-lg rounded-full                      
                      placeholder:test-base
                      placeholder:text-gray-300
                      placeholder:tracking-wide
                      placeholder:font-normal
                      ring-1 ring-inset ring-gray-300
                      focus:ring-2
                      focus:ring-darkText
                      sm:text-sm
                      px-4 py-2
                      bg-pink-50
                      "
            />
            {searchText ? (
              <IoClose
                onClick={()=>setSearchText("")}
                className="absolute top-2 right-4 text-lg hover:text-redText cursor-pointer duration-200"
              />
            ):(
              <IoSearchOutline 
                className="absolute top-2 right-4 text-xl"
              />
            )}
        </div>
        {/* Result of search */}
        {searchText && (
          <div className="absolute z-10 top-20 left-0 max-h-[500px] bg-whiteText border border-skyText mx-auto w-full overflow-y-scroll shadow-2xl">
            {_.isEmpty(filteredProducts) 
              ? <div className="font-semibold tracking-tight text-xl my-4 text-center">
                  <p>Nothing Matches with your search words</p>
                  <br /><p className="text-redText font-bold">{`(${searchText})`}</p>
                  <br /><p>Please Try another keyword</p>
                </div>
              : <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 my-4 mx-8">
                  {filteredProducts.map((item:ProductProps)=>(
                    <div>
                      <ProductCard item={item}/>
                    </div>
                  ))}
                </div>
            }
          </div>
        )}
        {/* Profile,Favorite,Cart */}
        <div className="flex items-center gap-x-4 text-2xl">
          <Link to="/profile" className="w-8 h-8 rounded-full">
            {currentUser ? (
              <img src={currentUser?.avatar} alt="" className="object-cover w-full h-full rounded-full"/>
            ):(
              <FiUser className="hover:text-skyText duration-200 cursor-pointer"/>
            )}
          </Link>
          <div className="relative block">
            <Link to="/favorite">
              <FiStar  className="hover:text-skyText duration-200 cursor-pointer" />
            </Link>
            <div className="absolute inline-flex items-center justify-center  -top-1 -right-2 text-whiteText bg-redText rounded-full text-center text-sm w-4 h-4">
              {favoriteProduct.length > 0 ? favoriteProduct.length : 0}
            </div>
          </div>
          <div className="relative">
            <Link to="/cart">
              <FiShoppingBag className="hover:text-skyText duration-200 cursor-pointer" />
            </Link>
            <div className="absolute inline-flex items-center justify-center  -top-1 -right-2 text-whiteText bg-redText rounded-full text-center text-sm w-4 h-4">
            {cartProduct.length > 0 ? cartProduct.length : 0}
            </div>
          </div>
        </div>
      </div>
        {/* MenuBar */}
      <div className="w-full text-whiteText bg-darkText">
      <Container className="flex flex-row items-center justify-between py-2 max-w-4xl">
      <Menu>
        <MenuButton as={Fragment}>
            <button
              onClick={()=>setOpen(!open)}
              className="inline-flex items-center gap-2 rounded-md border-gray-400 border hover:border-whiteText py-1.5 px-3 font-semibold text-gray-300 hover:text-whiteText"
            >
              Select Category<FaChevronDown className="ml-1"/>
            </button>
        </MenuButton>
        <Transition>
          <MenuItems 
            as="div" 
            anchor="bottom"
            className= 
            {clsx([
              // base-style
              "bg-black z-50 rounded-md text-sm origin-top transition ease-in-out",
              // Shared Closed Style(開閉アニメーションの初期値),
              "data-[close]:opacity-0",
              "data-[close]:scale-75",
              "data-[close]:origin-top",
              // Entering Style
              "data-[enter]:duration-300",
              "data-[enter]:scale-100",
              "data-[enter]:opacity-100",
              "data-[enter]:data-[closed]:scale-75",
              "data-[enter]:data-[closed]:opacity-0",
              // Leaving Style
              "data-[leave]:duration-300",
              "data-[leave]:scale-75",
              "data-[leave]:opacity-50",
              "data-[leave]:data-[closed]:scale-75",
              "data-[leave]:data-[closed]:opacity-0",
            ])}
          >
            {categories.map((item: CategoryProps)=>(
              <MenuItem key={item?._id}>
                <Link 
                  to={`/category/${item?._base}`} 
                  className="flex w-full text-whiteText gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/20 tracking-wide:"
                >
                  <img src={item?.image} alt="img" className="rounded-md w-6 h-6 mr-1"/>
                  <p className="tracking-tight">{item?.name}</p>
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
      {bottomNavigation.map((item)=>(
        <Link 
          to={item?.link} 
          key={item?.title}
          className={`
          relative hidden md:inline-block
          // テキスト自体のスタイル
          text-white 
          // 擬似要素共通スタイル
          after:content-[''] after:absolute after:bottom-0 after:left-0 
          after:border-b-1 after:border-white
          after:w-0 after:transition-all after:duration-300
          // ホバー時に横に伸ばす
          hover:after:w-full
        `}
        >
          {item?.title}
        </Link>
      ))}
      </Container>
      </div>
    </div>
  );
};

export default Header;
