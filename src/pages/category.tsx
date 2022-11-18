import { useEffect, useState } from "react";
import { itemsInterface } from "../assets/interfaces";
import {useNavigate, useParams,Link} from 'react-router-dom'
import { IoIosClose } from "react-icons/io";
import Navbar from "../assets/navbar";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { GrSort } from "react-icons/gr";

const Category = () => {
    const [data,setdata] = useState<itemsInterface[]>([]);

    // navigate state
    const navigate = useNavigate();

    // filtered state
    const [filtered,setfiltered] = useState<itemsInterface[]>([]);

    // search criteria from param
    const{category} = useParams();

    // get  data
    useEffect(()=>{
        const fetchdata = async() =>{
            // fetching all items
            const res = await axios.get('http://localhost:3001/items');

            //filter by search criteria from param
            setfiltered(res.data.filter((filt:itemsInterface)=> filt.category === category));
            setdata(res.data.filter((filt:itemsInterface)=> filt.category === category));
        }
        //invoke function
        fetchdata();
    },[])

    //filter criterias [regulate what to filter on]
    const [filterbyprice,setfilterbyprice] = useState<boolean>(false);
    const[categorystate, setcategory] = useState<string>('all');

    //filter state
    const [filterstate,setfilterstate] = useState<boolean>(false);

    //filter input states
    const [minfilterprice,setminfilterprice] = useState<any>(1);
    const [maxfilterprice,setmaxfilterprice] = useState<any>(999);

    //handle categories and price filter
    const handlefilter = async(category:string = categorystate,pricefilter :boolean = filterbyprice) =>{
        // set filter toggler state to false if true
        setfilterstate(false);

        if (category !== 'all') {
            // set category state
            setcategory(category!);

            //filter by search criteria from param
            if (!pricefilter) {
                setfiltered(data.filter((filt:itemsInterface)=> filt.category === category));
            }
            else{
                //setfilter by price state
                setfilterbyprice(true);

                setfiltered(data.filter((filt:itemsInterface)=> (filt.category === category) && (filt.price > minfilterprice && filt.price < maxfilterprice)));
            }
        }
        else{
            if (!pricefilter) {
                setfiltered(data);
            }
            else{
                //setfilter by price state
                setfilterbyprice(true);

                setfiltered(data.filter((filt:itemsInterface)=>filt.price > minfilterprice && filt.price < maxfilterprice));
            }
        }
    }

    // check for scroll and disable filter mode
    window.addEventListener('scroll', () => { 
        if (filterstate === true) {
            setfilterstate(false)
        }
    });
    

    return (
        <div className="">
            {/* NAVBAR */}
            <Navbar/>

            {/* CONTENT */}
            <div className="bg-white w-10/12 pb-14 overflow-y-hidden md:w-9/12 m-auto pt-40">
                {/* <div className="flex flex-start pb-4">
                    <Link to={'/categories'}  className='text-2xl text-gray-500 flex flex-row justify-center items-center hover:cursor-pointer hover:text-gray-800'><span><IoIosArrowBack/></span>Back</Link>
                </div> */}

                <div className="flex flex-start items-center justify-between">
                    <p className="text-4xl font-sans font-semibold italic text-slate-700">{category} collection</p>

                    <div className="clex flex col">
                            <button onClick={()=> filterstate === true ? setfilterstate(false) : setfilterstate(true)} className="b bg-gray-100 rounded-full shadow-xl p-5 hover:cursor-pointer hover:bg-gray-200">
                                <GrSort className="c text-gray-700" color={"grey"} size={30}/>
                            </button>
                            {filterbyprice && <p className="t font-bold pl-1 text-red-500 text-lg">1</p>}
                        </div> 
                </div>
                
                {/* filter div */}
                {filterstate && <div className="fixed top-72 right-24 bg-white shadow-2xl rounded">
                        {/* by price section */}
                        <section className="py-6 px-7 text-start">
                            <form action="">
                                <div className="flex flex-row justify-between items-center">
                                    <p  className="text-lg font-semibold">By price</p>
                                    <p onClick={()=> {handlefilter(categorystate,false); setfilterbyprice(false)}} className="t text-green-800 hover:underline hover:cursor-pointer">reset</p>
                                </div>

                                {/* input fields */}
                                <div className="flex flex-row mt-4">
                                    <input defaultValue={minfilterprice} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setminfilterprice(e.target.value)} className="w-20 pl-2 py-2 border-solid border-2 rounded border-slate-300" type="number" placeholder="min"/>
                                    <input defaultValue={maxfilterprice} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setmaxfilterprice(e.target.value)} className="w w-20 ml-2 pl-2 py-2 border-solid border-2 rounded border-slate-300" type="number" placeholder="max"/>
                                </div>

                                {/* apply filter button */}
                                <button 
                                    onClick={(e)=> {e.preventDefault();
                                    handlefilter(categorystate,true);
                                }} className=" w w-full mt-5 text-lg bg-slate-300 px-3 py-2 font-bold text-slate-700 rounded">Apply</button>
                            </form>
                        </section>
                    </div>}

                <div className="md:w-full w-full m-auto new-items flex flex-col flex-wrap md:flex-row justify-between pt-10">
                    {filtered && filtered.map((item)=>{
                        return(
                            <div key={item.id} onClick={()=> {navigate(`/product/${item.id}`)}} className="item-card ccwidth hover:cursor-pointer shadow-lg hover:shadow-2xl rounded-b-xl mb-14">
                                <div className="h h-48 bg-slate-200 rounded-t-xl">
                                    <img className="rounded-t-xl w-full h-full" src= {item.url} alt="item image here" />
                                </div>

                                <div className="t text-left pt-5 pb-12 px-4 rounded-b-xl">
                                    <p className="text-xl font-semibold text-slate-800">{item.name}</p>
                                    <p className="text-lg text-gray-500 pt-2">{item.category}</p>
                                    <p className="text-2xl text-green-600 pt-5 font-bold font-mono">$ {item.price}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
 
export default Category;