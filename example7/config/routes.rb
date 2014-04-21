Example6::Application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products
  #
  # NOTE: using the 'only:' attribute to restrict the verb control and action mapping.
  resources :home, only: [:index, :wlcbk]

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'
  #
  # NOTE: For non-standard routes generated by the resources 
  #       section above use this section to map the 
  #       Verb to Controller#Action
  #       Mapped verbs are: get, post, patch, put, delete
  get 'home/wlcbk' # Used for Windows Live API callback
  get 'home/index'
  get 'home' => 'home#index'
  
  # You can have the root of your site routed with "root"
  # format is important here. Before set the root use the 
  # resources setion above to help with format of 
  # Controller#Action
  root to:'home#index'
 end