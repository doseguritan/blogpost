class Comment < ApplicationRecord
    belongs_to :post
    validates :author_email, presence: true
    validates :author_name, presence: true
    validates :message, presence: true

    default_scope {order(created_at: :desc)}
end
