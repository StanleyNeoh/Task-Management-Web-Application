class Task < ApplicationRecord
  belongs_to :user
  has_many :manifests, dependent: :destroy
  has_many :tags, through: :manifests

  validates :name, presence: true
  validates :importance, presence: true
  validates :user_id, presence: true
  validate :deadline_cannot_be_in_the_past

  before_save do |task|
    if task.deadline.present?
      task.deadline = task.deadline.to_datetime.change(offset: DateTime.now.zone).at_end_of_day
    else 
      task.deadline = DateTime.now.change(year: DateTime.now.year + 2000)
    end
  end

  def timeLeft
    if deadline.present? && deadline.year - DateTime.now.year <= 1000
      total_seconds = (deadline - DateTime.now).to_i
      days = (total_seconds/86400).to_i
      total_seconds %= 86400
      hours = (total_seconds/3600).to_i
      total_seconds %= 3600
      minutes = (total_seconds/60).to_i
      total_seconds %= 60
      seconds = total_seconds
      return [days, hours, minutes, seconds]
    end
  end

  def deadline_cannot_be_in_the_past
    if deadline.present? && deadline < Date.today
      errors.add(:deadline, "can't be in the past")
    end
  end
end
