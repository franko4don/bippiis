package com.biippss;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import org.reactnative.camera.RNCameraPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.RNPlayAudio.RNPlayAudioPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.SvgPackage;
import com.microsoft.codepush.react.CodePush;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import cl.json.RNSharePackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.entria.views.RNViewOverflowPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;
// import com.facebook.CallbackManager;
// import com.facebook.FacebookSdk;
import com.biippss.KillAppPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  // private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  // protected static CallbackManager getCallbackManager() {
  //   return mCallbackManager;
  // }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new RNCameraPackage(),
            new LocationServicesDialogBoxPackage(),
            new RNFusedLocationPackage(),
            SendSMSPackage.getInstance(),
            new RNSendIntentPackage(),
            new ReactNativeContacts(),
            new ReactNativePushNotificationPackage(),
            new RNFetchBlobPackage(),
            new RNSpinkitPackage(),
            new RNPlayAudioPackage(),
            new LinearGradientPackage(),
            new PickerPackage(),
            new RNAccountKitPackage(),
            new TwitterSigninPackage(),
            new AsyncStoragePackage(),
            new RNDeviceInfo(),
            new RNCWebViewPackage(),
            new SplashScreenReactPackage(),
            new ImagePickerPackage(),
            new SvgPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this),
            new RNSharePackage(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(),
            new RNViewOverflowPackage(),
            new VectorIconsPackage(),
            new KillAppPackage(),
            new SQLitePluginPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // FacebookSdk.setApplicationId("2430663280550309");
    // FacebookSdk.sdkInitialize(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
