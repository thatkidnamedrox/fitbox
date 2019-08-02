Rails.application.routes.draw do
  resources :follows
  resources :exercise_muscles
  resources :exercise_sets
  resources :users
  resources :bundle_exercises
  resources :workout_bundles
  resources :muscles
  resources :muscle_groups
  resources :exercises
  resources :bundles
  resources :workouts

  # get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  get '/workout/bundles/:id', to: 'workouts#bundles'

  get '/following/:user_id/:following_id', to: 'users#following'
  post '/follow', to: 'users#follow'
  delete '/unfollow', to: 'users#unfollow'
  get 'users/:id/workouts', to: 'users#workouts'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
