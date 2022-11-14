import bag from '../Accessories/bag.png';

const Banner = () => {
    return (
        <div className="banner">
            <div className="flex flex-col md:flex-row h-full md:h-full w-full md:pt-32">
                {/* text section */}
                <div className="md:w-5/12 w-full flex flex-col text-start justify-center px-8 pb-4 md:pb-12 md:pl-16 ">
                    <h1 className='md:text-5xl text-4xl font-bold font-mono italic text-slate-700 pt-52 md:pt-0'>Enjoy 5O% discount on first sale!</h1>
                    <p className='text-xl text-slate-600 py-4' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, id.</p>
                </div>

                {/* image section */}
                <div className="md:w-7/12 w-full flex items-center justify-center">
                    <img className='w-full' src= {bag} alt="image here" />
                </div>
            </div>
        </div>
    );
}
 
export default Banner;