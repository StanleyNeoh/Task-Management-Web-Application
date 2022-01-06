class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.integer :importance
      t.datetime :deadline
      t.boolean :public
      t.boolean :completed
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
