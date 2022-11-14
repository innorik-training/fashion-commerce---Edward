import {Link} from 'react-router-dom'
const MenuL = () => {
    return (
        <div className="fixed py-5 top-24 border-t-stone-100 overflow-hidden border-2 border-solid left-0 right-0 bg-white shadow-2xl">
            <div className="flex flex-col items-start px-10">
                <Link to={'/'} className='py-3 text-sm font-bold'>HOME.</Link>
                <Link to={'/about'} className='py-3 text-sm font-bold' >ABOUT.</Link>
                <Link to={'/categories'} className='py-3 text-sm font-bold'>CATEGORIES.</Link>
                <Link to={'/blog'} className='py-3 text-sm font-bold'>BLOG.</Link>
                
                <div className="px pt-5 pb-1 w-full flex">
                    <Link className='b bg-slate-300 font-bold text-sm text-slate-800 w-full py-3 rounded shadow-lg hover:bg-slate-200' to={'/contact'}>CONTACT US</Link>
                </div>
            </div>
        </div>
    );
}
 
export default MenuL;