---
title: "Send an SMS to one or more ad-hoc recipients"
excerpt: "In this tutorial, you'll learn the basics of sending an SMS from a Java application."
---
This tutorial will walk you through the steps to send an SMS using Sinch's Java SDK from a server or command line application.

## Prerequisites

Before starting, please make sure that:

 - You have created your Sinch account
 - The right version of the JDK is installed on your computer
 - You have added the Sinch Java SDK JAR to your project

All details of those steps are available on the [Java Getting Started page](doc:java).

## Send an SMS with Java

### Create a connection to the REST API

The SDK requires you to first create an `ApiConnection` object that you will re-use for interacting with the API for the entire duration your application is running. This `ApiConnection` instance should be created once and closed when your application is shut down. It is not recommended and not efficient to create an `ApiConnection` instance for every interaction with the API.

An instance of the `ApiConnection` object can only be created using the `ApiConnection.builder()` method and its associated builder:

```java
import com.clxcommunications.xms.ApiConnection;

ApiConnection connection = ApiConnection.builder()
        .servicePlanId("{YOUR_SERVICE_PLAN_ID}")
        .token("{YOUR_API_TOKEN}")
        .start();
```

### Send an SMS to one or multiple recipients

Once an `ApiConnection` object is created and started, you can use it to interact with the API, such as sending an SMS message to one recipient:

```java
import com.clxcommunications.xms.ClxApi;

connection.createBatch(ClxApi.batchTextSms()
        .sender("ignored")
        .addRecipient("{RECIPIENT_PHONE_NUMBER}")
        .body("Hello from Sinch!")
        .build());
```

Or sending the same message to multiple recipients:

```java
import com.clxcommunications.xms.ClxApi;

connection.createBatch(ClxApi.batchTextSms()
        .sender("ignored")
        .addRecipient("{RECIPIENT_1_PHONE_NUMBER}")
        .addRecipient("{RECIPIENT_2_PHONE_NUMBER}")
        .body("Hello from Sinch!")
        .build());
```

### Close the connection to the REST API when your application shuts down

When you're done using the `ApiConnection` or when your application is shutting down, you should stop the `ApiConnection` that was created to interact with the REST API:

```java
connection.stop();
```

This is to ensure all resources created by the SDK such as the thread pool are stopped and freed. 

There are multiple ways you can ensure the `ApiConnection` is closed:

 - **_try/finally_ statement**
   
   If you're building a simple command line application, wrapping the code that interacts with the API in a _try/finally_ block will ensure the connection is always closed:
   
``` java 
ApiConnection connection = ApiConnection.builder()
        .servicePlanId("{YOUR_SERVICE_PLAN_ID}")
        .token("{YOUR_API_TOKEN}")
        .start();

try {
    // interact with the `connection` instance
} finally {
    connection.close();
}
```

 - **_try-with-resources_ statement (Java 8+)**
  
   Because the `ApiConnection` implements the `Closeable` interface, it can be used in a try-with-resources statement as a simpler alternative to try/finally:
   
``` java 
ApiConnection connection = ApiConnection.builder()
        .servicePlanId("{YOUR_SERVICE_PLAN_ID}")
        .token("{YOUR_API_TOKEN}")
        .start();

try (connection) {
    // interact with the `connection` instance
}
```  
 
 - **JVM Shutdown Hook**
 
   Shutdown hooks allow you to execute code when the JVM is shutting down. [Learn more about shutdown hooks](https://docs.oracle.com/javase/8/docs/api/java/lang/Runtime.html#addShutdownHook-java.lang.Thread-))
 
 - **JSR-250/330 `@PreDestroy` hooks**
 
   Dependency Injection frameworks such as Spring, Guice or Picocontainer offer specific tools to execute code when the JVM is shutting down, such as the [`@PreDestroy` annotation](https://docs.oracle.com/javase/8/docs/api/javax/annotation/PreDestroy.html)
  
## Wrap up

To wrap up, here's the complete sources of a minimal Java application that starts a connection to the Sinch REST API, sends a message then closes the connection.

```java
import com.clxcommunications.xms.ApiConnection;
import com.clxcommunications.xms.ApiException;
import com.clxcommunications.xms.ClxApi;
import com.clxcommunications.xms.api.MtBatchTextSmsResult;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SendMessage {
    private static final Logger log = Logger.getLogger(SendMessage.class.getName());

    private static final String SERVICE_PLAN_ID = "{YOUR_SERVICE_PLAN_ID}";
    private static final String API_TOKEN = "{YOUR_API_TOKEN}";
    private static final String RECIPIENT_PHONE_NUMBER = "{YOUR_PHONE_NUMBER}";

    public static void main(String[] args) throws IOException {

        ApiConnection conn = ApiConnection.builder()
                .servicePlanId(SERVICE_PLAN_ID)
                .token(API_TOKEN)
                .start();

        try {
            MtBatchTextSmsResult result =
                    conn.createBatch(ClxApi.batchTextSms()
                            .sender("ignored")
                            .addRecipient(RECIPIENT_PHONE_NUMBER)
                            .body("Hello from Sinch!")
                            .build());

            log.log(Level.INFO, "SMS sent with batch ID " + result.id());

        } catch (InterruptedException e) {
            log.log(Level.SEVERE, "Send interrupted.", e);
        } catch (ApiException e) {
            log.log(Level.SEVERE, "SMS could not be sent.", e);
        } finally {
            conn.close();  
        }
    }                
}
```

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/java/tutorial-java-send-sms.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>