class AddVideoLinkToWorkouts < ActiveRecord::Migration[5.2]
  def change
    add_column :workouts, :video_link, :string
  end
end
