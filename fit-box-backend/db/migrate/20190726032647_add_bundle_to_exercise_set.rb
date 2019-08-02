class AddBundleToExerciseSet < ActiveRecord::Migration[5.2]
  def change
    add_column :exercise_sets, :bundle_id, :integer
    remove_column :exercise_sets, :bundle_exercise_id
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
