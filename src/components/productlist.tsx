import { useNavigate } from "react-router-dom";
import { itemsInterface } from "../assets/interfaces";
import {useState} from 'react';

interface Props{
    items : itemsInterface[]
}

const ProductsList = ({items}: Props) => {
    //navigate
    const navigate = useNavigate();

    return (
        <div className="md:w-full w-10/12 m-auto new-items flex flex-col flex-wrap md:flex-row justify-between pt-10">
            {items.map((item:itemsInterface)=>{
                return(
                    <div key={item.id} onClick={()=> {navigate(`/product/${item.id}`)}} className="item-card ccwidth hover:cursor-pointer shadow-lg hover:shadow-2xl rounded-b-xl mb-14">
                        <div className="h h-48 bg-slate-200 rounded-t-xl">
                            <img className="rounded-t-xl w-full h-full" src= {item.url} alt="item image here" />
                        </div>

                        <div className="t text-left pt-5 pb-12 px-4 rounded-b-xl">
                            <p className="text-xl font-semibold text-slate-800">{item.name}</p>
                            <p className="text-lg text-gray-500 pt-2">{item.category}</p>

                            <div className="">
                                <p className="text-lg text-gray-500 pt-2">{item.material} material</p>
                                <p className="text-lg text-gray-500 pt-2">{item.type} bag</p>
                            </div>

                            <p className="text-2xl text-green-600 pt-5 font-bold font-mono">$ {item.price}</p>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    );
}
 
export default ProductsList;