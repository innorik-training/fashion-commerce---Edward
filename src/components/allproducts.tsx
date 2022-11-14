import { useEffect, useState } from "react";
import { itemsInterface } from "../assets/interfaces";
import { fetchitems } from "../processes/fetchdata";
import {useNavigate} from 'react-router-dom';


const Allproducts = () => {
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
        <div className="bg-white w-full pb-14 overflow-y-hidden md:w-9/12 m-auto">
            <p className="italic text-xl font-semibold text-slate-600 pb-2 ">eddys</p>
            <p className="text-4xl font-sans font-bold text-slate-700">ALL PRODUCTS</p>
            <div className="pt-5 text-black">
                <hr className="w w-1/12 m-auto bg-slate-400 pt-0.5"/>
            </div>
            <p className="md:w-7/12 w-10/12 m-auto pt-5 text-slate-700">Lorem que vero dedipisicing elit. Doloremque vero delectus maxime sit culpa earum?</p>

            <div className="md:w-full w-10/12 m-auto new-items flex flex-col flex-wrap md:flex-row justify-between pt-10">
                {items.map((item)=>{
                    return(
                        <div onClick={()=> {navigate(`product/${item.id}`);console.log(item.key);}} className="item-card cwidth hover:cursor-pointer shadow-lg hover:shadow-2xl rounded-b-xl mb-14">
                            <div className="h h-64 bg-slate-200 rounded-t-xl">
                                <img className="rounded-t-xl w-full h-full" src= {item.url} alt="item image here" />
                            </div>

                            <div className="t text-left pt-12 pb-12 px-4 rounded-b-xl">
                                <p className="text-2xl text-slate-800">{item.name}</p>
                                <p className="text-lg text-gray-500 pt-2">{item.category}</p>
                                <p className="text-2xl text-green-600 pt-5 font-bold font-mono">$ {item.price}</p>
                                {/* <div className="btns pt-7">
                                    <button className="px-8 py-4 border-solid border-2 border-gray-400 text-xl font-bold italic rounded text-gray-700 hover:border-gray-300">View</button>
                                </div> */}
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}
 
export default Allproducts;