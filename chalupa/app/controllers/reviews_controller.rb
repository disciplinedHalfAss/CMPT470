class ReviewsController < ApplicationController

	def index
	    @reviews = Review.all
      	render :json => @reviews
	    #respond_with @reviews
	end

	def show
		#respond_with Review.find(params[:id])
    	render :json =>  Review.find(params[:id])
	end

	def new
    	#respond_with Review.new
      	render :json => Review.new
 	end
  
  	def edit
	    #respond_with Review.find(params[:id])
	    render :json => Review.find(params[:id])
  	end

	def create
    	render :json => review_params
		Review.create(review_params)
	end

  	def update
    	@review = Review.find(params[:id])
    	@review.update(review_params)
  	end

  	def destroy
    	@review = Review.find(params[:id])
    	@review.destroy
  	end




	def review_params
		params.require(:review).permit(:made_by, :for, :description, :rating, :show)
	end

end
