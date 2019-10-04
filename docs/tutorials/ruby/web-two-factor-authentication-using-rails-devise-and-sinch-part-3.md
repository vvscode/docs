---
title: "Web Two-Factor Authentication Using Rails, Devise and Sinch - Part 3"
excerpt: "Web Two-Factor Authentication Using Rails, Devise and Sinch. When users sign up for your app, they will be prompted to enter their phone number. Every time they sign in after that OTP will be texted to their phone."
---
> **Update**
>
> To verify numbers even easier, check out our [Verification SDK](https://www.sinch.com/products/verification/sms/)

This tutorial builds on [part 1](doc:ruby-on-rails-two-factor-authentication-for-user-phone-numbers-part-1) of my two-factor authentication series. Please make sure you have completed part 1, as that takes care of setup and some of the database.

When users sign up for your app, they will be prompted to enter their phone number. Every time they sign in after that, a one-time password (OTP) will be texted to their phone. They will type that OTP into the website as a second step of the login process.
![web-app.png](images/b989e79-web-app.png)

I set up a simple welcome controller to redirect to when the user is logged in.

> 1.  Create **app/controllers/welcome\_controller.rb**, add working skeleton

```ruby
class WelcomeController < ApplicationController
   before_filter :authenticate_user!
   def index
   end
end
```

> 2.  Create the view in **app/views/welcome/index.html.erb**. You can make this view look however you like.
> 3.  Make your root route `welcome#index` in **routes.rb**

```ruby
root 'welcome#index'
```

Now, when users try to access your root domain, they will have to login.

## Set up Devise gem

I chose to use the gem [Devise](https://github.com/plataformatec/devise) to handle user authentication. After setting up the basic login with Devise, we’ll customize it to require two-factor authentication.

> 1.  Add `gem 'devise'` to your gemfile
> 2.  Run `$ bundle install`
> 3.  Run `$ rails generate devise:install`
> 4.  Run `$ rails generate devise User`
> 5.  Run `$ rake db:migrate`

## Add phone number field to user signup

First, add a phone number column to your users table:

> 1.  Run `$ rails g migration AddPhoneNumberToUsers`
> 2.  Edit migration file to look like this:

```ruby
class AddPhoneNumberToUsers < ActiveRecord::Migration
 def change
   add_column :users, :phone_number, :string
 end
end
```

> 3.  Run `$ rake db:migrate`

Now, create a custom registration controller to require a phone number when signing up. Create the file **app/controllers/registrations\_controller.rb**, have it inherit from the Devise registrations controller, and modify the Devise method sign\_up\_params.

```ruby
class RegistrationsController < Devise::RegistrationsController
  private
  def sign_up_params
    params.require(:user).permit(:phone_number, :email, :password, :password_confirmation)
  end
end
```

Then, in your routes file, change `devise_for :users` to `devise_for :users, :controllers => { registrations: 'registrations' }`.

Lastly, add a phone number field to the signup view. To override the default Devise view, create **app/views/regsitrations/new.html.erb**. Here is an example of how your view will look when you take the default Devise signup view and just add a phone number field at the top.

```html
<h2>Sign up</h2>

<%= form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f| %>
  <%= devise_error_messages! %>

  <div class="field">
    <%= f.label :phone_number %><br />
    <%= f.text_field :phone_number, autofocus: true %>
  </div>

  <div class="field">
    <%= f.label :email %><br />
    <%= f.email_field :email %>
  </div>

  <div class="field">
    <%= f.label :password %>
    <% if @minimum_password_length %>
    <em>(<%= @minimum_password_length %> characters minimum)</em>
    <% end %><br />
    <%= f.password_field :password, autocomplete: "off" %>
  </div>

  <div class="field">
    <%= f.label :password_confirmation %><br />
    <%= f.password_field :password_confirmation, autocomplete: "off" %>
  </div>

  <div class="actions">
    <%= f.submit "Sign up" %>
  </div>
<% end %>

<%= render "devise/shared/links" %>
```

## Set up two\_factor\_authentication gem

> 1.  Add `gem 'two_factor_authentication'` to your gemfile
> 2.  Run `$ bundle install`
> 3.  Run `$ bundle exec rails g two_factor_authentication user`
> 4.  Run `$ bundle exec rake db:migrate`
> 5.  Add `has_one_time_password` to the user model. Your user model should look like this:

```ruby
class User < ActiveRecord::Base
  devise :two_factor_authenticatable, :database_authenticatable, :registerable,
            :recoverable, :rememberable, :trackable, :validatable

  has_one_time_password

  def send_two_factor_authentication_code
    #send sms with code!
  end
end
```

## Send SMS using Sinch

For this part, we are going to be using [SMS verification](https://www.sinch.com/products/verification/sms/). This is very simple since you already have the `sinch_sms gem` included in your project. In `send_two_factor_authentication_code`, add the following line with your unique Sinch key and secret.

```ruby
SinchSms.send('YOUR_APP_KEY', 'YOUR_APP_SECRET', "Your code is #{otp_code}", phone_number)
```

Now you’re ready to try your two-factor authentication system. Spin up a local Rails server, navigate to the root URL, sign up as a new user, sign out, and try logging back in as that same user.

> **Note**
>
> You need to format the phone number according to [E.164](http://en.wikipedia.org/wiki/E.164) standards. For example, U.S. numbers need 1 + 3 digit area code + 7 digit phone number.

## Logging out

To keep things simple, I didn’t create a logout button. It’s very to simple to logout by deleting the session cookie. In Chrome, open the developer tools by right-clicking anywhere on the page and choosing ‘Inspect Element.’ (It’s similar in other browsers too.) Then, go to the ‘Resources’ tab and find the token that represents your app. See the screenshot below for a clear explanation of what to delete.

![logout_delete_token.png](images/88380d3-logout_delete_token.png)

Once deleted, refresh the page and you will be prompted to sign in.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/ruby/web-two-factor-authentication-using-rails-devise-and-sinch-part-3.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>