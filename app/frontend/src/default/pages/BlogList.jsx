import { useEffect, useState } from 'react';
import routes from '~/api';
import { formatDate } from '../utils/Date';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        routes.apiPosts.index()
            .then(response => setPosts(response.data))
    }, [])
    
    return <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-[80%] mx-auto my-4">
        {posts?.map(({slug, title, publishedAt, authorName}, idx) => (
            <div
                key={slug}
                className="flex transform flex-col gap-3 rounded-lg border bg-light p-3 transition-transform hover:scale-105">
                <figure className="relative h-40 w-full overflow-hidden bg-gray-200">
                <img
                    className="absolute inset-0 h-full w-full rounded-md object-cover"
                    src={`https://picsum.photos/200/300?random=${idx+1}`}
                    alt="demo"
                />
                </figure>
        
                <a href={`/post/${slug}`}>
                <h3 className="mb-2 text-xl font-bold text-primary transition-colors duration-200 hover:text-theme">
                    {title}
                </h3>
                <p className="text-gray-700">{}</p>
                <p className="mt-4 text-sm font-semibold text-primary">
                    {authorName} {formatDate(publishedAt)}
                </p>
                </a>
            </div>
        ))}
    </div>
}
export default BlogList;