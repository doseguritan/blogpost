import { ChevronLeft, PencilLine } from "lucide-react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router";
import { formatDate } from "../utils/Date";
import CommentForm from "../components/CommentForm";
import { useEffect, useState } from "react";

const Post = () => {
    const [shouldReloadPage, setShouldReloadPage] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const navigate =  useNavigate();
    const data = useLoaderData();
    const revalidator = useRevalidator()
    useEffect(() => {
        if(shouldReloadPage)
            revalidator.revalidate();
    },[shouldReloadPage])
    return <div className="max-w-7xl mx-auto my-4 px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex my-4 cursor-pointer" onClick={() => navigate(-1)}><ChevronLeft /> Return to List</div>
        <div className="font-bold text-xl">{data?.title}</div>
        <div className="text-sm">by: {data?.authorName} {formatDate(data?.publishedAt, " at ")}</div>
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: data?.content }}></div>
        <hr className="my-5" />
        <button
            type="button"
            className="flex items-center gap-2 rounded-lg border bg-theme px-4 py-2 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-theme-hover active:scale-95 sm:px-5 sm:py-2.5"
            onClick={() => { setShowComment(true); setShouldReloadPage(false) }}
        >
            <PencilLine size={18} />
            <span>Comment</span>
        </button>
        <hr className="my-3" />
        <div className="flex flex-col gap-y-6">
            {data?.comments?.map((comment, index) => (<div key={index} className="border-bottom-theme border-b-1">
                <div className="text-[14px] font-medium mb-1">{comment.authorName} {formatDate(comment.createdAt, " - ")}</div>
                <div id={index} dangerouslySetInnerHTML={{__html: comment?.message}} />
            </div>))}
        </div>
        {showComment && <CommentForm post_id={data?.id} shouldReloadPage={setShouldReloadPage} showCommentPage={setShowComment} />}
    </div>
}
export default Post;