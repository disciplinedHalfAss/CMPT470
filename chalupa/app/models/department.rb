class Department < ActiveRecord::Base
  belongs_to :university
  has_many :courses
end
