import Banner from "../page/Banner";
import Categories from "../page/Categories";
import Doashboard from "../page/Doashboard";
import Products from "../page/Products";

export const routes = [
    {
        id:1,
        path: "/",
        element: <Doashboard />
    },
        {
        id:2,
        path: "Products",
        element: <Products />
    },
        {
        id:3,
        path: "Banner",
        element: <Banner />
    },
        {
        id:4,
        path: "Categories",
        element: <Categories />
    },
]