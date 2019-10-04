---
title: "Authenticate to the Sinch JavaScript SDK From Your PHP Backend"
excerpt: "In this tutorial you will learn how to authenticate to Sinch JS SDK from a PHP backend. Use it to securely start the Sinch Client."
---
*Shoutout to* [Rob Holmes](https://twitter.com/robholmes) *from* [i6systems.com](http://i6systems.com) *for putting together this sample code for us\!*

Define the following class to generate a user ticket to authenticate to the Sinch JavaScript SDK:

```javascript
class SinchTicketGenerator
{

    private $applicationKey;
    private $applicationSecret;

    public function __construct($applicationKey, $applicationSecret)
    {
        $this->applicationKey = $applicationKey;
        $this->applicationSecret = $applicationSecret;
    }

    public function generateTicket($username, DateTime $createdAt, $expiresIn)
    {
        $userTicket = [
            'identity' => [
                'type'      => 'username',
                'endpoint'  => $username,
            ],
            'expiresIn'         => $expiresIn,
            'applicationKey'    => $this->applicationKey,
            'created'           => $createdAt->format('c'),
        ];
        $userTicketJson = preg_replace('/\s+/', '', json_encode($userTicket));

        $userTicketBase64 = $this->base64Encode($userTicketJson);

        $digest = $this->createDigest($userTicketJson);

        $signature = $this->base64Encode($digest);

        $userTicketSigned = $userTicketBase64.':'.$signature;

        return $userTicketSigned;
    }

    private function base64Encode($data)
    {
        return trim(base64_encode($data));
    }

    private function createDigest($data)
    {
        return hash_hmac('sha256', $data, base64_decode($this->applicationSecret), true);
    }
}
```

You can use the above class like so:

```javascript
$generator = new SinchTicketGenerator('YOUR_APP_KEY', 'YOUR_APP_SECRET');
$signedUserTicket = $generator->generateTicket('YOUR_USERNAME', new DateTime(), 3600);
```

“YOUR\_USERNAME” is any way you uniquely identify your users, and “3600” is the number of seconds in which the ticket will expire.

If you don’t yet have an app key and secret from Sinch, you can get them for free here: <https://portal.sinch.com/#/signup>.

Once you’ve successfully generated the ticket, you can use it to securely start the Sinch client. Follow any of our client-side JavaScript tutorials to use the Sinch client to make phone calls and send instant messages:

 - [Phone calling](doc:using-sinch-js-sdk-to-call-a-phone-number)
 - [App-to-app calling](doc:turn-your-browser-into-a-phone-with-the-sinch-js-sdk)

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/php/authenticate-to-the-sinch-javascript-sdk-from-your-php-backend.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>