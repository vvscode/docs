---
id: "5d44894c449992010ba794e5"
title: "Send an SMS to one or more ad-hoc recipients"
excerpt: "In this tutorial, you'll learn the basics of sending an SMS from a Java application."
---
This tutorial will walk you through the steps to send an SMS using Sinch's Java SDK from a server or command line application.

# Prerequisites

## Create your free Sinch account

Before starting, first make sure you have a Sinch account. You can create an account with free credits to start sending messages using the [Sinch Dashboard](https://dashboard.sinch.com/signup).

Once your account is created and you're logged into the dashboard, you can obtain your credentials to the REST API (Service Plan ID and API Token) in the [APIs](https://dashboard.sinch.com/sms/api/rest) section. You'll use these credentials in the next steps below.

> **Trial mode limitations**
>
> When your account is in trial mode (such as when you've just created it), the message body of each message will be replaced by a generic message to prevent malicious uses of our API. Your messages will also be sent from a random phone number.

## Check your Java JDK version

The Sinch Java SDK is compatible with **Java 6** and above. You will need to make sure the Java Development Kit (JDK) is installed on your computer. You can verify if you have the right version of the JDK installed by running this command in the terminal: 

```shell
javac -version
```

If the command fails or the displayed version is smaller than `1.6`, you should download and install a more recent version of the JDK, available on the [Java SE Downloads](https://www.oracle.com/technetwork/java/javase/downloads/index.html) page.

## Get the Sinch Java SDK library

The Java SDK is published on the [Maven Central](https://repo1.maven.org/maven2/com/clxcommunications/sdk-xms) repository which means it can easily be added to your project if you're using Gradle, Maven or another dependency management tool for the Java language. Instructions for most of the tools are
available on [mvnrepository](https://mvnrepository.com/artifact/com.clxcommunications/sdk-xms).

You can also manually download the JAR file from [Maven Central](https://repo1.maven.org/maven2/com/clxcommunications/sdk-xms) but you'll also need to add all of the other dependencies listed on [mvnrepository](https://mvnrepository.com/artifact/com.clxcommunications/sdk-xms). 

# Send an SMS with Java

## Create a connection to the REST API

The SDK requires you to first create an `ApiConnection` object that you will re-use for interacting with the API for the entire duration your application is running. This `ApiConnection` instance should be created once and closed when your application is shut down. It is not recommended and not efficient to create an `ApiConnection` instance for every interaction with the API.

An instance of the `ApiConnection` object can only be created using the `ApiConnection.builder()` method and its associated builder:

```java
import com.clxcommunications.xms.ApiConnection;

ApiConnection connection = ApiConnection.builder()
        .servicePlanId("{YOUR_SERVICE_PLAN_ID}")
        .token("{YOUR_API_TOKEN}")
        .start();
```

## Send an SMS to one or multiple recipients

Once an `ApiConnection` object is created and started, you can use it to interact with the API, such as sending an SMS message to one recipient:

```java
import com.clxcommunications.xms.ClxApi;

connection.createBatch(ClxApi.batchTextSms()
        .sender("12345")
        .addRecipient("{RECIPIENT_PHONE_NUMBER}")
        .body("Hello from Sinch!")
        .build());
```

Or sending the same message to multiple recipients:

```java
import com.clxcommunications.xms.ClxApi;

connection.createBatch(ClxApi.batchTextSms()
        .sender("12345")
        .addRecipient("{RECIPIENT_1_PHONE_NUMBER}")
        .addRecipient("{RECIPIENT_2_PHONE_NUMBER}")
        .body("Hello from Sinch!")
        .build());
```

## Close the connection to the REST API when your application shuts down

When your application is shutting down, you should stop the `ApiConnection` that was created to interact with the REST API:

```java
connection.stop();
```

There are multiple ways you can ensure the `ApiConnection` is closed upon shut down of your application:

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
  
# Wrap up

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
                            .sender("12345")
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