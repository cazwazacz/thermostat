require 'sinatra/base'
require 'json'

class App < Sinatra::Base

  enable :sessions

  get '/' do
    erb :index
  end

  get '/temperature' do
    content_type :json
    { temperature: session[:temperature] , city: session[:city]}.to_json
  end

  post '/temperature' do
    session[:temperature] = params[:temperature]
    200
  end

  post '/city' do
    session[:city] = params[:city]
    200
  end

  run! if app_file == $0
end
