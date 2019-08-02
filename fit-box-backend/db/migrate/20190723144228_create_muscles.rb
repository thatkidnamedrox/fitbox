class CreateMuscles < ActiveRecord::Migration[5.2]
  def change
    create_table :muscles do |t|
      t.string :name
      t.string :description
      t.integer :muscle_group_id

      t.timestamps
    end
  end
end
