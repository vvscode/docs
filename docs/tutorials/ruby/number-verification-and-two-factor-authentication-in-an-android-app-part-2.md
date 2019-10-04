---
title: "Number Verification and Two-Factor Authentication in an Android App - Part 2"
excerpt: "Learn how to build an Android Client App that uses verification API."
---
> **Update**
>
> To verify numbers even easier, check out our [Verification SDK](https://www.sinch.com/products/verification/sms/)

In this part of the tutorial, you will build an Android client app that uses the verification API you built in [part 1](doc:ruby-on-rails-two-factor-authentication-for-user-phone-numbers-part-1).

Your finished app will look like this:
![app-screen.png](images/3ca9504-app-screen.png)

Start by creating a new project in Android Studio. I’ll call the first activity **GetCodeActivity**. In this activity, the user will input his or her phone number and then you will make a request to your-website.com/generate (from part 1 of this tutorial) to generate a one-time code.

Start by adding permission to use the internet:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

The view is a simple input box and a button to make the request.

```xml
<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:inputType="phone"
    android:id="@+id/phoneNumber"
    android:hint="your phone number"/>

<Button
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Get Code"
    android:id="@+id/getCodeButton"
    android:layout_below="@+id/phoneNumber"
    android:onClick="getCodeButtonClick"/>
```

When the button is clicked, get the phone number that was typed in and use a background task to make the post request:

```java
public void getCodeButtonClick(View v) {
    String phoneNumber = ((EditText) findViewById(R.id.phoneNumber)).getText().toString();
    (new GetCode()).execute(phoneNumber);
}

class GetCode extends AsyncTask<String, Void, Void> {

    private String phoneNumber;

    @Override
    protected Void doInBackground(String... params) {
        HttpClient httpClient = new DefaultHttpClient();

        phoneNumber = params[0];

        try {
            HttpPost request = new HttpPost("http://your-url.com/generate");
            StringEntity se = new StringEntity("{\"phone_number\":\"" + phoneNumber + "\"}");
            request.addHeader("Content-Type", "application/json");
            request.setEntity(se);
            httpClient.execute(request);
        } catch (Exception e) {
            Log.d("GetCode", "Request exception:" + e.getMessage());
        } finally {
            httpClient.getConnectionManager().shutdown();
        }

        return null;
    }

    @Override
    protected void onPostExecute(Void v) {
        Intent intent = new Intent(getApplicationContext(), VerifyCodeActivity.class);
        intent.putExtra("phoneNumber", phoneNumber);
        startActivity(intent);
    }
}
```

You’ll notice in `onPostExecute`, you start the next activity. Go ahead on create that activity, **VerifyCodeActivity**. Once the user receives the text message with the one-time code, her or she will enter the code here. The view is very similar to **GetCodeActivity**:

```xml
<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:inputType="phone"
    android:id="@+id/code"
    android:layout_alignParentTop="true"/>

<Button
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Verify Code"
    android:id="@+id/verifyCodeButton"
    android:layout_below="@+id/code"
    android:onClick="verifyCodeButtonClick"/>
```

When the user clicks the “Verify Code” button, your app will make a request to see if the phone number/code combo exists in your database. Then, it will display a toast message with the result:

```java
public void verifyCodeButtonClick(View v) {
        String code = ((EditText) findViewById(R.id.code)).getText().toString();
        (new VerifyCode()).execute(phoneNumber, code);
    }

    class VerifyCode extends AsyncTask<String, Void, Void> {
        @Override
        protected Void doInBackground(String... params) {
            HttpClient httpClient = new DefaultHttpClient();

            try {
                HttpPost request = new HttpPost("http://your-url.com/verify");
                StringEntity se = new StringEntity("{ \"phone_number\":\""+ params[0] +"\", \"code\":\"" + params[1] + "\"}");
                request.addHeader("Content-Type", "application/json");
                request.setEntity(se);
                HttpResponse response = httpClient.execute(request);
                ResponseHandler<String> handler = new BasicResponseHandler();
                String httpResponse = handler.handleResponse(response);
                JSONObject responseJSON = new JSONObject(httpResponse);
                if (responseJSON.getString("verified").toString().equals("true")) {
                    verified = true;
                } else {
                    verified = false;
                }
            } catch (Exception e) {
                Log.d("Exception", "Request exception:" + e.getMessage());
            } finally {
                httpClient.getConnectionManager().shutdown();
            }

            return null;
        }

        @Override
        protected void onPostExecute(Void v) {
            Toast.makeText(getApplicationContext(), "Verified: " + verified, Toast.LENGTH_LONG).show();
        }
    }
```

You’re ready to test your app\! Verify a correct code and then press the “Verify code” button a second time; you’ll notice that the code doesn’t work anymore since it’s a one-time use code.

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/ruby/number-verification-and-two-factor-authentication-in-an-android-app-part-2.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>