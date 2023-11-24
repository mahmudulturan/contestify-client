import {Outlet} from 'react-router-dom'
import Header from '../components/Header/Header';
const MainLayout = () => {
  return (
    <div className='bg-seconderyCol font-poppins'>
        <Header></Header>   
        <div className=''>
        <Outlet></Outlet>
        </div>
    </div>
  );
};

export default MainLayout;