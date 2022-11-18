import { useEffect, useState } from "react";
import { itemsInterface } from "../assets/interfaces";
import { fetchitems } from "../processes/fetchdata";
import {useNavigate} from 'react-router-dom'
import ProductsList from "./productlist";


const NewArrivals = () => {
    const[items, setitems] = useState<itemsInterface[]>([]);

    const navigate = useNavigate();

    // get data
    useEffect(()=>{
        const fetchdata = async()=>{
            setitems(await fetchitems());
            console.log(items);
        }
        fetchdata();
    },[])

    return (
        <div className="bg-white py-14 overflow-y-hidden md:w-9/12 m-auto">
            <div className="flex text-start flex-col">
                <p className="text-4xl font-sans font-bold text-slate-700">{'New Arrivals'}</p>
                <div className="pt-5 text-black">
                    <hr className="w w-1/12 bg-slate-400 pt-0.5"/>
                </div>
                <p className="w-10/12 md:w-full m-auto pt-5 text-slate-700">Lorem que vero dedipisicing elit. Doloremque vero delectus maxime sit culpa earum?</p>
            </div>


            {/* Map data from component */}
            <ProductsList items={items.slice(0,4)}/>
        </div>
    );
}
 
export default NewArrivals;