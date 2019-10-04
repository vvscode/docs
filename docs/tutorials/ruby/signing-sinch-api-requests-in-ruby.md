---
title: "Signing Sinch API Requests in Ruby"
excerpt: "Why sign your requests instead of using basic authentication? It’s much more secure and Sinch doesn’t support basic authentication for production applications."
---
Why sign your requests instead of using basic authentication? It’s much more secure and Sinch doesn’t support basic authentication for production applications.

> **Note** 
> 
> This has the same functionality as our [Ruby gem for sending SMS](https://www.sinch.com/tutorials/send-sms-ruby/).

To get started, I’ll show you how to sign a request to send an SMS. Create an empty ruby file—I’ll call mine **sms.rb**—and add the following:

```ruby
require "base64"
require "openssl"
require "time"
require "net/http"
require "uri"
require "json"

to = "phone_number_with_country_code"
message = "your_message"
key = "your_app_key"
secret = "you_app_secret"

body = "{\"message\":\"" + message + "\"}"
timestamp = Time.now.iso8601
http_verb = "POST"
path = "/v1/sms/" + to
scheme = "Application"
content_type = "application/json"
digest = OpenSSL::Digest.new('sha256')
canonicalized_headers = "x-timestamp:" + timestamp
content_md5 = Base64.encode64(Digest::MD5.digest(body.encode("UTF-8"))).strip
string_to_sign = http_verb + "\n" + content_md5 + "\n" + content_type + "\n" + canonicalized_headers + "\n" + path
signature = Base64.encode64(OpenSSL::HMAC.digest(digest, Base64.decode64(secret), string_to_sign.encode("UTF-8"))).strip
authorization = "Application " + key + ":" + signature

uri = URI.parse("https://messagingApi.sinch.com" + path)
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE
headers = {"content-type" => "application/json", "x-timestamp" => timestamp, "authorization" => authorization}
request = Net::HTTP::Post.new(uri.request_uri)
request.initialize_http_header(headers)
request.body = body
puts JSON.parse(http.request(request).body)
```

Then, fill in the first four variables with a phone number that can receive SMS (with country code), the text of the message you want to send, and your app key and secret from the Sinch dashboard.

If you don’t yet have a Sinch account, head over to the [portal](https://portal.sinch.com/#/signup) to create an account. Then click ‘create new app’ to make your first app. This will generate a key and secret for you to use.

To run sms.rb, type the following onto your command line:

```shell
ruby sms.rb
```

If successful, you will see the message ID printed and you will receive the text in a few seconds.

## Debugging tips

 - Use the example [in the documentation](doc:authorization) with the sample app key and secret to make sure that your signature matches the example at different points along the way.
 - Capitalization matters\! The headers that you send with the request need to be exactly the same as the ones in your canonicalized\_headers. Same goes for content-type.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/ruby/signing-sinch-api-requests-in-ruby.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>