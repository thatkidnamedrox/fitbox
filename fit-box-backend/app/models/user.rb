class User < ApplicationRecord
    has_secure_password
    has_many :workouts
    has_many :follows

    has_many :follower_relationships, foreign_key: :following_id, class_name: "Follow"
    has_many :followers, through: :follower_relationships, source: :follower

    has_many :following_relationships, foreign_key: :user_id, class_name: "Follow"
    has_many :following, through: :following_relationships, source: :following

    def full_hash
        attributes = self.attributes
        attributes["followers"] = self.followers.map { |follower| follower.attributes }
        attributes["following"] = self.following.map { |following| following.attributes }
        attributes["workouts"] = self.workouts.map { |workout| workout.attributes }
        attributes
    end
end
