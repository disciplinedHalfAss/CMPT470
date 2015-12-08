class UniversitiesController < ApplicationController

	def index
	    @universities = University.all
      	render :json => @universities
	    #respond_with @universities
	end

	def show
		#respond_with University.find(params[:id])
    	render :json =>  University.find(params[:id])
	end

	def new
    	#respond_with University.new
      	render :json => University.new
 	end
  
  	def edit
	    #respond_with University.find(params[:id])
	    render :json => University.find(params[:id])
  	end

	def create
    	render :json => university_params
		University.create(university_params)
	end

  	def update
    	@university = University.find(params[:id])
    	@university.update(university_params)
  	end

  	def destroy
    	@university = University.find(params[:id])
    	@university.destroy
  	end




	def university_params
		params.require(:university).permit(:name, :short_name)
	end

end
