class Tag < ApplicationRecord
  belongs_to :user
  has_many :manifests, dependent: :destroy
  has_many :tasks, through: :manifests

  validates :name, presence: true
  validates :colour, presence: true
end
