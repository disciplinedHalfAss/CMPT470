# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
execute 'apt_update' do
  command 'apt-get update'
end

# Base configuration recipe in Chef.
package "wget"
package "ntp"
cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end
execute 'ntp_restart' do
  command 'service ntp restart'
end

package "ack-grep"
package "rbenv"
package "ruby-dev"
package "zlib1g-dev"
package "libmysqlclient-dev"
package 'libsqlite3-dev'
package 'libpq-dev'
package 'nodejs'
package 'rake'
package "postgresql"
package "postgresql-contrib"
package "apache2"
package "libapache2-mod-passenger"

execute 'postgres_user' do
  command "echo \"CREATE DATABASE mydb; CREATE USER vagrant WITH PASSWORD 'vagrant' ; GRANT ALL PRIVILEGES ON DATABASE mydb TO vagrant;\" | sudo -u postgres psql"
end

execute 'gem_bundler' do
	command 'gem install bundler'
end

execute 'install rails gem' do
	command 'gem install rails --no-ri --no-rdoc'
end

execute 'bundle-install' do
  cwd '/home/vagrant/project/chalupa'
  command 'bundle install'
  user 'vagrant'
end


execute 'gems update' do
  cwd '/home/vagrant/project/chalupa'
  command 'gem install rubygems-update'
end


execute 'bundle update' do
  cwd '/home/vagrant/project/chalupa'
  command 'bundle update'
  user 'vagrant'
end

execute 'pristine all' do
  cwd '/home/vagrant/project/chalupa'
  command 'gem pristine --all'
end

cookbook_file "000-default.conf" do
  path "/etc/apache2/sites-enabled/000-default.conf"
end

execute 'assets' do
  cwd '/home/vagrant/project/chalupa'
  command 'bundle exec rake assets:precompile RAILS_ENV=production'
  user 'vagrant'
end

 execute 'migrate' do
   cwd '/home/vagrant/project/chalupa'
   command './bin/rake db:migrate RAILS_ENV=production'
   user 'vagrant'
 end

execute 'apache_restart' do
  command 'service apache2 restart'
end


#  execute 'run server' do
#   cwd '/home/vagrant/project/chalupa'
#   command './bin/rails server -d -b 0.0.0.0'
#   user 'vagrant'
# end