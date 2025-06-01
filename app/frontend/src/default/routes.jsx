import { createBrowserRouter } from "react-router";
import App from "./App";
import Post from "./pages/Post";
import BlogList from "./pages/BlogList";
import { apiPosts } from "~/api";

const routes = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {index: true, Component: BlogList},
            {
                path: '/post/:slug',
                Component: Post,
                loader: async ({params}) => {
                    const post = await apiPosts.show({id: params.slug})
                    return post?.data
                }
            }
        ]
    }
])

export default routes;