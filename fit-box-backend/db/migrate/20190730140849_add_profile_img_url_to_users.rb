class AddProfileImgUrlToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :profile_img_url, :string
  end
end
