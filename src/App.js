import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutesAdmin, privateRoutesUser } from './routes';
import { DefaultLayout } from './layouts';

function App() {
    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');
        const role = Number(localStorage.getItem('role'));
        // Kiểm tra xem token có tồn tại và chưa hết hạn
        const isValidToken = token && expiration && new Date(expiration) > new Date();

        return { isAuthenticated: isValidToken, role }; // Trả về trạng thái xác thực và role
    };

    const renderRoute = (route, index) => {
        let Layout = DefaultLayout;
        if (route.layout) {
            Layout = route.layout;
        } else if (route.layout === null) {
            Layout = Fragment;
        }
        const Page = route.component;
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Layout>
                        <Page />
                    </Layout>
                }
            />
        );
    };
    const { isAuthenticated, role } = checkAuth();

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map(renderRoute)}
                    {isAuthenticated && role === 2 && privateRoutesAdmin.map(renderRoute)}
                    {isAuthenticated && role === 1 && privateRoutesUser.map(renderRoute)}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
