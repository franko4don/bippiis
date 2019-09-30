
# Setup

##### Clone the entire Repository
git clone [git@gitlab.com:ugarsoft-dev-team/react-native-multiapp-boilerplate.git](git@gitlab.com:ugarsoft-dev-team/react-native-multiapp-boilerplate.git)

##### Clone A Particular Branch
git clone --single-branch --branch branch-name [git@gitlab.com:ugarsoft-dev-team/react-native-multiapp-boilerplate.git](git@gitlab.com:ugarsoft-dev-team/react-native-multiapp-boilerplate.git)

Run `npm install` to install all the dependencies
Rename `boiler` folder to your project name folder
Modify the path in `store.js` to rhyme with your project name

### Note 
If you get a `duplicate package` error simply locate `react-native-twitter-signin` in `node_modules`
navigate to node_modules inside `react-native-twitter-signin` and delete `react-native` folder

Getting this error `error: package android.support.annotation does not exist
import android.support.annotation.NonNull;`?

Modify `react-native-google-signin/android/src/main/java/co/apptailor/googlesignin/Utils.java` 
and 
`react-native-google-signin/android/src/main/java/co/apptailor/googlesignin/RNGoogleSigninModule.java`

By replacing 
`import android.support.annotation.NonNull;`  with `import androidx.annotation.NonNull`

`import android.support.annotation.Nullable;` with `import androidx.annotation.Nullable`


### Android users
Modify sdk path in local.properties file located in android folder to your system android sdk path

#### npm run ios

#### npm run android

To run the app on your device or emulator

# Warning
Push only the boiler folder to the working branch