import Navbar from "../assets/navbar";
import {Link} from 'react-router-dom'
import { IoIosClose } from "react-icons/io";

const About = () => {
    return (
        <div className="w-full overflow-y-scroll">
            {/* NAVBAR COMPONENT */}
            <Navbar/>

            <div className="o">
                <div className="w-10/12 md:w-8/12 m-auto pt-44">
                    <div className="flex justify-between items-center pb-6">
                        <p className="text-4xl font-sans font-semibold italic text-slate-700 text-start">About Us</p>

                        <Link to={'/'} className="b bg-gray-100 rounded-full shadow-xl hover:cursor-pointer hover:bg-gray-200">
                            <IoIosClose className="c text-gray-700" color={"grey"} size={60}/>
                        </Link> 
                    </div>

                    <div className="">
                        <p className="text-start text-lg text-gray-600 pb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dolorem cumque rem exercitationem. Reiciendis doloremque ipsam vel quod at soluta qui nihil, sequi nam ut obcaecati accusantium minus dolorum? Impedit veniam a minus, odio, saepe fugit nobis perferendis facilis expedita illum molestias obcaecati soluta ipsam quis consectetur ea sequi totam.</p>
                        <p className="text-start text-lg text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores non modi porro nostrum, quis magnam, eius impedit, nobis itaque expedita eum ad saepe iure sapiente.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default About;