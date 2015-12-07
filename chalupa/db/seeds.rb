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
  {
    course_id: 3,
    user_id: 3,
    isbn: '1451648537',    
    name: 'here',
    author: 'Walter Issac',
    edition: 2,    
    price: 12,
    tags: 'I touch it every night',
    description: 'I touch it every night',
    is_sold: false
  },
  {
    course_id: 3,
    user_id: 3,
    isbn: '081297381X',    
    name: 'Black Swann',
    author: 'dsad',
    edition: 4,    
    price: 23,
    tags: 'never touched it',
    description: 'I touch it every night',
    is_sold: false
  },
  
]

universities = [
  {
    name: 'Simon Fraser University',
    short_name: 'SFU',
  },
  {
    name: 'University of British Columbia',
    short_name: 'UBC'
  }
]

deparments = [
  {
    name: 'Mathematics',
    short_name: 'MATH',
    university_id: 1
  },
  {
    name: 'Computing Science',
    short_name: 'CMPT',
    university_id: 1
  },
  {
    name: 'Mathematics',
    short_name: 'MATH',
    university_id: 2
  },
  {
    name: 'Computing Science',
    short_name: 'CMPT',
    university_id: 2
  }
]

courses = [
  {
    name: 'Artificial Inteligence',
    number: 310,
    department_id: 2
  },
  {
    name: 'Computer Vision',
    number: 412,
    department_id: 2
  },
]

users = [
  {
    email: 'ali@chalupa.com',
    username: 'king',
    university_id: 1,
  },
  {
    email: 'archit@chalupa.com',
    username: 'archit',
    university_id: 1,
  }
]

reviews = [
  {
    made_by: 1,
    for: 2,
    description: 'by ali for archit',
    rating: 5,
    show: true
  },
  {
    made_by: 2,
    for: 1,
    description: 'by archit for ali',
    rating: 5,
    show: true
  }
]

books.each do |book|
  Book.create(book)
end

universities.each do |university|
  University.create(university)
end

deparments.each do |deparment|
  Department.create(deparment)
end

courses.each do |course|
  Course.create(course)
end

users.each do |user|
  User.create(user)
end

reviews.each do |review|
  Review.create(review)
end