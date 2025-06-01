import { CircleX, PlusIcon } from "lucide-react";
import { useState } from "react";
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css';
import { apiPosts } from "~/api";

const BlogForm = ({values = {author_name: "", author_email: "", title: "", content: "", is_published: true}, submitValues, showBlogForm}) => {
    const [data, setData] = useState( values );
    const [showMessage, setShowMessage] = useState(false)
    
    const setFormValues = (key, value) => {
        setData(prev => ({...prev, [key]: value}))
    }

    const saveBlog = async (form) => {
        const post_data = {}
        Object.entries(data).forEach(([key, value]) => {
            console.log(key, value)
            if(key === "is_published")
                post_data[key] = Boolean(parseInt(value))
            else
                post_data[key] = value
        })
        
        const request = await apiPosts.create({data:{post: data}})
        if(!request.success)
            setShowMessage(request.message)
    }

    return <div className="absolute top-0 left-0 w-full h-full bg-gray-500/75 transition-opacity z-20">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm p-4">
                {showMessage && <div>
                    {showMessage?.map((message, index) => (<div className="text-red-500">{message}.</div>))}
                </div>}
                <div className="bg-white border-b border-gray-200">
                    <form action={saveBlog}>
                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Your Name <span className="text-red-500">*</span></label><br />
                        <input type="text" value={data?.name} onChange={(e) => setFormValues('author_name', e.target.value) } className="border-2 border-gray-300 p-2 w-full" name="title" id="title" required />
                    </div>

                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Your Email <span className="text-red-500">*</span></label><br />
                        <input type="email" value={data?.email} onChange={(e) => setFormValues('author_email', e.target.value) } className="border-2 border-gray-300 p-2 w-full" name="email" id="description" required />
                    </div>

                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br />
                        <input type="text"value={data?.title} onChange={(e) => setFormValues('title', e.target.value) } className="border-2 border-gray-300 p-2 w-full" name="title" id="description" required />
                    </div>

                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Content <span className="text-red-500">*</span></label><br />
                        <SunEditor
                            height="400px"
                            defaultValue={data?.content}
                            onChange={(value) => setFormValues('content', value)}
                            required
                            setOptions={{
                                buttonList: [
                                    ['undo', 'redo'],
                                    ['font', 'fontSize', 'formatBlock'],
                                    // ['paragraphStyle', 'blockquote'],
                                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                    // ['fontColor', 'hiliteColor', 'textStyle'],
                                    ['removeFormat'],
                                    ['outdent', 'indent'],
                                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                                    // ['table', 'link', 'image', 'video', 'math'], // You must add the 'katex' library at options to use the 'math' plugin.
                                    // ['imageGallery'], // You must add the "imageGalleryUrl".
                                    // ['fullScreen', 'showBlocks', 'codeView'],
                                    // ['preview', 'print'],
                                    // ['save', 'template'],
                                    // ['dir', 'dir_ltr', 'dir_rtl'],
                                    // '/', Line break
                                ]
                            }}
                            name="content"
                        />
                    </div>

                    <div className="flex p-1 justify-between">
                        <button onClick={() => showBlogForm(false)} type="button" className="p-3 bg-red-500 text-white hover:bg-red-400">Cancel</button>
                        <div className="flex">
                            <select className="border-2 border-gray-300 border-r p-2" name="is_published" value={data?.is_published} onChange={(e) => setFormValues('is_published', e.target.value)}>
                                <option value={1}>Save and Publish</option>
                                <option value={0}>Save Draft</option>
                            </select>
                            <button type="button" role="submit" onClick={saveBlog} className="p-3 bg-blue-500 text-white hover:bg-blue-400">Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>;
}
export default BlogForm;