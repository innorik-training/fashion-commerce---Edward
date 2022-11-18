import {useState} from 'react'

interface props{
    filter_onclick : (target : any,min : any,max : any, material : string, type : string)=> void;
    category : string
}

const FilterContainer = ({filter_onclick,category}:props) => {
    
    //filter input fields states
    const [minprice,setminprice] = useState<any>(0);
    const [maxprice,setmaxprice] = useState<any>(999);
    const [material,setmaterial] = useState<string>('all');
    const [type,settype] = useState<string>('all');
   
    return (
        <div className="fixed top-64 md:top-64 right-20 bg-white shadow-2xl rounded py-6 px-7 text-start">
            {/* by price section */}
            <section className="pb-3">
                <form action="">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-lg font-semibold text-gray-600">By price</p>
                        <p className="t text-green-800 hover:underline hover:cursor-pointer">reset all</p>
                    </div>

                    {/* input fields */}
                    <div className="flex flex-row mt-2">
                        <input defaultValue={minprice} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setminprice(e.target.value)} className="w-20 pl-2 py-1 border-solid border-2 rounded border-slate-300" type="number" placeholder="min"/>
                        <input defaultValue={maxprice} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setmaxprice(e.target.value)} className="w w-20 ml-2 pl-2 py-1 border-solid border-2 rounded border-slate-300" type="number" placeholder="max"/>
                    </div>

                </form>
            </section>

            {/* By material section */}
            <section className="pb-3">
                <p className="text-lg font-semibold text-gray-600">By Material</p>

                <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> setmaterial(e.target.value)} className='w-full pl-2 mt-2 py-1 border-solid border-2 rounded border-slate-300' name="material type" id="">
                    <option value="all">all</option>
                    <option value="leather">leather</option>
                    <option value="canvas">canvas</option>
                    <option value="nylon">nylon</option>
                </select>
            </section>

            {/* By type section */}
            <section className="pb-3">
                <p  className="text-lg font-semibold text-gray-600 ">By Type</p>

                <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> settype(e.target.value)} className='w-full mt-2 pl-2 py-1 border-solid border-2 rounded border-slate-300' name="material type" id="">
                    <option value="all">all</option>
                    <option value="luxury">luxury</option>
                    <option value="sports">sports</option>
                    <option value="casual">casual</option>
                </select>
            </section>

            {/* apply filter button */}
            <button 
                onClick={(e)=> {e.preventDefault();
                filter_onclick(category,minprice,maxprice,material,type);
            }} className=" w w-full mt-5 text-lg bg-slate-300 px-3 py-2 font-bold text-slate-700 rounded">Apply</button>
        </div>
    );
}
 
export default FilterContainer;