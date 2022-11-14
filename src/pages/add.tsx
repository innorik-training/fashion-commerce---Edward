import { useDispatch } from 'react-redux';
import axios from 'axios'
import { useState } from 'react';
import Swal from 'sweetalert2';

const AddItem = () => {
    //dispatch
    const dispatch  = useDispatch();

    const[name,setname] = useState<string | null>(null);
    const[description,setdescription] = useState<string | null>(null);
    const[price,setprice] = useState<string | null>(null)
    const[url,seturl] = useState<string | null>(null)

    const add =async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:3001/items',{
            name : name,
            description: description,
            price:price,
            url: url
        })

        Swal.fire({
            position: 'top',
            icon: 'success',
            title: '1 item added',
            showConfirmButton: false,
            timer: 1500
          })
    }

    return (
        <div className="flex flex-row justify-center pt h-screen w-8/12 m-auto">
            <div className="w-4/5 flex items-center justify-center h-full">
                <form className="w-4/5 m-auto flex flex-col shadow-2xl pt-16 pb-16 rounded" action="">
                    <div className="w-4/5 m-auto flex flex-col">
                        <div className="text-start">
                            <h6 className="text-4xl font-semibold italic font-mono">Add a Product</h6>
                        </div>
                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setname(e.target.value)} className="text-xl mt-4 p-2 border-solid border-2 rounded border-gray-300 text-neutral-500" type="text" placeholder="Item Name"/>
                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setdescription(e.target.value)} className="text-xl mt-4 p-2 border-solid border-2 rounded border-gray-300 text-neutral-500" type="text" placeholder="Item Description"/>
                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setprice(e.target.value)} className="text-xl mt-4 p-2 border-solid border-2 rounded border-gray-300 text-neutral-500" type="text" placeholder="Item price"/>
                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => seturl(e.target.value)} className="text-xl mt-4 p-2 border-solid border-2 rounded border-gray-300 text-neutral-500" type="text" placeholder="image url"/>

                        <div className="flex justify-end">
                            <button onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>add(e)} className="mt-4 px-10 py-4 rounded bg-slate-200 text-xl font-bold text-slate-800">add</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* <div className="w-2/5 flex justify-center items-center">
                <img src="" alt="image here"/>
            </div> */}
        </div>
    );
}
 
export default AddItem;