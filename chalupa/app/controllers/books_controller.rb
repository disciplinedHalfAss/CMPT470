class BooksController < ApplicationController

	def index
	    @books = Book.all
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