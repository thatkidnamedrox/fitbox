# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

muscle_groups = [
    "quadriceps",
    "hamstrings",
    "calves",
    "chest",
    "back",
    "shoulders",
    "triceps",
    "biceps",
    "forearms",
    "trapezius",
    "abs"
]

User.destroy_all
Workout.destroy_all
Follow.destroy_all

users = [
    { 
        username: "knownasrox",
        bio: ":)",
        password: "palace",
        profile_img_url: "https://cdn130.picsart.com/266658400000212.png?r1024x1024"
    },
    {
        username: "aliya-janell",
        bio: ":)",
        password: "palace",
        profile_img_url: "https://i.pinimg.com/originals/d6/85/c0/d685c03633c4c2937b57a2622842901d.jpg"
    },
    {
        username: "son-goku",
        bio: ":)",
        password: "palace",
        profile_img_url: "https://cdn11.bigcommerce.com/s-c90z0hdhmk/images/stencil/1280x1280/products/62/70/Goku_Ultra_Instinct__74964.1556400877.jpg?c=2&imbypass=on"
    },
    {
        username: "naruto-uzumaki",
        bio: ":)",
        password: "sasuke",
        profile_img_url: "https://dw9to29mmj727.cloudfront.net/misc/newsletter-naruto3.png"
    }
]

users.each do |user|
    User.create(user);

end
