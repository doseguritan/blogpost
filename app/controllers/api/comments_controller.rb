class Api::CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    if comment.save
      CommentMailer.new_comment_notification(comment).deliver_later
      render json: {message: 'Comment successfully saved.', success: true} and return
    end
    render json: {message: comment.errors.full_messages, success: false}
  end

  private
  def comment_params
      params.require(:comment).permit(:post_id, :message, :author_name, :author_email)
  end
end
