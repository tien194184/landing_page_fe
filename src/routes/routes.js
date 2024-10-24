import config from '../config';
import Login from '../pages/Login';
import CreateAccount from '../pages/Register';
import CreateProduct from '../pages/CreateProduct';
import Product from '../pages/Product';
import Payment from '../pages/Payment';
import EditProduct from '../pages/EditProduct';

const publicRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: CreateAccount },
    { path: config.routes.product, component: Product },
    // { path: config.routes.createProduct, component: CreateProduct },
    { path: config.routes.payment, component: Payment },
];

const privateRoutesUser = [
    { path: config.routes.createProduct, component: CreateProduct },
    { path: config.routes.editProduct, component: EditProduct },
    { path: config.routes.payment, component: Payment },
    // { path: config.routes.register, component: CreateAccount },
    // { path: config.routes.editProduct, component: EditProduct },
];

const privateRoutesAdmin = [
    // { path: config.routes.login, component: Login },
    // { path: config.routes.register, component: Register },
];

export { publicRoutes, privateRoutesAdmin, privateRoutesUser };
