import {AiFillAccountBook,AiOutlineShoppingCart} from "react-icons/ai";
import { BsSearch} from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Cart from "../components/cart";
import { useEffect, useState } from "react";
import { fetchitems } from "../processes/fetchdata";
import { itemsInterface } from "./interfaces";
import { useMediaQuery } from 'react-responsive'
import {MdFilterList } from "react-icons/md";
import MenuL from "../components/menu";
import { createSearchParams, Link, useNavigate, useSearchParams } from "react-router-dom";

const Navbar = () => {
    // screens
    const isMobile = useMediaQuery({ query: '(max-width: 900px)' })

    // navigate
    const navigate = useNavigate();

    // data state
    const[itemsdata, setitems] = useState<itemsInterface[]>([]);

    //CART TOGGLER
    const closeCart = ()=>{
        setcart(false);
    }

    // get data from server
    useEffect(()=>{
        const fetchdata = async()=>{
            setitems(await fetchitems());
        }
        fetchdata();
    },[])

    //from redux[number of items on cart]
    const num_of_items = useSelector((state:RootState)=>state.counter.value);

    // toggle cart
    const [cart,setcart] = useState<boolean>(false);

    //menu handler
    const [menu,setmenu] = useState<boolean>(false);

    // search params
    const[searchParams,setSearchParams] = useSearchParams();

    // search
    const [criteria,setcriteria] = useState<string>('');
    const [filtered,setfiltered] = useState<itemsInterface[]>([]);
    const [search,setsearchsection] = useState<boolean>(false);
    const togglesearch =()=>{
        setsearchsection(false);
    }

    const handlefilter = (criteria:string) =>{
        setmenu(false);
        if (criteria != '') {
            setsearchsection(true)
            setcriteria(criteria);
            const temp:itemsInterface[] = itemsdata.filter((filt:itemsInterface)=> filt.name.toLowerCase().includes(criteria.toLowerCase()));
            
            setfiltered(temp);
        }
        else{
            setsearchsection(false)
        }
    }

    
    const handleSearch = () =>{
        if (criteria !== '') {
            // setSearchParams({product : criteria})
            navigate({
                pathname : '/allbags',
                search : createSearchParams({
                    find : criteria,
                }).toString(),
            });
        }
        else{
            navigate('/')
        }
    }

    return (
        <nav className="b bg-white w-full border-b-2 shadow-gray-300 z-100">
            {/* menu list component */}
            {menu && <MenuL/>}

            {/* cart component */}
            {cart && <Cart cartstat = {closeCart}/>}

            {/* navbar body */}
            <div className="w shadow-lg w-full flex justify-between items-center h-24 lg:h-28 fixed bg-slate-300 lg:bg-white border-1 border-solid border-zinc-400">
                {/* brand section */}
                <Link to={'/'} className="brand w-2/12 md:w-1/12 bg-slate-300 md:bg-slate-400 h-full flex justify-center items-center text-slate-800 hover:bg-slate-300 hover:cursor-pointer">
                    <AiFillAccountBook size={35}/>
                </Link>

                {/* Only show on small screens */}
                {isMobile &&
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setcriteria(e.target.value)} className="border-solid bg-slate-100  border-slate-300 border-2 h-12 text-xl flex items-center rounded-l-3xl rounded-r-3xl  pl-4 hover:border-slate-400 focus-visible:border-slate-400 focus-visible:outline-none" type="text" placeholder="Search..."/>}

                {/* middle section [Hide on small screens] */}
                {!isMobile &&
                <div className="middle w-10/12 flex flex-row items-center justify-center">
                    {/*text section*/}
                    <section className="flex flex-row">
                        <Link to = {'/'}  className={"px-4 font-bold text-gray-400" + (window.location.pathname === '/' ? ' t text-gray-800' : ' px-4 font-bold text-gray-400')}>HOME.</Link>
                        <Link to = {'/about'}  className={"px-4 font-bold text-gray-400" + (window.location.pathname === '/about' ? ' t text-gray-800' : ' px-4 font-bold text-gray-400')}>ABOUT.</Link>
                        <Link to = {`/allproducts/all`} className={"px-4 font-bold text-gray-400 " + (window.location.pathname === '/allproducts/all' ? ' text-gray-800' : 'px-4 font-bold text-gray-400')}>PRODUCTS.</Link>
                        <Link to = {'/blog'} className={"px-4 font-bold text-gray-400 " + window.location.pathname === '/blog' ? ' text-gray-800' : 'px-4 font-bold text-gray-400'}>BLOG.</Link>
                    </section>

                    {/* search */}
                    <section className="flex flex-row rounded-xl bg-slate-5 pl-4 h-12 text-slate-700">
                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => handlefilter(e.target.value)} className="border-solid  border-slate-300 border-2 h-full text-xl flex items-center rounded-l-3xl pl-4 hover:border-slate-400 focus-visible:border-slate-400 focus-visible:outline-none" type="text" placeholder="Search..."/>
                        <div onClick={()=> handleSearch()}  className="search-icon h-full flex justify-center items-center bg-slate-200 px-4 rounded-r-3xl text-slate-800 font-bold border-solid border-slate-300 border-2 hover:cursor-pointer">
                            <BsSearch size={22}/>
                        </div>
                    </section>
                </div>}

                {/* cart section [for large screens]*/}
                {!isMobile &&
                <div onClick={()=> cart? setcart(false) : setcart(true)} className="cart w-2/12 md:w-1/12 bg-slate-400 h-full flex justify-center items-center text-slate-800 hover:cursor-pointer hover:bg-slate-300">
                    <AiOutlineShoppingCart size={35}/>
                    {num_of_items !== 0 && <p className="t text 2xl font-semibold">{num_of_items}</p>}
                </div>}

                {/* Hamburger [for small screens] */}
                {isMobile &&
                <div className="flex flex-row items-center h-full pr-2">
                    {/* cart */}
                    <div onClick={()=> cart? setcart(false) : setcart(true)} className="cart w-2:w-1/12 h-full flex justify-center items-center text-slate-700 pr-2 hover:cursor-pointer hover:bg-slate-300">
                        <AiOutlineShoppingCart size={25}/>
                        <p className="t text 2xl font-semibold">{num_of_items}</p>
                    </div>


                    {/* hamburger */}
                    <div onClick={()=> menu ? setmenu(false) : setmenu(true)} className=" bg-slate-400 p-2 rounded md:bg-slate-400 h-8/12 flex justify-center items-center text-slate-800 hover:cursor-pointer hover:bg-slate-300">
                        <MdFilterList size={30}/>
                    </div>
                </div>
                }
            </div>
        </nav>
    );
}
 
export default Navbar;