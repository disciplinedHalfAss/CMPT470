class Book < ActiveRecord::Base
  belongs_to :course
  belongs_to :user
  validates :isbn, presence: true,
                   length: { minimum: 10 } #10 minimum for ISBN-10
  validates :price, presence: true
end
