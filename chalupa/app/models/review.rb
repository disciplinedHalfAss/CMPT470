class Review < ActiveRecord::Base
  belongs_to :made_by
  belongs_to :for
  validates :description, presence: true
end
