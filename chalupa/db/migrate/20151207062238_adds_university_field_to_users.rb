class AddsUniversityFieldToUsers < ActiveRecord::Migration
  def change
    add_column :users, :university_id, :integer
  end
end
