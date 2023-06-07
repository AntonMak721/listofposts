import React from "react";
import { useRoutes } from "react-router-dom";
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import Login from "../pages/Login";
import RequireAuth from "../auth/RequireAuth";

const PostsAuthRequire = (
  <RequireAuth>
    <Posts />
  </RequireAuth>
);
const PostIdAuthRequire = (
  <RequireAuth>
    <PostIdPage />
  </RequireAuth>
);



export default function Router() {
  let element = useRoutes([
    { path: "about", element: <About /> },
    { path: "posts", element: PostsAuthRequire },
    { path: "/", element: PostsAuthRequire },
    { path: "posts/:id", element: PostIdAuthRequire },
    { path: "login", element: <Login /> },
    { path: "*", element: <Error /> },
  ]);
  return element;
}
