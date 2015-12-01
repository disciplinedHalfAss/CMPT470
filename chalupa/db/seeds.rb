# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

books = [
  {
    course_id: 1,
    user_id: 1,
    isbn: 'awesome',    
    name: 'code geass',
    author: 'ali',
    edition: 2,    
    price: 20,
    tags: 'well kept',
    description: 'selling my notes with it',
    is_sold: false
  },
  {
    course_id: 2,
    user_id: 2,
    isbn: 'jack',    
    name: 'noblesse',
    author: 'race',
    edition: 3,    
    price: 30,
    tags: 'fight',
    description: 'as good as new',
    is_sold: false
  },
  {
    course_id: 3,
    user_id: 3,
    isbn: 'manga',    
    name: 'here',
    author: 'ali sama',
    edition: 4,    
    price: 44,
    tags: 'never touched it',
    description: 'my love',
    is_sold: false
  },
  
]

books.each do |book|
  Book.create(book)
end