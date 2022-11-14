import { useEffect, useState } from "react";
import { itemsInterface } from "../assets/interfaces";
import {useNavigate, useParams,Link} from 'react-router-dom'
import { IoIosClose } from "react-icons/io";
import Navbar from "../assets/navbar";
import axios from 'axios';
import {IoIosArrowBack} from "react-icons/io";

const Category = () => {
    // navigate state
    const navigate = useNavigate();

    // filtered state
    const [filtered,setfiltered] = useState<itemsInterface[]>([]);

    // search criteria from param
    const{category} = useParams();

    // get search data
    useEffect(()=>{
        const fetchdata = async() =>{
            // fetching all items
            const res = await axios.get('http://localhost:3001/items');

            //filter by search criteria from param
            setfiltered(res.data.filter((filt:itemsInterface)=> filt.category === category));
        }
        //invoke function
        fetchdata();
    },[])


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
                    <p className="text-4xl font-sans font-semibold italic text-slate-700">{category} bags</p>

                    <Link to={'/categories'} className="b bg-gray-100 rounded-full shadow-xl hover:cursor-pointer hover:bg-gray-200">
                        <IoIosClose className="c text-gray-700" color={"grey"} size={60}/>
                    </Link> 
                </div>
                

                <div className="md:w-full w-full m-auto new-items flex flex-col flex-wrap md:flex-row justify-between pt-10">
                    {filtered && filtered.map((item)=>{
                        return(
                            <div onClick={()=> {navigate(`/product/${item.id}`)}} className="item-card cwidth hover:cursor-pointer shadow-lg hover:shadow-2xl rounded-b-xl mb-6">
                                <div className="h h-48 bg-slate-200 rounded-t-xl">
                                    <img className="rounded-t-xl w-full h-full" src= {item.url} alt="item image here" />
                                </div>

                                <div className="t text-left pt-7 pb-12 px-4 rounded-b-xl">
                                    <p className="text-2xl text-slate-800">{item.name}</p>
                                    <p className="text-lg text-gray-500 pt-2">{item.category}</p>
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