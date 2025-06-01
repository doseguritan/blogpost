class CreateComments < ActiveRecord::Migration[8.0]
  def change
    create_table :comments do |t|
      t.string            :author_name
      t.string            :author_email
      t.belongs_to        :post
      t.text              :message
      t.timestamps
    end
  end
end
