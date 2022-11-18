import { useEffect, useState } from "react";
import { itemsInterface } from "../assets/interfaces";
import {useNavigate, Link, useSearchParams} from 'react-router-dom'
import { IoIosClose } from "react-icons/io";
import svg from '../Accessories/noresults.svg';
import Navbar from "../assets/navbar";
import axios from 'axios'

const SearchResults = () => {
    // navigate state
    const navigate = useNavigate();

    // filtered state
    const [filtered,setfiltered] = useState<itemsInterface[]>([]);

    //retrieving search data from search params
    const [searchParams,setSearchParams] = useSearchParams();
    const search_for = searchParams.get('find');
    

    // get search data
    useEffect(()=>{        
        const fetchdata = async() =>{
            // fetching all items
            const res = await axios.get('http://localhost:3001/items');

            //filter by search criteria from param
            setfiltered(res.data.filter((filt:itemsInterface)=> filt.name.toLowerCase().includes(search_for!.toLowerCase())));
        }
        //invoke function
        fetchdata();
    },[search_for])

    return (
        <div className="h-screen">
            {/* Navbar */}
            <Navbar/>

            {/* main container */}
            <div className="pt-24 md:pt-28 h-full border-t-stone-100 overflow-y-scroll overflow-x-hidden border-2 border-solid left-0 right-0 bg-white shadow-2xl">
                <div className="w-10/12 m-auto pt-7 h-f">
                    {/* top section */}
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-3xl font-mono italic font-bold">Results for <span className="t text-green-700">{search_for}</span></p>

                        <Link to={'/'} className="b bg-gray-100 rounded-full shadow-xl hover:cursor-pointer hover:bg-gray-200">
                            <IoIosClose className="c text-gray-700" color={"grey"} size={60}/>
                        </Link> 
                    </div>

                    {/* no results */}
                    {filtered && filtered.length === 0  && <div className="flex flex-col md:flex-row justify-between h-full pt-8 md:pt-0">
                        <section className="w-full md:w-1/2 flex justify-start items-center pb-20 text-4xl font-semibold text-gray-600">
                            <p>Oops...no product matched that</p>
                        </section>

                        <section className="image w-full md:w-1/2">
                            <img className="h-4/5" src= {svg} alt="image here" />
                        </section>
                    </div>}

                    {/* no results */}
                    {filtered && filtered.length === 0  && <div className="flex flex-col md:flex-row justify-between h-full pt-8 md:pt-0">
                        <section className="w-full md:w-1/2 flex justify-start items-center pb-20 text-4xl font-semibold text-gray-600">
                            <p>Oops...no product matched that filter</p>
                        </section>

                        <section className="image w-full md:w-1/2">
                            <img className="h-4/5" src= {svg} alt="image here" />
                        </section>
                    </div>}

                    {/* search results */}
                    <div className="new-items flex flex-wrap flex-row justify-between pt-6">
                        {filtered && filtered.map((item)=>{
                            console.log(filtered);
                            
                            return(
                                <div onClick={()=> {navigate(`/product/${item.id}`);console.log(item.key);}} className="item-card flex flex-row items-center justify-center cwidth hover:cursor-pointer hover:shadow-2xl rounded-xl mb-10">
                                    <div className="w-5/12 h-32 bg-slate-200 rounded-lg">
                                        <img className="rounded-l-lg w-full h-full" src= {item.url} alt="item image here" />
                                    </div>

                                    <div className="t w-7/12 text-left px-4 rounded-lg">
                                        <p className="text-lg text-slate-800">{item.name}</p>
                                        <p className="text-lg text-green-600 font-bold italic font-mono">$ {item.price}</p>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SearchResults;