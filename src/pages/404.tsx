import {Link} from 'react-router-dom'
import svg from '../Accessories/not_found.svg'
const Notfound = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between h-screen">
            {/* text section */}
            <div className="text w-9/12 m-auto md:w-1/2 flex items-start flex-col">
                <h1 className='text-5xl font-semibold pl-16 text-slate-600 pb-12'>Oops...Page not found</h1>
                <Link className='ml-16 px-6 py-4 bg-slate-300 text-2xl rounded hover:bg-slate-200 text-slate-700' to={'/'}>Back to homepage</Link>
            </div>

            {/* svg section */}
            <div className="svg w-9/12 m-auto md:w-1/2 flex items-center h-full">
                <img className='w-10/12' src= {svg} alt="image here" />
            </div>
        </div>
    );
}
 
export default Notfound;