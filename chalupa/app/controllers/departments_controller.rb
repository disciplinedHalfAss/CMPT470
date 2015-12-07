class DepartmentsController < ApplicationController

	def index
	    @departments = Department.all
      	render :json => @departments
	    #respond_with @departments
	end

	def show
		#respond_with Department.find(params[:id])
    	render :json =>  Department.find(params[:id])
	end

	def new
    	#respond_with Department.new
      	render :json => Department.new
 	end
  
  	def edit
	    #respond_with Department.find(params[:id])
	    render :json => Department.find(params[:id])
  	end

	def create
    	render :json => department_params
		Department.create(department_params)
	end

  	def update
    	@department = Department.find(params[:id])
    	@department.update(department_params)
  	end

  	def destroy
    	@department = Department.find(params[:id])
    	@department.destroy
  	end




	def department_params
		params.require(:department).permit(:name, :short_name, :university_id)
	end
	
end
