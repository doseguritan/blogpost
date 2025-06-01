class CommentMailer < ApplicationMailer
    default from: 'admin@blogpost.com'
  
    def new_comment_notification(comment)
      @comment = comment
      @post = comment.post
  
      mail(
        to: @post.author_email,
        subject: "New comment on your post: #{@post.title}"
      )
    end

end
