import Navbar from "../assets/navbar";
import Allproducts from "../components/allproducts";
import Banner from "../components/banner";
import Footer from "../components/footer";
import NewArrivals from "../components/newarrivals";

const Home = () => {
    return (
        <div className="home h-screen bg-slate-100">
            <Navbar/>
            <div>
                <Banner/>
            </div>
            <NewArrivals/>
            <Allproducts/>
            <Footer/>
        </div>
    );
}
 
export default Home;