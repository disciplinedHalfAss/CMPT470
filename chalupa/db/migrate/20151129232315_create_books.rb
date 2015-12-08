class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.integer :course_id
      t.integer :user_id
      t.string :isbn
      t.string :name
      t.text :author
      t.integer :edition
      t.integer :price
      t.text :tags
      t.text :description
      t.boolean :is_sold

      t.timestamps null: false
    end
    add_index :books, :course_id
    add_index :books, :user_id
  end
end
