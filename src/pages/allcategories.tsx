import { useState,useEffect } from 'react';
import svg from '../Accessories/cat1.svg';
import svg2 from '../Accessories/cat2.svg';
import svg3 from '../Accessories/cat3.svg';
import {useNavigate,useParams,Link} from 'react-router-dom'
import Navbar from '../assets/navbar';


const Allcategories = () => {
    interface categories {
        id : number,
        name : string,
        description : string,
        link : string,
        svg : any
    }
    const [all_categories_data,set_all_categories_data] = useState<categories[]>([
        {
            id: 0,
            name: "Men's colection",
            description : 'Explore a collection of luxury bags on the store',
            link : `men`,
            svg : svg
        },
        {
            id: 1,
            name: "Women's colection",
            description : 'Explore a collection of casual bags on the store',
            link : 'women',
            svg : svg2
        },
        {
            id: 2,
            name: "Kid's colection",
            description : 'Explore a collection of sports bags on the store',
            link : 'kids',
            svg : svg3
        },
    ]);

    return (
        <div className="">
            {/* NAVBAR */}
            <Navbar/>

            {/* CONTENT */}
            <div className="w-10/12 bg-white pb-14 overflow-y-hidden md:w-9/12 m-auto pt-40">
                <div className="flex flex-start">
                    <p className="text-4xl font-sans font-semibold italic text-slate-700">Shop By Categories</p>
                </div>
                

                <div className="md:w-full w-full m-auto new-items flex flex-col flex-wrap md:flex-row justify-between pt-10">
                    {all_categories_data.map((category)=>{
                        return(
                            <div className="item-card cwidth hover:cursor-pointer shadow-lg hover:shadow-2xl rounded-b-xl mb-14">
                                <div className="h h-32  rounded-t-xl flex justify-center items-center">
                                    <img className="rounded-t-xl w-6/12 h-10/12 pt-2" src= {category.svg} alt="item image here" />
                                </div>

                                <div className="t text-left pt-12 pb-12 px-4 rounded-b-xl">
                                    <p className="text-2xl text-slate-800 font-semibold">{category.name}</p>
                                    <p className="text-lg text-gray-600  pt-5 ">{category.description}</p>
                                    <div className="btns pt-7">
                                        <Link to = {`/categories/${category.link}`} className="px-6 py-2 border-solid border-2 border-gray-400 text-xl font-bold italic rounded text-gray-700 hover:border-gray-300">Explore</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
 
export default Allcategories;