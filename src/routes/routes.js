import config from '../config';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateProduct from '../pages/CreateProduct';
import Product from '../pages/Product';
import Payment from '../pages/Payment';

const publicRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
];

const privateRoutesUser = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.createProduct, component: CreateProduct },
    { path: config.routes.product, component: Product },
    { path: config.routes.payment, component: Payment },
    // { path: config.routes.editProduct, component: EditProduct },
    


];

const privateRoutesAdmin = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
   
];


export { publicRoutes, privateRoutesAdmin, privateRoutesUser };
