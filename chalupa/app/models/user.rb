class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :university
  has_many :books
  has_many :reviews, class_name: "Review", foreign_key: "for"
  has_many :reviewed, class_name: "Review", foreign_key: "made_by"
  validates :email, uniqueness: true, presence: true,
            length: { minimum: 8,
                      too_short: "must have at least %{count} characters" } # @sfu.ca or @ubc.ca are 7 characters each
  #validates :user_name, presence: true, length: { minimum: 3, too_short: "must have at least %{count} characters" }
end
