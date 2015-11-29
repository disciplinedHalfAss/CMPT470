class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :user_name
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :facebook
      t.integer :university_id

      t.timestamps null: false
    end
    add_index :users, :user_name
    add_index :users, :university_id
  end
end
