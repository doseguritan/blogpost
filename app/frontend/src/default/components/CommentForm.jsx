import { CircleX, PlusIcon } from "lucide-react";
import { useState } from "react";
import { apiComments, apiPosts } from "~/api";

const CommentForm = ({post_id, shouldReloadPage, showCommentPage}) => {
    const [data, setData] = useState({author_name: "", author_email: "", message: "", post_id });
    const [showMessage, setShowMessage] = useState(false)
    
    const setFormValues = (key, value) => {
        setData(prev => ({...prev, [key]: value}))
    }

    const saveComment = async (form) => {
        const post_data = {}
        let has_missing = false;
        Object.entries(data).forEach(([key, value]) => {
            if(typeof value !== "number" && !value?.trim()?.length)
                has_missing = true;
        })
        try {
            apiComments.create({data:{comment: data}})
                .then(response => {
                    if(response.success){
                        showCommentPage(false);
                        shouldReloadPage(true)
                    }else{
                        setShowMessage(response.message)
                    }
                })
        } catch (error) {
            console.log(err.message)
        }
    }
    
    return <div className="absolute top-0 left-0 w-full h-full bg-gray-500/75 transition-opacity z-20">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm p-4">
                {showMessage && <div>
                    {showMessage?.map((message, index) => (<div className="text-red-500">{message}.</div>))}
                </div>}
                <div className="bg-white border-b border-gray-200">
                    <form action={saveComment}>
                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Your Name <span className="text-red-500">*</span></label><br />
                        <input type="text" value={data?.name} onChange={(e) => setFormValues('author_name', e.target.value) } className="border-2 border-gray-300 p-2 w-full" name="title" id="title" required />
                    </div>

                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Your Email <span className="text-red-500">*</span></label><br />
                        <input type="email" value={data?.email} onChange={(e) => setFormValues('author_email', e.target.value) } className="border-2 border-gray-300 p-2 w-full" name="email" id="description" required />
                    </div>

                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Message <span className="text-red-500">*</span></label><br />
                        <textarea className="border-2 border-gray-300 p-2 w-full" name="message" value={data?.message} onChange={(e) => setFormValues('message', e.target.value) }  ></textarea>
                    </div>

                    <div className="flex p-1 justify-between">
                        <button onClick={() => showCommentPage(false)} type="button" className="p-3 bg-red-500 text-white hover:bg-red-400">Cancel</button>
                        <div className="flex">
                            <button type="button" role="submit" onClick={saveComment} className="p-3 bg-blue-500 text-white hover:bg-blue-400">Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>;
}
export default CommentForm;