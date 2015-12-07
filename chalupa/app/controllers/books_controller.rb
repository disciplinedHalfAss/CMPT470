class BooksController < ApplicationController
  # this must be removed in the production
  # https://coderwall.com/p/8z7z3a/rails-4-solution-for-can-t-verify-csrf-token-authenticity-json-requests
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
  
	def index
      # find books based on course id
      course_id = params[:course_id]
      @books = Book.where(course_id: course_id) if course_id
      
      # find books based on department id
      department_id = params[:department_id]
      if department_id
        courses = Department.find_by(id: department_id).courses
        @books = []
        courses.each { |course| @books << course.books }
      end
      
      # find books based on university id
      university_id = params[:university_id]
      if university_id
        departments = University.find_by(id: university_id).departments
        courses = []
        departments.each {|department| courses << department.courses }
        courses = courses.flatten
        
        @books = []
        courses.each { |course| @books << course.books }
      end
      
      user_id = params[:user_id]
      @books = Book.where(user_id: user_id) if user_id
      
      # if no option is provided
      @books = Book.all if @books.nil?
      # return the books found
      render :json => @books.flatten
	    #respond_with @books
	end

	def show
		#respond_with Book.find(params[:id])
    render :json =>  Book.find(params[:id])
	end

	def new
    	#respond_with Book.new
      render :json => Book.new
 	end
  
  def edit
    #respond_with Book.find(params[:id])
    render :json => Book.find(params[:id])
  end

	def create
    render :json => book_params
		Book.create(book_params)
	end

  def update
    @book = Book.find(params[:id])
    @book.update(book_params)
    render :json => @book
  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy
  end


private

	def book_params
		params.require(:book).permit(:course_id, :user_id, :isbn, :name, :author, :edition, :price, :tags, :description, :is_sold)
	end

end