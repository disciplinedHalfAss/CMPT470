class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :made_by
      t.integer :for
      t.text :description
      t.integer :rating
      t.boolean :show

      t.timestamps null: false
    end
    add_index :reviews, :made_by
    add_index :reviews, :for
  end
end
