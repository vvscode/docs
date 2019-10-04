---
title: "Send SMS in PHP"
excerpt: "Sending SMS from applications is more popular than ever, and this small script will enable you to send SMS in PHP. Find out more and sign up with Sinch today."
---
Sending SMS from applications is more popular than ever, and this small script will enable you to send SMS in PHP.

## Setup

> 1.  Create a [Sinch developer account](https://portal.sinch.com/#/signup)
> 2.  In your developer dashboard, click “Apps” in the left menu
> 3.  Click “Create new app”
> 4.  Name your app and click “Create”
> 5.  Plug your app key and secret into the script below

```php
<?php
$key = "your_app_key";
$secret = "your_app_secret";
$phone_number = "your_phone_number";

$user = "application\\" . $key . ":" . $secret;
$message = array("message"=>"Test");
$data = json_encode($message);
$ch = curl_init('https://messagingapi.sinch.com/v1/sms/' . $phone_number);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_USERPWD,$user);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$result = curl_exec($ch);

if(curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    echo $result;
}
curl_close($ch);
?>
```

## Run it

Once you’ve put your app key and secret into the above script, run it from the command line using:

```php
php name_of_script_file.php
```

## Note about authentication

Please note that using basic authentication (as shown above) is only supported in Sinch clientapi applications. For production apps, we require that you sign your requests. To sign your requests in PHP, take a look at [this tutorial](doc:authenticate-to-the-sinch-javascript-sdk-from-your-php-backend).

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/php/send-sms-in-php.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>