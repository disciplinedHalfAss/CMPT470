class UsersController < ApplicationController
	# this must be removed in the production
  # https://coderwall.com/p/8z7z3a/rails-4-solution-for-can-t-verify-csrf-token-authenticity-json-requests
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
  
	def index
	    @users = User.all
      render :json => @users
	    #respond_with @users
	end

	def show
		#respond_with User.find(params[:id])
    @user = User.find(params[:id])
    @reviews = @user.reviews
    @reviewed = @user.reviewed
    render :json => [ @user, @reviews, @reviewed ] 
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

private

	def user_params
		params.require(:user).permit(:email, :user_name, :first_name, :last_name, :phone_number, :facebook, :university_id)
	end

end
