require "test_helper"

class PostsApiTest < ActionDispatch::IntegrationTest
  setup do
    @post = Post.create!(
      title: "Test Title",
      content: "Test content",
      author_name: "Jane",
      author_email: "jane@example.com",
      is_published: true
    )
  end

  test "GET /api/posts returns all posts" do
    get "/api/posts"
    assert_response :success
    json = JSON.parse(response.body)
    assert_operator json["data"].size, :>, 0, "Expected at least one post in response"
  end

  test "GET /api/posts/:id returns a post by slug" do
    get "/api/posts/#{@post.slug}"
    assert_response :ok
    json = JSON.parse(response.body)
    assert_equal @post.title, json["data"]["title"]
  end

  test "GET /api/posts/:id returns 404 for missing slug" do
    get "/api/posts/non-existent"
    assert_response :not_found
    json = JSON.parse(response.body)
    assert_equal false, json["success"]
  end

  test "POST /api/posts creates a post with valid data" do
    assert_difference("Post.count", 1) do
      post "/api/posts", params: {
        post: {
          title: "New Post",
          content: "Content here",
          author_name: "John",
          author_email: "john@example.com",
          is_published: true
        }
      }
    end

    assert_response :ok
    json = JSON.parse(response.body)
    assert_equal true, json["success"]
    assert_equal "Successfully created post.", json["message"]
  end

  test "POST /api/posts returns failure on invalid data" do
    post "/api/posts", params: {
      post: {
        title: "", # Invalid: title required
        content: "",
        author_name: "",
        author_email: "bademail",
        is_published: false
      }
    }

    assert_response :ok # Your controller does not return :unprocessable_entity
    json = JSON.parse(response.body)
    assert_equal false, json["success"]
    assert json["message"].is_a?(Array)
  end
end
