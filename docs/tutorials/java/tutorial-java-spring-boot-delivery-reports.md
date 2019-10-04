---
title: "Receive SMS delivery reports in a Spring Boot application"
excerpt: "In this more advanced installment of our Java tutorial series, you'll learn how you can keep track of the delivery of SMS messages you send via the Sinch REST API."
---
The Sinch REST API keeps track of the delivery status of each message you send and makes that status available to your application in 2 ways:

 1) Via [polling / pull](doc:sms-rest-batches-endpoint#section-retrieve-a-delivery-report): your application can fetch the delivery notifications at regular intervals with GET HTTP requests.
 2) Via [callbacks / push](doc:sms-rest-callback#section-delivery-report-callback): the Sinch REST API will make an HTTP POST request to your application with details of the delivery report included in the request body.
 
This tutorial will show you how to setup an endpoint in your Spring Boot application to respond to the delivery reports callbacks.

## Prerequisites

Before starting, please make sure that:

 - You have [created your Sinch account](doc:java#section-create-your-free-sinch-account)
 - The right version of the JDK is installed on your computer
 - You have added the Sinch Java SDK JAR to your project

All details of those steps are available on the [Java Getting Started page](doc:java).

## Create a Spring Boot Project

> **Note**
> 
> You can [skip these steps](#section-add-a-delivery-report-callback-controller) if you already have a functional Spring Boot project. This tutorial assumes the use of Spring Boot 2.1+, although it might work with earlier version.

### Bootstrap An Empty Application Using Spring Initializr

The Spring project provides the [_Initializr_](https://start.spring.io/) tool to quickly get up and running with a Spring Boot application. [Fill the form](https://start.spring.io/) and download the resulting ZIP archive, extract it where you want to work and you're good to go!

Once you've extracted the ZIP in a suitable location, open a Terminal and run this command in the project directory:

    $ ./gradlew bootRun
    
This command should install Gradle, compile, package then run your shiny new Spring Boot application.

### Add Dependencies to the Gradle Build File

In the `build.gradle` file, make sure your dependencies includes both `spring-boot-starter-web` and the Sinch Java SDK:

```groovy
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'

	compile 'com.clxcommunications:sdk-xms:1.0.2'
}
```

## Add a Delivery Report Callback Controller

To notify our application of delivery events, the Sinch REST API will send us POST HTTP requests with the details of each delivery reports. 
Thus, we need to add a new endpoint to our application that will parse the HTTP POST body and make it available to our application for processing. 

Fortunately, the Sinch Java SDK already contains classes with Jackson annotations that support unmarshalling from JSON payloads out-of-the-box! Creating a Sinch callback endpoint in our Spring application is just a matter of declaring a new controller method with a `BatchDeliveryReport` parameter extracted from the body: 

```java
@RestController
public class DeliveryReportController {

    @PostMapping(path = "/sms/deliveryReport")
    public ResponseEntity receiveReport(@RequestBody BatchDeliveryReport report) {

        System.out.println("Received delivery report: " + report);

        // ... process the delivery report ...

        return ResponseEntity.ok().build();
    }
}
```

## Allow Sinch REST API to Reach Your Application

Now that we have a POST endpoint to respond to Sinch callbacks, how can we test this works? We could deploy our application to a publicly-exposed Web server (i.e. on AWS, Google Cloud, Heroku, Digital Ocean, etc.), but that would be too much work and completely out of scope for this tutorial. 

[Ngrok](https://ngrok.com/) to the rescue! Ngrok is a free lightweight application you install on your computer that automatically creates a tunnel to expose one of your local network ports to the Internet without the need to configure anything on your router. 

[Follow the instructions to install Ngrok](https://ngrok.com/download) on your computer, and once the `ngrok` binary is available in your path, fire up a tunnel to expose the default Spring Boot port on the Internet:

    $ ngrok http 8080
    
This should give you the following output:
    
```
ngrok by @inconshreveable                                                                                      
                                                                                                                                       
Session Status                online                                                                                               
Session Expires               7 hours, 59 minutes                                                                                  
Version                       2.3.34                                                                                               
Region                        United States (us)                                                                                   
Web Interface                 http://127.0.0.1:4040                                                                                
Forwarding                    http://9d62bf5a.ngrok.io -> http://localhost:8080                                                    
Forwarding                    https://9d62bf5a.ngrok.io -> http://localhost:8080                                                   
                                                                                                                                   
Connections                   ttl     opn     rt1     rt5     p50     p90                                                          
                              0       0       0.00    0.00    0.00    0.00
```       

Take note of the `https://...` public URL that Ngrok has assigned to your tunnel in the second line starting with `Forwarding`. In the above example, this URL is `https://9d62bf5a.ngrok.io`, but Ngrok assigns a different URL for each tunnel so you'll need to take note of the one specific for your tunnel. This is the URL you'll give to Sinch as the callback URL for your test message.

To test the tunnel works, start your Spring Boot application:

     $ ./gradlew bootRun
     
In another terminal window, run this cURL command, _replacing the URL with the forwarding URL that Ngrok has assigned to your tunnel earlier_:

     $ curl https://9d62bf5a.ngrok.io/sms/deliveryReport

If everything is working, you should see a similar response from your application:

```json
{"timestamp":"2019-08-14T15:03:28.156+0000","status":405,"error":"Method Not Allowed","message":"Request method 'GET' not supported","path":"/sms/deliveryReport"}
```

Receiving a `405 Method Not Allowed` response is normal, we've attempted to make a `GET` request with cURL, whereas our application expects a `POST`. The important part is that we've reached our application via the public URL (`https://`) via Ngrok. 

Your locally-running application is now exposed to the Internet! 

## Send a Test SMS With Your Publicly-Exposed Callback

To complete our experiment, we can now send a test SMS requesting a delivery report and specifying our publicly-exposed URL endpoint as the callback. 

With both **Ngrok** and **your Spring Boot application** running, run the following cURL command.

```shell
curl -X POST \
           -H "Authorization: Bearer {API_TOKEN}" \
           -H "Content-Type: application/json"  -d '
            {
                    "from": "ignored",
                    "to": [
                            "{PHONE_NUMBER}"
                    ],
                    "delivery_report": "summary",
                    "callback_url": "https://9d62bf5a.ngrok.io/sms/deliveryReport",
                    "body": "Hello from Sinch!"
            }' \
    "https://api.clxcommunications.com/xms/v1/{SERVICE_PLAN_ID}/batches"
```

Don't forget to put the right values in place of the `{API_TOKEN}`, `{SERVICE_PLAN_ID}`, `{PHONE_NUMBER}` placeholders and the `callback_url` should match the URL that has been assigned to your tunnel by Ngrok earlier. 

After a few seconds, if everything works, you should see a similar line output to the console of your Spring Boot application:

```
Received delivery report: BatchDeliveryReport{batchId=lLyJpEI8W8hjFH9L, totalMessageCount=1, statuses=[Status{code=0, status=DeliveryStatus{status=Delivered}, count=1, recipients=[]}]}
```

This confirms that our application can successfully accept delivery reports sent by the Sinch REST API. 

## Wrap Up

This tutorial has shown you how to create a POST endpoint that can parse delivery reports callbacks sent by the Sinch REST API. In addition, you've learnt how to use Ngrok to expose a locally-running Web application and use that to your advantage to do a full round-trip test of delivery reports.

A fully functional Ngrok + Spring Boot project has been [published to GitHub](https://github.com/sinch/tutorial-java-sms-delivery-reports) to quickly get up and running testing Sinch delivery reports with your REST API account. You're free to try it out!

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/java/tutorial-java-spring-boot-delivery-reports.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>