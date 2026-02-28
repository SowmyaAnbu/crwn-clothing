import { Outlet } from "react-router-dom";
import CategoryMenu from "../../components/category-menu/category-menu.component";
const Home = () => {
 
  return (
    <div>
     <CategoryMenu />
     <Outlet />
    </div>
  );
};

export default Home;
