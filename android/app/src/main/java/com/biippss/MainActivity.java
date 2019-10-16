package com.biippss;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // here
import android.os.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {

    Handler handler;
    Runnable r;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Boiler";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SplashScreen.show(this);  // here
        handler = new Handler();
        r = new Runnable() {

        @Override
        public void run() {
               
                // WritableMap params = Arguments.createMap();
                getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onIdle", "wow");
                
            }
        };
        startHandler();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        // data.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        super.onActivityResult(requestCode, resultCode, data);
        // MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onUserInteraction() {
       
        super.onUserInteraction();
        stopHandler();//stop first and then start
        startHandler();
    }
    public void stopHandler() {
        handler.removeCallbacks(r);
    }
    public void startHandler() {
        long time = 5 * 60 * 1000;
        handler.postDelayed(r, time); //for 5 minutes 
    }
}
