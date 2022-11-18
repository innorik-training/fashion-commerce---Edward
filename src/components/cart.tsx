import { Link } from "react-router-dom";
import {AiFillAccountBook,AiOutlineDelete,AiOutlineShoppingCart} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { IoIosClose } from "react-icons/io";
import { REMOVE_CART } from "../features/counter/counterSlice";
import { useEffect, useState } from "react";
import svg from '../Accessories/empty.svg';
import { itemsInterface } from "../assets/interfaces";

interface funcinterface{
    cartstat : () => void;
}


const Cart = ({cartstat}:funcinterface) => {
    //from redux
    const dispatch = useDispatch();
    const num_of_items:number = useSelector((state:RootState)=>state.counter.value);
    const items:itemsInterface[] = useSelector((state:RootState)=>state.counter.items);
    
    // setempty state
    const[empty,setempty] = useState(false);
    useEffect(() =>{
        items.length === 0 ? setempty(true) : setempty(false);
    })

    const[r,setr] = useState(2)
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0  md:top-5 md:bottom-5 m-auto md:right-1/4 md:left-1/4 shadow-2xl bg-white overflow-x-hidden rounded-xl z-20">
            <div className="px-10 py-7">
                <div className="flex flex-row justify-between items-center">
                    <div className="">
                        <h1 className="text-5xl font-mono font-bold italic text-slate-700">Cart</h1>
                    </div>
                    
                    <div onClick={()=> cartstat()} className="h hover:cursor-pointer hover:text-slate-700 ">
                        <IoIosClose size={80} color = {'grey'}/>
                    </div>
                </div>

                {/* empty */}
                {empty && <div className="f h-96 flex items-center flex-col">
                    <p className="py-14 text-3xl text-gray-600">Items added to cart appear here</p>
                    <div className="h-full">
                        <img className="h-4/6 " src= {svg} alt=""/>
                    </div>
                </div>}

                <div className="">
                    {items && items.map((item:any)=>{
                        return(
                            <div className="flex flex-row mt-6 rounded-lg h-40">
                                <div className="w-2/6 h-36 md:h-50 rounded">
                                    <img className="h-full w-11/12 rounded" src= {item[0].url} alt=""  />
                                </div>

                                <div className="w-4/6 text-start flex flex-col justify-center">
                                    <p className="md:text-xl text-lg pb-2 md:font-semibold text-gray-600">{item[0].name}</p>
                                  
                                    <div className="flex flex-row items-center justify-between pt-2">
                                        <p className="t text-sm text-green-700 font-bold italic pr-1"> $ {item[0].price}</p>
                                        <button onClick={()=>{dispatch(REMOVE_CART(item))
                                        }}  className='flex flex-row items-center justify-center text-lg font-bold text-red-900 bg-red-200 py-1 px-3 rounded hover:bg-red-100'><AiOutlineDelete/> Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {!empty && <div className="mt-10">
                    <button  className='w-3/5 flex flex-row items-center justify-center text-xl font-semibold bg-green-400 text-green-900  py-2 rounded'>Checkout {num_of_items} item(s)</button>
                </div>}
            </div>
        </div>
    );
}
 
export default Cart;