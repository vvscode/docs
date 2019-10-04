---
title: "Phone Calls with Android Contact Picker"
excerpt: "This tutorial shows you how to use the Android Contact Picker to let users choose a phone number from their contact book. Later we go trough how you can make a call with Sinch."
---
In this tutorial, I will walk you through using the Android Contact Picker to let your users choose a phone number from their contact book. Upon finishing this tutorial, you can follow our [Android calling tutorials](doc:call-a-phone-number-from-your-android-app-with-sinch) to make a call with Sinch.

If you get stuck at any point, you can check out the finished source code on our [GitHub](http://www.github.com/sinch/android-contact-chooser).

## Setup

If you haven’t already, [sign up for a Sinch account](https://portal.sinch.com/#/signup). Create a new app and take note of the key and secret.

## User interface

The user interface is as simple as can be—just a button\!

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context=".ChooseContact">

    <Button
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="Choose contact"
        android:id="@+id/button"
        android:gravity="center"
        android:layout_centerVertical="true"/>
</RelativeLayout>
```

Users will click this button to make the contact picker pop up.

## Choose contact

Move back over to your main activity java file. In onCreate, set an onClickListener for the button. When the button is clicked, you want to create an intent that opens the contact book and returns a result when a user is clicked.

```java
//declare globally, this can be any int
public final int PICK_CONTACT = 2015;

//onCreate
(findViewById(R.id.button)).setOnClickListener( new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Intent i = new Intent(Intent.ACTION_PICK, ContactsContract.CommonDataKinds.Phone.CONTENT_URI);
        startActivityForResult(i, PICK_CONTACT);
    }
});
```

After the user has chosen a contact, you need to parse the result returned from startActivityForResult for a phone number.

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == PICK_CONTACT && resultCode == RESULT_OK) {
        Uri contactUri = data.getData();
        Cursor cursor = getContentResolver().query(contactUri, null, null, null, null);
        cursor.moveToFirst();
        int column = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER);
        (new normalizePhoneNumberTask()).execute(cursor.getString(column));
        Log.d("phone number", cursor.getString(column));
    }
}
```

If you run the app now, it will print the chosen phone number in your logs.

## Normalize phone number

To ready this phone number to be used to make a call with Sinch, you will use an AsyncTask to make a call to our phone number normalization API. See the comments below for an explanation of what’s happening:

```java
class normalizePhoneNumberTask extends AsyncTask<String, Void, String> {

    //input your app key and secret from the Sinch dashboard
    private String appKey = "your_app_key";
    private String appSecret = "your_app_secret";

     //takes phone number string as an argument
     @Override
     protected String doInBackground(String... params) {

         String normalizedPhoneNumber = "";

         try {
             //get ready to make a get request to normalize the phone number
             HttpClient httpclient = new DefaultHttpClient();
             HttpGet httpGet = new HttpGet("https://callingapi.sinch.com/v1/calling/query/number/" + params[0].replaceAll("\\s+",""));

             //sinch uses basic authentication
             String usernamePassword = "application:" + appKey + ":" + appSecret;
             String encoded = Base64.encodeToString(usernamePassword.getBytes(), Base64.NO_WRAP);
             httpGet.addHeader("Authorization", "Basic " + encoded);

             //handle the response
             HttpResponse response = httpclient.execute(httpGet);
             ResponseHandler<String> handler = new BasicResponseHandler();

             //parse JSON response from Sinch to get phone number
             normalizedPhoneNumber = parseJSONResponse(handler.handleResponse(response));
         } catch (ClientProtocolException e) {
             Log.d("ClientProtocolException", e.getMessage());
         } catch (IOException e) {
             Log.d("IOException", e.getMessage());
         }

         return normalizedPhoneNumber;
     }

     //once the asynctask is complete, display a toast message with the normalized phone number
     @Override
     protected void onPostExecute(String normalizedPhoneNumber) {
         //if you want to make a call with sinch, this is the place to do it!
         Toast.makeText(getApplicationContext(), normalizedPhoneNumber, Toast.LENGTH_LONG).show();
     }

     //the sinch api returns a json like {"number":{"restricted":false,"countryId":"US","numberType":"Mobile","normalizedNumber":"+16507141052"}}
     //this method will return a string of just the phone number, +16507141052
     private String parseJSONResponse(String jsonString) {

         String returnString = "";

         try {
             JSONObject jsonObject = new JSONObject(jsonString);
             returnString = jsonObject.getJSONObject("number").getString("normalizedNumber");
         } catch (JSONException e) {
             Log.d("JSONException", e.getMessage());
         }

         return returnString;
     }
}
```

Now, you can run the app, choose a contact, and a toast message of the normalized number will pop up.

I hope this gives a good example of how to use the Android Contact Picker. Next up, we will be using Sinch to make a phone call with that number. Head over to our [Android tutorial](doc:call-a-phone-number-from-your-android-app-with-sinch).

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/android/phone-calls-with-android-contact-picker.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>