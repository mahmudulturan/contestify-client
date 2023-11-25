import {Outlet} from 'react-router-dom'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
const MainLayout = () => {
  return (
    <div className='bg-seconderyCol font-poppins'>
        <Header></Header>   
        <div className=''>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default MainLayout;