class CreateDepartments < ActiveRecord::Migration
  def change
    create_table :departments do |t|
      t.string :name
      t.string :short_name
      t.integer :university_id

      t.timestamps null: false
    end
    add_index :departments, :university_id
  end
end
