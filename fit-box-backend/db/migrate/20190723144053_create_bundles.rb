class CreateBundles < ActiveRecord::Migration[5.2]
  def change
    create_table :bundles do |t|
      t.string :name
      t.string :description
      t.integer :workout_id

      t.timestamps
    end
  end
end
