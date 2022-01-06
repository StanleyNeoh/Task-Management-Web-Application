class User < ApplicationRecord
    has_many :tasks, dependent: :destroy
    has_many :tags, dependent: :destroy
    has_secure_password
    
    validates_presence_of :username
    validates_uniqueness_of :username
end
