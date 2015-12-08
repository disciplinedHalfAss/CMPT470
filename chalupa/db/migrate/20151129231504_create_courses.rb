class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :name
      t.integer :number
      t.integer :department_id

      t.timestamps null: false
    end
    add_index :courses, :department_id
  end
end
