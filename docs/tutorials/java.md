---
title: "Java"
excerpt: "Tutorials for our Java SDK"
---
## Sinch ❤ Java

In this section you'll find tutorials specific to using the Sinch REST API from the Java platform.

## Getting Started

Before you start the tutorials in this section, please make sure you review the following steps:

### Create Your Free Sinch Account

Before starting, first make sure you have a Sinch account. You can create an account with free credits using the [Sinch Dashboard](https://dashboard.sinch.com/signup) to start sending messages in minutes.

Once your account is created and you're logged into the dashboard, you can obtain your credentials to the REST API (Service Plan ID and API Token) in the [APIs](https://dashboard.sinch.com/sms/api/rest) section. You'll use these credentials in the next steps below.

> **Information about trial mode limitations**
>
> When your account is in trial mode (such as when you've just created it), sending messages has the following limitations:
>
>  - The body of each message will be replaced by a generic message to prevent malicious uses of our API.
>  - Your messages will also be sent from a random phone number and the `sender` value will be ignored (although the API still requires a value so you must provide some value for the sender).

### Check Your Java JDK Version

Although the Sinch Java SDK is compatible with Java 6 and above, our tutorials will assume you are running **Java 8 or later**.

You will need to make sure the Java Development Kit (JDK) is installed on your computer. You can verify if you have the right version of the JDK installed by running this command in the terminal:

```shell
javac -version
```

If the command fails or the displayed version is smaller than `1.8`, you should download and install a more recent version of the JDK, available on the [Java SE Downloads](https://www.oracle.com/technetwork/java/javase/downloads/index.html) page.

### Get the Sinch Java SDK Library

The Java SDK is published on the [Maven Central](https://repo1.maven.org/maven2/com/clxcommunications/sdk-xms) repository which means it can easily be added to your project if you're using Gradle, Maven or another dependency management tool for the Java language. Instructions for most of the tools are
available on [mvnrepository](https://mvnrepository.com/artifact/com.clxcommunications/sdk-xms).

You can also manually download the JAR file from [Maven Central](https://repo1.maven.org/maven2/com/clxcommunications/sdk-xms) but you'll also need to add all of the other dependencies listed on [mvnrepository](https://mvnrepository.com/artifact/com.clxcommunications/sdk-xms).


The SDK is published on the [Maven Central](https://mvnrepository.com/artifact/com.clxcommunications/sdk-xms/1.0.2) repository.

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/java.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>