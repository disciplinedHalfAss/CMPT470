class CoursesController < ApplicationController

	def index
	    @courses = Course.all
      	render :json => @courses
	    #respond_with @courses
	end

	def show
		#respond_with Course.find(params[:id])
    	render :json =>  Course.find(params[:id])
	end

	def new
    	#respond_with Course.new
      	render :json => Course.new
 	end
  
  	def edit
	    #respond_with Course.find(params[:id])
	    render :json => Course.find(params[:id])
  	end

	def create
    	render :json => course_params
		Course.create(course_params)
	end

  	def update
    	@course = Course.find(params[:id])
    	@course.update(course_params)
  	end

  	def destroy
    	@course = Course.find(params[:id])
    	@course.destroy
  	end




	def course_params
		params.require(:course).permit(:name, :number, :department_id)
	end
end
