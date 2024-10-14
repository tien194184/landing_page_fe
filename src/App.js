import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutesAdmin, privateRoutesUser } from './routes';
import { DefaultLayout } from './layouts';

function App() {
    const authenticated = true;
    const authority = "USER";

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

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map(renderRoute)}
                    {authenticated && authority === 'ADMIN' && privateRoutesAdmin.map(renderRoute)}
                    {authenticated && authority === 'USER' && privateRoutesUser.map(renderRoute)}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
