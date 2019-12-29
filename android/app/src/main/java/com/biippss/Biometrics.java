package com.biippss;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.Intent;
import java.util.Map;
import java.util.HashMap;
import com.greenbit.MultiscanJNIGuiJavaAndroid.MainActivity;
import com.greenbit.MultiscanJNIGuiJavaAndroid.LoginWithFingerprint;
import com.greenbit.MultiscanJNIGuiJavaAndroid.EnrollFingerprints;

public class Biometrics extends ReactContextBaseJavaModule {

  public Biometrics(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "Biometrics";
  }

  @ReactMethod
  public void destroyApp() {
    System.exit(0);
  }

  @ReactMethod
    public void startBiometrics(String content) {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, MainActivity.class);
        // intent.putExtra("contentToBiometrics", content);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
  }
  
  @ReactMethod
    public void startLoginBiometrics(String content) {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, LoginWithFingerprint.class);
        intent.putExtra("bippiis_number", content);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
  }
  
  @ReactMethod
    public void startEnrolBiometrics(String content) {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, EnrollFingerprints.class);
        intent.putExtra("bippiis_number", content);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
	}
	
}

