require "test_helper"

class CommentsApiTest < ActionDispatch::IntegrationTest
  setup do
    @post = Post.create!(
      title: "Test Post",
      content: "Sample content",
      author_name: "Alice",
      author_email: "alice@example.com",
      is_published: true
    )
  end

  test "POST /api/comments creates a comment with valid data" do
    assert_difference("Comment.count", 1) do
      post "/api/comments", params: {
        comment: {
          post_id: @post.id,
          message: "This is a comment",
          author_name: "John Doe",
          author_email: "john@example.com"
        }
      }
    end

    assert_response :success
    json = JSON.parse(response.body)
    assert_equal true, json["success"]
    assert_equal "Comment successfully saved.", json["message"]
  end

  test "POST /api/comments fails with invalid data" do
    post "/api/comments", params: {
      comment: {
        post_id: nil,  # invalid: post_id is required
        message: "",
        author_name: "",
        author_email: "not-an-email"
      }
    }

    assert_response :success  # Controller still returns 200 OK
    json = JSON.parse(response.body)
    assert_equal false, json["success"]
    assert json["message"].is_a?(Array)
    assert json["message"].any?
  end
end