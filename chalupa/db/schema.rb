# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151207062238) do

  create_table "books", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "user_id"
    t.string   "isbn"
    t.string   "name"
    t.text     "author"
    t.integer  "edition"
    t.integer  "price"
    t.text     "tags"
    t.text     "description"
    t.boolean  "is_sold"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "books", ["course_id"], name: "index_books_on_course_id"
  add_index "books", ["user_id"], name: "index_books_on_user_id"

  create_table "courses", force: :cascade do |t|
    t.string   "name"
    t.integer  "number"
    t.integer  "department_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "courses", ["department_id"], name: "index_courses_on_department_id"

  create_table "departments", force: :cascade do |t|
    t.string   "name"
    t.string   "short_name"
    t.integer  "university_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "departments", ["university_id"], name: "index_departments_on_university_id"

  create_table "reviews", force: :cascade do |t|
    t.integer  "made_by"
    t.integer  "for"
    t.text     "description"
    t.integer  "rating"
    t.boolean  "show"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "reviews", ["for"], name: "index_reviews_on_for"
  add_index "reviews", ["made_by"], name: "index_reviews_on_made_by"

  create_table "universities", force: :cascade do |t|
    t.string   "name"
    t.string   "short_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "username"
    t.string   "facebook"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone_number"
    t.integer  "university_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["username"], name: "index_users_on_username", unique: true

end
