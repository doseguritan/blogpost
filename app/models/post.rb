class Post < ApplicationRecord
    before_save :sanitize_content

    validates :title, presence: true, uniqueness: true

    has_many :comments

    private

    def sanitize_content
        self.published_at = DateTime.now if is_published
        self.slug = title.to_s.parameterize
        self.content = ActionController::Base.helpers.sanitize(
            content, tags: %w(p strong em ul ol li a), attributes: %w(href)
        )
    end
end
