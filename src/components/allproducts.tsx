import { useEffect, useState } from "react";
import { itemsInterface } from "../assets/interfaces";
import { fetchitems } from "../processes/fetchdata";
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom'
import ProductsList from "./productlist";


const Allproducts = () => {
    const[items, setitems] = useState<itemsInterface[]>([]);
    const[itemsbackup, setitemsbackup] = useState<itemsInterface[]>([]);
    const[category, setcategory] = useState<string>('all');

    const navigate = useNavigate();

    // get data
    useEffect(()=>{
        const fetchdata = async()=>{
            setitems(await fetchitems());
            setitemsbackup(await fetchitems());
            console.log(items);
        }
        fetchdata();
    },[])

    //categories section
    const handlefilter = (e:string) =>{        
        if (e !== 'all') {
            //set state
            setcategory(e);

            //filter by search criteria from param
            setitems(itemsbackup.filter((filt:itemsInterface)=> filt.category === e));
        }
        else{
            setitems(itemsbackup);
        }
    }

    return (
        <div className="w-full">
            <div className="bg-white w-full pb-14 overflow-y-hidden md:w-9/12 m-auto">
                <div className="flex text-start flex-col">
                    <section className="flex flex-row items-center mb-6">
                        <p className="text-xl text-gray-600">Category  |</p>
                        <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> handlefilter(e.target.value)} className="text-xl cursor-pointer font-semibold hover:bg-whiterounded pl-2 focus-visible:outline-none text-slate-600" name="all categories" id="">
                            <option className="t text-base" value="all">all</option>
                            <option className="t text-base" value="men">Men only</option>
                            <option className="t text-base" value="women">Women only</option>
                            <option className="t text-base" value="kids">kids</option>
                        </select>
                    </section>

                    {/* <Link to={''} className="italic text-2xl font-semibold text-slate-600 pb-6 flex flex-row items-center">all categories <IoMdArrowDropdown size={35}/></Link> */}
                    <p className="text-4xl font-sans font-bold text-slate-700">{category == 'all' ? 'All Products' : category + "'s Collection"}</p>
                    <div className="pt-5 text-black">
                        <hr className="w w-1/12 bg-slate-400 pt-0.5"/>
                    </div>
                    <p className="w-10/12 md:w-full m-auto pt-5 text-slate-700">Lorem que vero dedipisicing elit. Doloremque vero delectus maxime sit culpa earum?</p>
                </div>

                {/* map data from product list component */}
                <ProductsList items={items.slice(0,8)}/>

                <div className="flex flex-start mt-2">
                    <Link className="px-4 py-5 border-solid border-slate-300 bg-slate-200 text-xl font-bold text-slate-800 rounded" to={`/allproducts/${category}`}>More Products</Link>
                </div>
            </div>
        </div>
    );
}
 
export default Allproducts;