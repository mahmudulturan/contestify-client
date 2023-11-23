import {Outlet} from 'react-router-dom'
import Header from '../components/Header/Header';
const MainLayout = () => {
  return (
    <div className='bg-bgCol font-poppins'>
        <Header></Header>
        <h6>This is MainLayout </h6>
        
        <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;