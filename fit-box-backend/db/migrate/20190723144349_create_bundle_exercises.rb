class CreateBundleExercises < ActiveRecord::Migration[5.2]
  def change
    create_table :bundle_exercises do |t|
      t.integer :bundle_id
      t.integer :exercise_set_id

      t.timestamps
    end
  end
end
