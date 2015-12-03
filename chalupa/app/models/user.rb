class User < ActiveRecord::Base
  has_one :university
  has_many :books
  has_many :reviews, class_name: "Review", foreign_key: "for"
  has_many :reviewed, class_name: "Review", foreign_key: "made_by"
end
