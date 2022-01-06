class Manifest < ApplicationRecord
  belongs_to :task
  belongs_to :tag

  def user_id
    self.task.user_id
  end

  validates :tag_id, presence: true, uniqueness: { scope: :task_id }
end
