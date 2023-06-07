import React, { useContext } from 'react';
import Router from '../routes/routes';
import { AuthContext } from '../auth/AuthContext';
import Loader from './UI/Loader/Loader';
// import {  Routes, Route } from "react-router-dom";
// import About from "../pages/About";
// import Posts from "../pages/Posts";
// import PostIdPage from '../pages/PostIdPage';
// import RequireAuth from '../auth/RequireAuth';
// import Login from '../pages/Login';
// import Error from '../pages/Error';

const AppRouter = () => {

    const {isAuth, isLoding} = useContext(AuthContext)
    console.log(isAuth)
    
    if (isLoding) {
        return <Loader/>
    }

    return (
        <Router/>
            // способ роутинга без использования хука useRoutes
            // <Routes>
            //     <Route path="about" element={<About />} />
            //     <Route path="login" element={<Login />} />
            //     {/* <Route path="/" element={<Posts /> } /> */}
            //     <Route path="posts" element= {PostsAuthRequire } />
            //     <Route path="posts/:id" element={PostIdAuthRequire} />
            //     <Route path="*" element={<Error/>} /> 
            // </Routes>   
    );

};

export default AppRouter;

// Добавить до return при вышеуказанном способе
// const PostsAuthRequire = (
    //     <RequireAuth>
    //       <Posts />
    //     </RequireAuth>
    //   );
    // const PostIdAuthRequire = (
    //     <RequireAuth>
    //       <PostIdPage />
    //     </RequireAuth>
    //   );