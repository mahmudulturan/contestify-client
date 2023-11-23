import {Outlet} from 'react-router-dom'
const MainLayout = () => {
  return (
    <div className=''>
        <h6>This is MainLayout </h6>
        
        <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;