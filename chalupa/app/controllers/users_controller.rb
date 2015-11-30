class UsersController < ApplicationController
	
	def index
	    @users = User.all
      	render :json => @users
	    #respond_with @users
	end

	def show
		#respond_with User.find(params[:id])
    	render :json =>  User.find(params[:id])
	end

	def new
    	#respond_with User.new
      	render :json => User.new
 	end
  
  	def edit
	    #respond_with User.find(params[:id])
	    render :json => User.find(params[:id])
  	end

	def create
    	render :json => user_params
		User.create(user_params)
	end

  	def update
    	@user = User.find(params[:id])
    	@user.update(user_params)
  	end

  	def destroy
    	@user = User.find(params[:id])
    	@user.destroy
  	end




	def user_params
		params.require(:user).permit(:email, :user_name, :first_name, :last_name, :phone_number, :facebook, :university_id)
	end

end
