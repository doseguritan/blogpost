class Api::PostsController < ApplicationController
    before_action :set_post, only: [:update, :destroy]
    def index
        posts = Post.all
        render json: {data: posts}
    end

    def create
        post = Post.new(post_params)
        if post.save
            render json: {message: 'Successfully created post.', success: true } and return
        end
        render json: {message: post.errors.full_messages, success: false}
    end

    def show
        post = Post.find_by(slug: params[:id])
        if post
            render json: {data: post.as_json(include: :comments)}, status: :ok and return
        end
        render json: {data: {}, success: false}, status: :not_found
    end

    def update
    end

    def destroy
    end

    private
    def post_params
        params.require(:post).permit(:title, :content, :author_name, :author_email, :is_published)
    end

    def set_post
        @post = Post.find(params[:id])
    end
end
