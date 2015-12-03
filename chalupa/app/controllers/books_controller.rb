class BooksController < ApplicationController
  # this must be removed in the production
  # https://coderwall.com/p/8z7z3a/rails-4-solution-for-can-t-verify-csrf-token-authenticity-json-requests
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
  
	def index
      course_id = params[:course_id]
      @books = Book.where(course_id: course_id) if course_id
      
      @books = Book.limit(4) if @books.nil?
      render :json => @books
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