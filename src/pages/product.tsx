import { useState,useEffect } from 'react';
import bag2 from '../Accessories/bag2.png'
import { itemsInterface } from '../assets/interfaces';
import {GrAdd,GrSubtract} from "react-icons/gr";
import {IoIosArrowBack} from "react-icons/io";
import { BsCart } from 'react-icons/bs';
import {useNavigate,useParams,Link} from 'react-router-dom'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import {SET_AMOUNT, TO_CART } from '../features/counter/counterSlice';
import { RootState } from "../app/store";
import Cart from '../components/cart';


const Product = () => {
    const [cart,setcart] = useState<boolean>(false);

    const closeCart = ()=>{
        setcart(false);
    }
    const num_of_items = useSelector((state:RootState)=>state.counter.value)

    const navigate = useNavigate();
    const [item,setitems] = useState<itemsInterface[]>([]);
    const{id} = useParams();
    const dispatch = useDispatch()     

    // get data
        useEffect(()=>{            
        const fetchdata = async()=>{
            const res = await axios.get(`http://localhost:3001/items/${id}`);
            setitems([res.data]);
            setamount(res.data.price);
        }
        fetchdata()
    },[])


    // const[price,setprice] = useState<number>(item[0].price)
    let count:number = 1;
    let[counter,setcounter] = useState<number>(1);
    let[amount,setamount] = useState<number>(0);

    
    const calcAmount=(price:number ,increase:boolean)=>{
        if (increase === true) {
            count = counter + 1
            setcounter(counter+1);
            setamount(price * count)
       }
       else{
            setcounter(counter-1)
            count = counter - 1;
            setamount(amount - price)
       }
    }
    
    return (
        <div className="w-screen h-screen">
            {cart && <Cart cartstat = {closeCart}/>}

            {item.map((itemS)=>{
            return(
            <div className="pb-10 md:pb-0 content w-full md:h-screen  flex flex-col-reverse md:flex-row">
                <div className="img mt-11 h-60 md:mt-0 w-10/12 m-auto md:w-1/2 md:h-full bg-slate-300 flex justify-center rounded-r-3xl">
                    <div className="flex items-center justify-center w-full m-auto h-full">
                        <img className='w-full h-full rounded-lg md:rounded-none' src= {itemS.url} alt="image" />
                    </div>
                </div>

                <div className="other w-10/12 m-auto md:w-1/2 pt-10 md:pt-0">
                    <div className="flex flex-col justify-center text-start h-full md:w-4/5 m-auto">
                        <div className="flex flex-row justify-between pb-8">
                            <p onClick={()=> navigate(-1)} className='text-2xl text-gray-500 flex flex-row justify-center items-center hover:cursor-pointer hover:text-gray-800'><span><IoIosArrowBack/></span>Back</p>
                            <div onClick={()=> cart? setcart(false) : setcart(true)} className="flex flex-row items-center justify-center hover:cursor-pointer">
                                <BsCart size={30} color = {'grey'}/>
                                {num_of_items !== 0 && <p className="t text 2xl font-bold text-green-800">{num_of_items}</p>}
                            </div>
                        </div>

                        <p className='text-5xl font-bold italic text-slate-800'>{itemS.name}</p>
                        <p className='text-xl text-green-700 font-semibold pt-4'>$ {itemS.price}</p>
                        <p className='pt-4 text-xl text-slate-600'>{itemS.description}</p>
                        <p className='pt-2 pb-4 font-bold text-lg text-slate-700 italic'>{'[ '+itemS.category +' ]'}</p>

                        <hr className=''/>

                        <div className="flex flex-row justify-center pt-5 items-center text-gray-600">
                            <section onClick={()=>{calcAmount(itemS.price,true)}} className='p-4 bg-slate-200 rounded hover:cursor-pointer hover:opacity-75'><GrAdd size={20}/></section>
                            <section className='p px-5 text-3xl'>{counter}</section>
                            <section onClick={()=>{calcAmount(itemS.price,false)}} className='p-4 bg-slate-200 rounded hover:cursor-pointer hover:opacity-75'><GrSubtract size={20}/></section>
                        </div>

                        <div className="flex flex-row justify-center items-center pt-7">
                            <p className='w-1/2 md:text-2xl text-lg text-slate-800'>Amount : <span className='t text-slate-500'>${amount}</span></p>
                            <button
                                onClick={()=> {dispatch(TO_CART((item)));
                                dispatch(SET_AMOUNT(amount));
                            }
                            } className='w-1/2 flex flex-row items-center justify-center text-xl font-semibold text-green-900 bg-green-200 py-3 rounded hover:bg-green-100'><BsCart/> Add to cart</button>
                        </div>
                    </div>
                      
                </div>
            </div>
            )
        })}
        </div>
    );
}
 
export default Product;