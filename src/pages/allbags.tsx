import { useEffect, useState } from "react";
import { itemsInterface } from "../assets/interfaces";
import {useNavigate, Link, useSearchParams, useParams,createSearchParams} from 'react-router-dom'
import Navbar from "../assets/navbar";
import axios from 'axios'
import { GrSort } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { SET_FILTER } from "../features/counter/filterSlice";
import svg from '../Accessories/noresults.svg';
import ProductsList from "../components/productlist";
import FilterContainer from "../components/filterContainer";
import { Pagination } from "@mui/material";
import Footer from "../components/footer";


const SearchResults = () => {
    // initializing search params
    const[searchParams,SetSearchParams] = useSearchParams();
    if (searchParams.get('car')) {
        alert('yo')
    }

    //filter input fields states
    const [minprice,minsetprice] = useState<any>(0);
    const [maxprice,maxsetprice] = useState<any>(0);
    const [material,setmaterial] = useState<string>('all');
    const [type,settype] = useState<string>('all');

    // for redux dispatch
    const dispatch = useDispatch();

    // redux store data
    const storedata:itemsInterface[] = useSelector((state:RootState)=>state.filter.filtered_items);

    // current category applying
    const[categorystate, setcategory] = useState<string>('all');

    // navigate state
    const navigate = useNavigate();

    // filtered state
    const [data,setdata] = useState<itemsInterface[]>([]);
    const [dataBackup,setdataBackup] = useState<itemsInterface[]>([]);


    //retrieving search data from search params
    const {category} = useParams<string>();
    
    //filter state
    const [filterstate,setfilterstate] = useState<boolean>(false);
    
    // for use effect refresh
    let [refresh,setrefresh] = useState<number>(1);


    //filter input states
    const [minfilterprice,setminfilterprice] = useState<any>(1);
    const [maxfilterprice,setmaxfilterprice] = useState<any>(999);

    // get search data
    useEffect(()=>{
        const fetchdata = async() =>{
            // fetching all items
            const res = await axios.get('http://localhost:3001/items');
            setdataBackup(res.data);
            console.log(res.data.length);
            
            dispatch(SET_FILTER(res.data));
            handlefilter(res.data);
        }
        //invoke functions
        fetchdata();

        // filter
    },[category,refresh])

    // for pagination
    const [productsPerPage] = useState<number>(8);
    const [index,setindex] = useState<number>(1);
    const pagination_numbers = Math.ceil(data.length/productsPerPage)

    
    // const currentProducts = data.slice(indexOfFirstPost,indexOfLastProducts);

    //handle categories,material, type and price filter
    const handlefilter = async(data:itemsInterface[],pricefilter :boolean = true) =>{
        // set filter toggler state to false if true
        setfilterstate(false);

        if (category !== 'all') {
            // set category state
            setcategory(category!);

            //applyfilter is on
            if (searchParams.get('applyfilter')) {
                // call function to handle filter
                // values of price range
                const min:any = searchParams.get('minprice')
                const max:any = searchParams.get('maxprice')

                // logic to check what to filter for
                if (searchParams.get('material') != 'all') {
                    const material = searchParams.get('material');

                    if(searchParams.get('type') != 'all') {
                        let type = searchParams.get('type');

                        // filter by material, type, category and price
                        setdata(data.filter((filt:itemsInterface)=> (filt.category === category) && (filt.price > min && filt.price < max) && (filt.type === type) && (filt.material === material)));                   
                    }
                    else{
                        // filter without type
                        setdata(data.filter((filt:itemsInterface)=> (filt.category === category) && (filt.price > min && filt.price < max) && (filt.material === material)));                   
                    }
                }
                else if(searchParams.get('type') != 'all') {
                    let type = searchParams.get('type');

                    // filter by type, category and price
                    setdata(data.filter((filt:itemsInterface)=> (filt.category === category) && (filt.price > min && filt.price < max) && (filt.type === type)));                   
                }
                else{
                    // filter by category and price only
                    setdata(data.filter((filt:itemsInterface)=> (filt.category === category) && (filt.price > min && filt.price < max)));                   
                }
            }
            else{
                // apply filter for category only
                setdata(data.filter((filt:itemsInterface)=> filt.category === category));
            }
        }


        // category of all [exclude category filter]
        else{
            if (searchParams.get('applyfilter')) {
                // call function to handle filter
                // values of price range
                const min:any = searchParams.get('minprice')
                const max:any = searchParams.get('maxprice')

                // logic to check what to filter for
                if (searchParams.get('material') != 'all') {
                    const material = searchParams.get('material');

                    if(searchParams.get('type') != 'all') {
                        let type = searchParams.get('type');

                        // filter by material, type, category and price
                        setdata(data.filter((filt:itemsInterface)=>(filt.price > min && filt.price < max) && (filt.type === type) && (filt.material === material)));                   
                    }
                    else{
                        // filter without type
                        setdata(data.filter((filt:itemsInterface)=>(filt.price > min && filt.price < max) && (filt.material === material)));                   
                    }
                }
                else if(searchParams.get('type') != 'all') {
                    let type = searchParams.get('type');

                    // filter by type, category and price
                    setdata(data.filter((filt:itemsInterface)=>(filt.price > min && filt.price < max) && (filt.type === type)));                   
                }
                else{
                    // filter by category and price only
                    setdata(data.filter((filt:itemsInterface)=>(filt.price > min && filt.price < max)));                   
                }
            }
            else{
                // no category ilter and no params filter
                setdata(data);
            }
        }
    }

    // handle filter[set filter to parameter]
    const filter_onclick = (target = category,min = minprice, max = maxprice , mat = material, typ = type) =>{
        // set the states on this component
        minsetprice(min);
        maxsetprice(max);
        setmaterial(mat);
        settype(typ);

        // set to refresh usestate and re-filter data
        setrefresh(refresh + 10)
        navigate({
            pathname : `/allproducts/${target}`,
            search : createSearchParams({
                applyfilter : 'true',
                minprice : min,
                maxprice : max,
                material : mat,
                type : typ
            }).toString(),
        });
    }

    // check for scroll and disable filter mode
    window.addEventListener('scroll', () => { 
        if (filterstate === true) {
            setfilterstate(false)
        }
    });
    

    return (
        <div className="h-screen">
            {/* Navbar */}
            <Navbar/>

            {/* main container */}
            <div className="pt-24 md:pt-32 h-full bg-white pb-6">
                <div className="w-10/12 m-auto pt-7 h-f pb-8">
                    {/* top section */}
                    <div className="flex flex-row justify-between items-center ">
                        <div className=" ">
                            <section className="flex flex-row items-center mb-6">
                                <p className="text-xl text-gray-600">Category  |</p>
                                <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> !searchParams.get('applyfilter') ? navigate(`/allproducts/${e.target.value}`) :filter_onclick(e.target.value)} className="text-xl cursor-pointer font-semibold hover:bg-whiterounded pl-2 focus-visible:outline-none text-slate-600" name="all categories" id="">
                                    <option className="t text-base text-gray-600" value="all">Change</option>
                                    <option className="t text-base text-gray-600" value="all">All</option>
                                    <option className="t text-base text-gray-600" value="men">Men only</option>
                                    <option className="t text-base text-gray-600" value="women">Women only</option>
                                    <option className="t text-base text-gray-600" value="kids">kids</option>
                                </select>
                            </section>

                            <p className="text-4xl pt-3 text-start font-sans font-bold text-slate-700">{category == 'all' ? 'All Products' : category + "'s collection"}</p>
                        </div>

                        <div className="clex flex col">
                            <button onClick={()=> filterstate === true ? setfilterstate(false) : setfilterstate(true)} className="b bg-gray-100 rounded-full shadow-xl p-5 hover:cursor-pointer hover:bg-gray-200">
                                <GrSort className="c text-gray-700" color={"grey"} size={30}/>
                            </button>

                            {/* {filterbyprice && <p className="t font-bold pl-1 text-red-500 text-lg">1</p>} */}
                        </div>
                    </div>

                    {/* no results */}
                    {data && data.length === 0  && <div className="flex flex-col md:flex-row justify-between h-full pt-8 md:pt-0">
                        <section className="w-full md:w-1/2 flex justify-start items-center pb-20 text-4xl font-semibold text-gray-600">
                            <p>Oops...no product matched that filter</p>
                        </section>

                        <section className="image w-full md:w-1/2">
                            <img className="h-4/5" src= {svg} alt="image here" />
                        </section>
                    </div>}

                    {/* filter div */}
                    {filterstate && <FilterContainer filter_onclick={filter_onclick} category = {category!}/>}

                    {/* displaying map results */}
                    {<ProductsList items={data.slice((index-1) * productsPerPage,(index * productsPerPage))}/>}

                    {/* Pagination */}
                    <Pagination size="large" count={pagination_numbers} shape="rounded" onChange ={(e,value)=> setindex(value)}/>

                    {/* footer */}
                    <Footer/>
                </div>
            </div>

            
        </div>
    );
}
 
export default SearchResults;