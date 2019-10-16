package com.biippss;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.Intent;
import com.biippss.usbprinter.MainActivity;
import java.util.Map;
import java.util.HashMap;

public class Print extends ReactContextBaseJavaModule {

  public Print(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "Print";
  }

  @ReactMethod
  public void destroyApp() {
    System.exit(0);
  }

  @ReactMethod
    public void startPrinter(String content) {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, MainActivity.class);
        intent.putExtra("contentToPrint", content);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
	}
	
}

