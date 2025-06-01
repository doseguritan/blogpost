class CreatePosts < ActiveRecord::Migration[8.0]
  def change
    create_table :posts do |t|
      t.string        :author_name
      t.string        :author_email
      t.string        :title
      t.string        :slug
      t.text          :content
      t.boolean       :is_published
      t.datetime      :published_at
      t.timestamps
    end
  end
end
