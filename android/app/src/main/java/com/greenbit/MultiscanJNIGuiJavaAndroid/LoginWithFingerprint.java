package com.greenbit.MultiscanJNIGuiJavaAndroid;

/*
 * Any comment that starts with "// 5ran6:" is exactly the functions/variables you need to deal with. Really Appreciate. Thanks.
 *
 * Before this activity is called, the bippiis number is provided in a previous activity and an
 * API is made to download the persons fingerprints to a directory called 
 * /emulated/0/Greenbit [this is in the root directory of the internal memory...inside the greenbit folder. If folder does
 * not exists, please let it be created].
 * 
 * Basically, this activity asks for any finger to be placed, then it captures and compares with the files in the
 * folder. If true, ret = true on line 977 
 * 
 * */

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Handler;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.appcompat.app.AppCompatActivity;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;
import android.widget.Spinner;
import android.widget.TextView;
import com.biippss.R;

import com.greenbit.MultiscanJNIGuiJavaAndroid.utils.Tools;
import com.greenbit.ansinistitl.GBANJavaWrapperDefinesReturnCodes;
import com.greenbit.ansinistitl.Gban2000JavaWrapperLibrary;
import com.greenbit.bozorth.BozorthJavaWrapperLibrary;
import com.greenbit.gbfinimg.GbfinimgJavaWrapperDefineSegmentImageDescriptor;
import com.greenbit.gbfinimg.GbfinimgJavaWrapperDefinesInputImageType;
import com.greenbit.gbfinimg.GbfinimgJavaWrapperDefinesProcessOptions;
import com.greenbit.gbfinimg.GbfinimgJavaWrapperDefinesReturnCodes;
import com.greenbit.gbfinimg.GbfinimgJavaWrapperLibrary;
import com.greenbit.gbfir.GbfirJavaWrapperDefinesReturnCodes;
import com.greenbit.gbfir.GbfirJavaWrapperLibrary;
import com.greenbit.gbfrsw.GbfrswJavaWrapperDefinesImageFlags;
import com.greenbit.gbfrsw.GbfrswJavaWrapperDefinesReturnCodes;
import com.greenbit.gbfrsw.GbfrswJavaWrapperLibrary;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperDefinesAcquisitionEvents;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperDefinesAcquisitionOptions;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperDefinesDeviceInfoStruct;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperDefinesDeviceName;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperDefinesDiagnosticMessage;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperDefinesImageSize;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperDefinesReturnCodes;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperDefinesScannableBiometricType;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperDefinesScannableObjects;
import com.greenbit.gbmsapi.GBMSAPIJavaWrapperLibrary;
import com.greenbit.gbmsapi.IGbmsapiAcquisitionManagerCallback;
import com.greenbit.gbnfiq.GbNfiqJavaWrapperDefineReturnCodes;
import com.greenbit.gbnfiq.GbNfiqJavaWrapperLibrary;
import com.greenbit.gbnfiq2.GbNfiq2JavaWrapperDefineReturnCodes;
import com.greenbit.gbnfiq2.GbNfiq2JavaWrapperLibrary;
import com.greenbit.jpeg.GbjpegJavaWrapperDefinesReturnCodes;
import com.greenbit.jpeg.GbjpegJavaWrapperLibrary;
import com.greenbit.lfs.LfsJavaWrapperLibrary;
import com.greenbit.usbPermission.IGreenbitLogger;
import com.greenbit.usbPermission.UsbPermission;
import com.greenbit.utils.GBJavaWrapperUtilIntForJavaToCExchange;
import com.greenbit.wsq.WsqJavaWrapperDefinesReturnCodes;
import com.greenbit.wsq.WsqJavaWrapperLibrary;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import pl.droidsonroids.gif.GifImageView;

public class LoginWithFingerprint extends AppCompatActivity implements IGreenbitLogger, IGbmsapiAcquisitionManagerCallback {
    private int[] OpenedFD = new int[10];
    private int[] DeviceBus = new int[10];
    private int[] DeviceAddress = new int[10];
    private Button bGetAttDevList;
    private Button bStartStop;
    private EditText tbName;
    private boolean AcquisitionStarted = false;
    public static boolean firstStart = false;

    private ArrayList<String> LoggerPopupList;
    private ArrayList<String> LoggerAcqInfoList;
    private TextView LoggerAcquisitionInfoTv;
    private boolean LoggerAcqinfoListChanged = false;
    private ArrayList<String> LoggerImageInfoList;
    private TextView LoggerImageInfoTv;
    private boolean LoggerImageInfoListChanged = false;
    private ArrayList<GbExampleGrayScaleBitmapClass> LoggerBitmapList;
    private boolean LoggerBitmapChanged = false;
    private int LoggerBitmapFileSaveCounter = 0;
    private Spinner comboObjectsToAcquire;

    private ImageView LoggerView;
    private boolean FirstFrameAcquired = false, PreviewEnded = false, AcquisitionEnded = false;

    private RelativeLayout ExceptionPopupLayout;
    private PopupWindow ExceptionPopupWindow;
    private GbfinimgWindow gbfinimgWindow;
    private long ChronometerMillisecs;
    private boolean ChronometerStarted;
    private GifImageView gifImageView;
    private TextView report;

    public static GbfinimgJavaWrapperDefineSegmentImageDescriptor[] segments;
    private GbExampleGrayScaleBitmapClass gbExampleGrayScaleBitmapClass =
            new GbExampleGrayScaleBitmapClass();

    private void StartChronometer() {
        ChronometerStarted = true;
        ChronometerMillisecs = System.currentTimeMillis();
    }

    private void StopChronometer() {
        ChronometerStarted = false;
        ChronometerMillisecs = -1;
    }

    private long ChronoGetTimeMillisecs() {
        if (ChronometerStarted == false) return -1;
        return (System.currentTimeMillis() - ChronometerMillisecs);
    }

    public void LogOnScreen(String strToLog) {
        LogAcquisitionInfoOnScreen(strToLog);
    }


    public void CreatePopup(String popupText) {
//        Toast popup = Toast.makeText(getBaseContext(), popupText, Toast.LENGTH_SHORT);
//        popup.show();
    }

    public void LogPopup(String text) {
        LoggerPopupList.add(text);
    }

    public void ResetAcquisitionGlobals() {
        FirstFrameAcquired = false;
        PreviewEnded = false;
        AcquisitionEnded = false;
    }

    public void LogAsDialog(String logStr) {
        //   GB_AcquisitionOptionsGlobals.CreateDialogNeutral(logStr, this);

        // Log.e("finger", "CRASHED HERE");

        Tools.toast(logStr, LoginWithFingerprint.this);
    }

    public void LogAcquisitionInfoOnScreen(String logStr) {
        this.LoggerAcqInfoList.add(logStr);
        LoggerAcqinfoListChanged = true;
    }

    public void LogImageInfoOnScreen(String logStr) {
        this.LoggerImageInfoList.add(logStr);
        LoggerImageInfoListChanged = true;
    }

    public void LogBitmap(byte[] bytes, int sx, int sy, boolean save, boolean isLastFrame) {
        GbExampleGrayScaleBitmapClass bmp = new GbExampleGrayScaleBitmapClass(bytes, sx, sy, save, isLastFrame, this);
        LogBitmap(bmp);
    }

    public void LogBitmap(GbExampleGrayScaleBitmapClass bmp) {
        LoggerBitmapList.add(bmp);
        LoggerBitmapChanged = true;
    }

    protected void LogTimer() {
        long ms = ChronoGetTimeMillisecs();
        if (ms > 5000) {
            LoggerAcqInfoList.clear();
            LogAcquisitionInfoOnScreen("Maybe device is hanging: please wait...");
        }
        if (LoggerBitmapChanged) {
            try {
                DisplayMetrics metrics = new DisplayMetrics();
                getWindowManager().getDefaultDisplay().getMetrics(metrics);
                for (GbExampleGrayScaleBitmapClass GbBmp : LoggerBitmapList) {
                    Bitmap bmp = GbBmp.GetBmp();
                    if (bmp != null) {

                        float scaleWidth = metrics.scaledDensity / 8;

                        //set image in imageView
                        LoggerView.setImageBitmap(bmp);

                        //set imageView dynamic width and height
//                        LoggerView.setMaxWidth((int) scaleWidth);
//                        LoggerView.setMaxHeight((int) scaleWidth);
//                        LoggerView.setMinimumWidth((int) scaleWidth);
//                        LoggerView.setMinimumHeight((int) scaleWidth);

                        if (GbBmp.hasToBeSaved) {
                            //----------------------------------------
                            // save image
                            //----------------------------------------
                            // 5ran6: I am saving all these format just for testing sha.... We sha eventually only save one format (e.g ANSI_Nist)

                            GbBmp.SaveIntoAnsiNistFile("Image_" + LoggerBitmapFileSaveCounter, this, 0);
                            GbBmp.SaveToGallery("Image_" + LoggerBitmapFileSaveCounter, this);
                            GbBmp.SaveToRaw("Image_" + LoggerBitmapFileSaveCounter, this);
                            GbBmp.SaveToJpeg("Image_" + LoggerBitmapFileSaveCounter, this);
                            GbBmp.SaveToJpeg2("Image_" + LoggerBitmapFileSaveCounter, this);
                            GbBmp.SaveToWsq("Image_" + LoggerBitmapFileSaveCounter, this);
                            GbBmp.SaveToFIR("Image_" + LoggerBitmapFileSaveCounter, this);
                            GbBmp.GetNFIQQuality(this);
                            GbBmp.GetNFIQ2Quality(this);

//                            try {
//                                GbBmp.TestLfsBozorth(this);
//                            }catch (Exception e){
//                                e.printStackTrace();
//                            }

                            LoggerBitmapFileSaveCounter++;

                        }
                        if (GbBmp.isAcquisitionResult) {
                            GB_AcquisitionOptionsGlobals.acquiredFrame = GbBmp;
                            GB_AcquisitionOptionsGlobals.acquiredFrameValid = true;
                        }
                    } else {
                        LogPopup("LogTimer: null bmp");
                    }
                }
            } catch (Exception ex) {
                LogAsDialog("LogBmp exc: " + ex.getMessage());
            }
            LoggerBitmapList.clear();
            LoggerBitmapChanged = false;
        }
        if (LoggerAcqinfoListChanged) {
            while (LoggerAcqInfoList.size() > 1) LoggerAcqInfoList.remove(0);

            String bigLog = "";
            for (String item : LoggerAcqInfoList) {
                bigLog += item + "\n";
            }
            LoggerAcquisitionInfoTv.setText(bigLog);
            LoggerAcqinfoListChanged = false;
        }
        if (LoggerImageInfoListChanged) {
            while (LoggerImageInfoList.size() > 1) LoggerImageInfoList.remove(0);

            String bigLog = "";
            for (String item : LoggerImageInfoList) {
                bigLog += item + "\n";
            }
            LoggerImageInfoTv.setText(bigLog);
            LoggerImageInfoListChanged = false;
        }
        if (!LoggerPopupList.isEmpty()) {
            CreatePopup(LoggerPopupList.get(0));
            LoggerPopupList.clear();
        }
        if (AcquisitionStarted == false) {
            bStartStop.setText("START");
            bGetAttDevList.setEnabled(true);
            StopChronometer();
        }
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                LogTimer();
            }
        }, 10);
    }

    protected void StartLogTimer() {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                LogTimer();
            }
        }, 10);
    }

    private void ManageGbmsapiErrors(String fName, int RetVal, boolean ShowAsDialog) {
        if (RetVal != GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
            String errorToLog = fName + ": " + GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.GetLastErrorString() + "; RetVal = " + RetVal;
            if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_USB_DRIVER) {
                GBJavaWrapperUtilIntForJavaToCExchange usbError = new GBJavaWrapperUtilIntForJavaToCExchange();
                GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.GetUSBErrorCode(usbError);
                errorToLog += "; USB CODE: " + usbError.Get();
            }
            if (ShowAsDialog) LogAsDialog(errorToLog);
            else LogAcquisitionInfoOnScreen(errorToLog);
        }
    }

    private void ManageGbfrswErrors(String fName, int RetVal, boolean ShowAsDialog) {
        if (RetVal != GbfrswJavaWrapperDefinesReturnCodes.GBFRSW_SUCCESS) {
            String errorToLog = fName + ": " + GB_AcquisitionOptionsGlobals.GBFRSW_Jw.GetLastErrorString();
            if (ShowAsDialog) LogAsDialog(errorToLog);
            else LogAcquisitionInfoOnScreen(errorToLog);
        }
    }

    private void ManageGbfinimgErrors(String fName, int RetVal, boolean ShowAsDialog) {
        if (RetVal != GbfinimgJavaWrapperDefinesReturnCodes.GBFINIMG_NO_ERROR) {
            String errorToLog = fName + ": " + GB_AcquisitionOptionsGlobals.GBFINIMG_Jw.GetLastErrorString();
            if (ShowAsDialog) LogAsDialog(errorToLog);
            else LogAcquisitionInfoOnScreen(errorToLog);
        }
    }

    private void ManageAn2000Errors(String fName, int RetVal, boolean ShowAsDialog) {
        if (RetVal != GBANJavaWrapperDefinesReturnCodes.AN2K_DLL_NO_ERROR) {
            String errorToLog = fName + ": " + GB_AcquisitionOptionsGlobals.AN2000_Jw.GetLastErrorString();
            if (ShowAsDialog) LogAsDialog(errorToLog);
            else LogAcquisitionInfoOnScreen(errorToLog);
            LogPopup(errorToLog);
        }
    }

    private void ManageGbfirErrors(String fName, int RetVal, boolean ShowAsDialog) {
        if (RetVal != GbfirJavaWrapperDefinesReturnCodes.GBFIR_RET_SUCCESS) {
            String errorToLog = fName + ": " + GB_AcquisitionOptionsGlobals.GBFIR_Jw.GetLastErrorString();
            if (ShowAsDialog) LogAsDialog(errorToLog);
            else LogAcquisitionInfoOnScreen(errorToLog);
        }
    }

    private void ManageGbNfiqErrors(String fName, int RetVal, boolean ShowAsDialog) {
        if (RetVal != GbNfiqJavaWrapperDefineReturnCodes.GBNFIQ_NO_ERROR) {
            String errorToLog = fName + ": " + GB_AcquisitionOptionsGlobals.GBNFIQ_Jw.GetLastErrorString();
            if (ShowAsDialog) LogAsDialog(errorToLog);
            else LogAcquisitionInfoOnScreen(errorToLog);
        }
    }

    private void ManageGbNfiq2Errors(String fName, int RetVal, boolean ShowAsDialog) {
        if (RetVal != GbNfiq2JavaWrapperDefineReturnCodes.GBNFIQ2_NO_ERROR) {
            String errorToLog = fName + ": " + GB_AcquisitionOptionsGlobals.GBNFIQ2_Jw.GetLastErrorString();
            if (ShowAsDialog) LogAsDialog(errorToLog);
            else LogAcquisitionInfoOnScreen(errorToLog);
        }
    }

    private void ManageLfsErrors(String fName, int RetVal, boolean ShowAsDialog) {
        if (RetVal != LfsJavaWrapperLibrary.LFS_SUCCESS) {
            String errorToLog = fName + ": " + GB_AcquisitionOptionsGlobals.LFS_Jw.GetLastErrorString();
            if (ShowAsDialog) LogAsDialog(errorToLog);
            else LogAcquisitionInfoOnScreen(errorToLog);
        }
    }

    private void ManageBozorthErrors(String fName, int RetVal, boolean ShowAsDialog) {
        if (RetVal != BozorthJavaWrapperLibrary.BOZORTH_NO_ERROR) {
            String errorToLog = fName + ": " + GB_AcquisitionOptionsGlobals.BOZORTH_Jw.GetLastErrorString();
            if (ShowAsDialog) LogAsDialog(errorToLog);
            else LogAcquisitionInfoOnScreen(errorToLog);
        }
    }

    private void LogSizeAndContrast() {
        if (!GBMSAPIJavaWrapperDefinesScannableBiometricType.ObjToAcquireIsRoll(GB_AcquisitionOptionsGlobals.ObjTypeToAcquire)) {
            String LogImageInfoStr = "";
            GBJavaWrapperUtilIntForJavaToCExchange fpSize = new GBJavaWrapperUtilIntForJavaToCExchange(),
                    fpContrast = new GBJavaWrapperUtilIntForJavaToCExchange();
            GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.GetFingerprintSize(fpSize);
            GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.GetFingerprintContrast(fpContrast);
            LogImageInfoStr = String.format("Size: %d; Contrast: %d", fpSize.Get(), fpContrast.Get());
            LogImageInfoOnScreen(LogImageInfoStr);
        }
    }

    @Override
    public boolean AcquisitionEventsManagerCallback(
            int OccurredEventCode, int GetFrameErrorCode, int EventInfo,
            byte[] FramePtr,
            int FrameSizeX, int FrameSizeY,
            double CurrentFrameRate, double NominalFrameRate,
            int GB_Diagnostic,
            Object UserDefinedParameters
    ) {
        try {
            String LogPhaseStr = "";
            String LogInfoStr = "";
            boolean ValToRet = true;

            StartChronometer();

            if (OccurredEventCode == GBMSAPIJavaWrapperDefinesAcquisitionEvents.GBMSAPI_AE_VALID_FRAME_ACQUIRED) {
                if (!FirstFrameAcquired) FirstFrameAcquired = true;
                LogBitmap(FramePtr, FrameSizeX, FrameSizeY, false, false);
                LogInfoStr = String.format("FR: %.2f/%.2f", CurrentFrameRate, NominalFrameRate);
                // size and contrast
                LogSizeAndContrast();
                ValToRet = true;
            } else if (OccurredEventCode == GBMSAPIJavaWrapperDefinesAcquisitionEvents.GBMSAPI_AE_ACQUISITION_END) {
                AcquisitionEnded = true;
                AcquisitionStarted = false;
                if (
                        ((GB_Diagnostic & GBMSAPIJavaWrapperDefinesDiagnosticMessage.GBMSAPI_DM_SCANNER_SURFACE_NOT_NORMA) == 0) &&
                                ((GB_Diagnostic & GBMSAPIJavaWrapperDefinesDiagnosticMessage.GBMSAPI_DM_SCANNER_FAILURE) == 0)
                ) {
                    if (!GBMSAPIJavaWrapperDefinesScannableBiometricType.ObjToAcquireIsRoll(GB_AcquisitionOptionsGlobals.ObjTypeToAcquire)) {
                        int RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.ImageFinalization(FramePtr);
                        if (RetVal != GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
                            ManageGbmsapiErrors("Callback: finalization", RetVal, false);
                        }
                    }
                }
                LogBitmap(FramePtr, FrameSizeX, FrameSizeY, true, true);
                // size and contrast
                LogSizeAndContrast();
                ValToRet = true;
            } else if (OccurredEventCode == GBMSAPIJavaWrapperDefinesAcquisitionEvents.GBMSAPI_AE_ACQUISITION_ERROR) {
                ManageGbmsapiErrors("Callback: ERROR Get Frame", GetFrameErrorCode, false);
                AcquisitionEnded = true;
                AcquisitionStarted = false;
                ValToRet = false;
            } else if (OccurredEventCode == GBMSAPIJavaWrapperDefinesAcquisitionEvents.GBMSAPI_AE_PREVIEW_PHASE_END) {
                LogPopup("Preview End");
                GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.Sound(12, 2, 1);
                PreviewEnded = true;
                ValToRet = true;
            } else if (OccurredEventCode == GBMSAPIJavaWrapperDefinesAcquisitionEvents.GBMSAPI_AE_SCANNER_STARTED) {
                ValToRet = true;
            }
            if (GB_Diagnostic != 0) {
                LogPopup("Diagnostic = " + GBMSAPIJavaWrapperDefinesDiagnosticMessage.DiagnosticToString(GB_Diagnostic)
                        + String.format(", %X", GB_Diagnostic));
            }

            if (AcquisitionEnded) LogPhaseStr = "Acquisition End";
            else if (PreviewEnded) LogPhaseStr = "Acquisition";
            else if (FirstFrameAcquired) LogPhaseStr = "Preview";
            else LogPhaseStr = "Don't place finger on the scanner";
            if (ValToRet) LogImageInfoOnScreen(LogPhaseStr);
            if (ValToRet) LogAcquisitionInfoOnScreen(LogInfoStr);

            return ValToRet;
        } catch (Exception ex) {
            GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.StopAcquisition();
            AcquisitionEnded = true;
            AcquisitionStarted = false;
            // LogPopup("Exception: " + ex.getMessage());
            return false;
        }
    }

    protected int NumFD;

    protected void LoadFeaturesAndSettingsForConnectedScanner(int DeviceID, String DeviceSerialNumber) {
        String checkGbmsapi;

        int RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.SetCurrentDevice(DeviceID, DeviceSerialNumber);
        if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
            checkGbmsapi = "SetCurrentDevice ok";
        } else {
            ManageGbmsapiErrors("Load Features, SetCurrentDevice", RetVal, true);
            return;
        }
        LogImageInfoOnScreen(checkGbmsapi);
        GBMSAPIJavaWrapperDefinesDeviceInfoStruct currentDevice = new GBMSAPIJavaWrapperDefinesDeviceInfoStruct();
        RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.GetCurrentDevice(currentDevice);
        if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
            checkGbmsapi = "GetCurrentDevice ok";
        } else {
            ManageGbmsapiErrors("Load Features, GetCurrentDevice", RetVal, true);
            return;
        }
        LogImageInfoOnScreen(checkGbmsapi);
        checkGbmsapi = GBMSAPIJavaWrapperDefinesDeviceName.DevIDToString(currentDevice.DeviceID) + ", " + currentDevice.DeviceSerialNum;
        GB_AcquisitionOptionsGlobals.DeviceID = currentDevice.DeviceID;
        this.setTitle(checkGbmsapi);

        GBMSAPIJavaWrapperDefinesImageSize maxImageSize = new GBMSAPIJavaWrapperDefinesImageSize();
        RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.GetMaxImageSize(maxImageSize);
        if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
            checkGbmsapi = "Max Image Size: Sx = " + maxImageSize.SizeX + ", Sy = " + maxImageSize.SizeY;
        } else {
            ManageGbmsapiErrors("Load Features, GetMaxImageSize", RetVal, true);
            return;
        }
        LogImageInfoOnScreen(checkGbmsapi);

        comboObjectsToAcquire = (Spinner) findViewById(R.id.comboObjectsToAcquire);
        GBJavaWrapperUtilIntForJavaToCExchange objTypesMask = new GBJavaWrapperUtilIntForJavaToCExchange();
        RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.GetScannableTypes(objTypesMask);
        if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
        } else {
            ManageGbmsapiErrors("Load Features, GetScannableTypes", RetVal, true);
            return;
        }
        List<String> objTypes = GBMSAPIJavaWrapperDefinesScannableBiometricType.ScannableTypesToStringList(objTypesMask.Get());
        ArrayAdapter<String> objectsToAcquireAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, objTypes);
        objectsToAcquireAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        comboObjectsToAcquire.setAdapter(objectsToAcquireAdapter);

        bStartStop.setEnabled(true);
    }

    private int GetObjToAcquireFromString(String objToAcquireString) {
        int objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SBT_NO_OBJECT;
        if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_SINGLE_FINGER) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_FLAT_LEFT_INDEX;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLL_SINGLE_FINGER) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_ROLL_LEFT_INDEX;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_INDEXES_2) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_SLAP_2_INDEXES;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_LOWER_HALF_PALM) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_LOWER_HALF_PALM_LEFT;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_SLAP_2) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_SLAP_2_LEFT;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_SLAP_4) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_SLAP_4_LEFT;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_THUMBS_2) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_SLAP_2_THUMBS;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_UPPER_HALF_PALM) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_UPPER_HALF_PALM_LEFT;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_WRITER_PALM) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_WRITER_PALM_LEFT;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_PLAIN_JOINT_LEFT_SIDE) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_PLAIN_JOINT_LEFT_SIDE_LEFT_INDEX;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_PLAIN_JOINT_RIGHT_SIDE) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_PLAIN_JOINT_RIGHT_SIDE_LEFT_INDEX;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_DOWN) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_ROLLED_DOWN_LEFT_INDEX;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_HYPOTHENAR) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_ROLLED_HYPOTHENAR_LEFT;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_JOINT) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_ROLLED_JOINT_LEFT_INDEX;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_JOINT_CENTER) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_ROLLED_JOINT_CENTER_LEFT_INDEX;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_THENAR) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_ROLLED_THENAR_LEFT;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_TIP) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_ROLLED_TIP_LEFT_INDEX;
        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_UP) {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_ROLLED_UP_LEFT_INDEX;
        } else {
            objToAcquire = GBMSAPIJavaWrapperDefinesScannableObjects.GBMSAPI_SO_FLAT_LEFT_LITTLE;
        }
        return objToAcquire;
    }

//    private int GetGbfinimgTypeFromString(String objToAcquireString) {
//        int GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_NO_TYPE;
//        if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_SINGLE_FINGER) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_SINGLE_FINGER_FLAT;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLL_SINGLE_FINGER) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_SINGLE_FINGER;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_INDEXES_2) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_THUMBS_2;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_LOWER_HALF_PALM) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_LEFT_HAND_HALF_PALM;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_SLAP_2) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_LEFT_HAND_2;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_SLAP_4) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_LEFT_HAND_4;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_THUMBS_2) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_THUMBS_2;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_UPPER_HALF_PALM) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_LEFT_HAND_HALF_PALM_UPPER;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_FLAT_WRITER_PALM) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_LEFT_HAND_WRITER_PALM;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_PLAIN_JOINT_LEFT_SIDE) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_FLAT_JOINT_FINGER_FV2;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_PLAIN_JOINT_RIGHT_SIDE) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_FLAT_JOINT_FINGER_FV4;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_DOWN) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_SINGLE_FINGER_FLAT;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_HYPOTHENAR) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_LEFT_HAND_ROLLED_THENAR;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_JOINT) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_ROLLED_JOINT_FINGER_FV1;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_JOINT_CENTER) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_ROLLED_JOINT_FINGER_FV1;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_THENAR) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_LEFT_HAND_ROLLED_THENAR;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_TIP) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_ROLLED_TIP;
//        } else if (objToAcquireString == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_STRING_ROLLED_UP) {
//            GbfinimgType = GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_SINGLE_FINGER_FLAT;
//        }
//        return GbfinimgType;
//    }

    // 5ran6: FUNCTION TO BE CALLED : This function runs to put on the scanner and wait for fingers to be placed on it. Then it acquires. Remembe, acquiring is automated. After the beep sound, user fingerprint has been acquired. So he/she can remove it
    private boolean StartStopAcquisition() {
        try {
            int objToAcquire = GetObjToAcquireFromString(comboObjectsToAcquire.getSelectedItem().toString());
            GB_AcquisitionOptionsGlobals.ObjTypeToAcquire =
                    GBMSAPIJavaWrapperDefinesScannableBiometricType.ScannableTypeFromString(comboObjectsToAcquire.getSelectedItem().toString());
            int acqOpt = GB_AcquisitionOptionsGlobals.GetAcquisitionOptionsForObjectType(GB_AcquisitionOptionsGlobals.ObjTypeToAcquire);

            if (!AcquisitionStarted) {
                String checkGbmsapi = "";
                ResetAcquisitionGlobals();
                GB_AcquisitionOptionsGlobals.ScanArea = GB_AcquisitionOptionsGlobals.GetScanAreaFromAcquisitionOptionsAndObject();

                int RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.StartAcquisition(
                        objToAcquire,
                        acqOpt,
                        GB_AcquisitionOptionsGlobals.ScanArea,
                        this, null,
                        0, 0, 0
                );
                if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
                    checkGbmsapi = "Don't place finger on the scanner";
                    AcquisitionStarted = true;
                    if ((acqOpt & GBMSAPIJavaWrapperDefinesAcquisitionOptions.GBMSAPI_AO_MANUAL_ROLL_PREVIEW_STOP) != 0)
                        bStartStop.setText("Stop Preview");
                    else
                        bStartStop.setText("Stop Acquisition");
                    bGetAttDevList.setEnabled(false);
                    StartChronometer();
                } else {
                    ManageGbmsapiErrors("Start Button, StartAcquisition", RetVal, true);
                    return false;
                }
                LogAcquisitionInfoOnScreen(checkGbmsapi);
                LogImageInfoOnScreen("");
                return true;
            } else if ((acqOpt & GBMSAPIJavaWrapperDefinesAcquisitionOptions.GBMSAPI_AO_MANUAL_ROLL_PREVIEW_STOP) != 0) {
                GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.RollStopPreview();
                bStartStop.setText("Stop Acquisition");
                report.setText("Place any finger on the scanner");
                Identify();
                return true;
            } else {
                String checkGbmsapi = "";
                int RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.StopAcquisition();
                bGetAttDevList.setEnabled(true);
                StopChronometer();
                if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
                    checkGbmsapi = "Stopping...";
                } else {
                    ManageGbmsapiErrors("Start Button, StopAcquisition", RetVal, true);
                    return false;
                }
                LogImageInfoOnScreen(checkGbmsapi);
                return true;
            }
        } catch (Exception ex) {
            LogAsDialog("Exception in Start: " + ex.getMessage());
            return false;
        }
    }

    protected void WaitForUsbPermissionFinished() {
        if (UsbPermission.IsUSBPermissionFinished() != 0) {
            NumFD = UsbPermission.GetNumOpenedFD();
            for (int i = 0; i < NumFD; i++) {
                OpenedFD[i] = UsbPermission.GetOpenedFD(i);
                int DeviceID = UsbPermission.GetDeviceID(i);
                DeviceBus[i] = DeviceID / 1000;
                DeviceAddress[i] = DeviceID % 1000;
            }

            // call the GBMSAPI_SetOpenedJavaFD
            int RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.SetOpenedJavaFD(OpenedFD, DeviceBus, DeviceAddress, NumFD);
            String checkGbmsapi;
            if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
                checkGbmsapi = "SetOpenedJavaFD Ok: Finished = " + UsbPermission.GetUsbPermissionFinished();
                LogImageInfoOnScreen(checkGbmsapi);
            } else {
                ManageGbmsapiErrors("WaitForUsbPermissionFinished, SetOpenedJavaFD", RetVal, true);
            }
            // call also the GBFRSW SetOpenedJavaFD
            GB_AcquisitionOptionsGlobals.GBFRSW_Jw.SetOpenedJavaFD(OpenedFD, DeviceBus, DeviceAddress, NumFD);
            // call also the GBFINIMG SetOpenedJavaFD
            GB_AcquisitionOptionsGlobals.GBFINIMG_Jw.SetOpenedJavaFD(OpenedFD, NumFD);

            // now load the attached device list
            GBMSAPIJavaWrapperDefinesDeviceInfoStruct[] AttachedDeviceList;
            AttachedDeviceList = new GBMSAPIJavaWrapperDefinesDeviceInfoStruct[GBMSAPIJavaWrapperDefinesDeviceInfoStruct.GBMSAPI_MAX_PLUGGED_DEVICE_NUM];
            for (int i = 0; i < AttachedDeviceList.length; i++) {
                AttachedDeviceList[i] = new GBMSAPIJavaWrapperDefinesDeviceInfoStruct();
            }
            RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.GetAttachedDeviceList(AttachedDeviceList);
            if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
                int numOfDev = GBMSAPIJavaWrapperDefinesDeviceInfoStruct.GetNumberOfAttachedDevices(AttachedDeviceList);
                if (numOfDev > 0) {
                    checkGbmsapi = "FirstDevice: DevID = " + AttachedDeviceList[0].DeviceID + ", Serial = " + AttachedDeviceList[0].DeviceSerialNum;
                    LogImageInfoOnScreen(checkGbmsapi);
                    LoadFeaturesAndSettingsForConnectedScanner(AttachedDeviceList[0].DeviceID, AttachedDeviceList[0].DeviceSerialNum);
                } else {
                    checkGbmsapi = "GetAttachedDeviceList Ok, numOfDev = " + numOfDev;
                    LogImageInfoOnScreen(checkGbmsapi);
                }
            } else {
                ManageGbmsapiErrors("WaitForUsbPermissionFinished, GetAttachedDeviceList", RetVal, true);
            }
            GB_AcquisitionOptionsGlobals.ResetAcquisitionOptions();


        } else {
            LogImageInfoOnScreen("Waiting for devices...");
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    WaitForUsbPermissionFinished();
                }
            }, 100);
        }
    }

    protected void AndroidUSB() {
        UsbPermission.SetMainActivity(this);
        UsbPermission.CloseConnections();
        UsbPermission.SetActionUsbPermissionString("com.greenbit.MultiscanJNIGuiJavaAndroid");
        UsbPermission.GetDevicesAndPermissions(this);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                WaitForUsbPermissionFinished();
            }
        }, 100);
    }

    protected void onRefresh() {
        LogImageInfoOnScreen("");
        LogAcquisitionInfoOnScreen("");
        GB_AcquisitionOptionsGlobals.DeviceID = 0;
        int RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.Load();
        String checkGbmsapi;
        if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
            checkGbmsapi = "AndroidUSB Ok";
            LogImageInfoOnScreen(checkGbmsapi);
            AndroidUSB();
        } else {
            ManageGbmsapiErrors("onRefresh, Load", RetVal, true);
        }
        RetVal = GB_AcquisitionOptionsGlobals.GBFRSW_Jw.Load();
        if (RetVal != GbfrswJavaWrapperDefinesReturnCodes.GBFRSW_SUCCESS) {
            ManageGbfrswErrors("onRefresh, Load", RetVal, true);
        }
        RetVal = GB_AcquisitionOptionsGlobals.GBFINIMG_Jw.Load();
        if (RetVal != GbfinimgJavaWrapperDefinesReturnCodes.GBFINIMG_NO_ERROR) {
            ManageGbfinimgErrors("onRefresh, Load", RetVal, true);
            GB_AcquisitionOptionsGlobals.GbfinimgLibLoaded = false;
        } else {
            GB_AcquisitionOptionsGlobals.GbfinimgLibLoaded = true;
        }
        RetVal = GB_AcquisitionOptionsGlobals.AN2000_Jw.Load();
        if (RetVal != GBANJavaWrapperDefinesReturnCodes.AN2K_DLL_NO_ERROR) {
            ManageAn2000Errors("onRefresh, Load", RetVal, true);
            GB_AcquisitionOptionsGlobals.An2000LibLoaded = false;
        } else {
            GB_AcquisitionOptionsGlobals.An2000LibLoaded = true;
        }
        RetVal = GB_AcquisitionOptionsGlobals.GBFIR_Jw.Load();
        if (RetVal != GbfirJavaWrapperDefinesReturnCodes.GBFIR_RET_SUCCESS) {
            ManageGbfirErrors("onRefresh, Load", RetVal, true);
            GB_AcquisitionOptionsGlobals.GbfirLibLoaded = false;
        } else {
            GB_AcquisitionOptionsGlobals.GbfirLibLoaded = true;
        }
        RetVal = GB_AcquisitionOptionsGlobals.GBNFIQ_Jw.Load();
        if (RetVal != GbNfiqJavaWrapperDefineReturnCodes.GBNFIQ_NO_ERROR) {
            ManageGbNfiqErrors("onRefresh, Load", RetVal, true);
            GB_AcquisitionOptionsGlobals.GbNfiqLibLoaded = false;
        } else {
            GB_AcquisitionOptionsGlobals.GbNfiqLibLoaded = true;
        }

        RetVal = GB_AcquisitionOptionsGlobals.GBNFIQ2_Jw.Load();
        if (RetVal != GbNfiq2JavaWrapperDefineReturnCodes.GBNFIQ2_NO_ERROR) {
            ManageGbNfiq2Errors("onRefresh, Load", RetVal, true);
            GB_AcquisitionOptionsGlobals.GbNfiq2LibLoaded = false;
        } else {
            GB_AcquisitionOptionsGlobals.GbNfiq2LibLoaded = true;
        }

        RetVal = GB_AcquisitionOptionsGlobals.LFS_Jw.Load();
        if (RetVal != LfsJavaWrapperLibrary.LFS_SUCCESS) {
            ManageLfsErrors("onRefresh, Load", RetVal, true);
            GB_AcquisitionOptionsGlobals.LfsLibLoaded = false;
        } else {
            GB_AcquisitionOptionsGlobals.LfsLibLoaded = true;
        }


        RetVal = GB_AcquisitionOptionsGlobals.BOZORTH_Jw.Load();
        if (RetVal != BozorthJavaWrapperLibrary.BOZORTH_NO_ERROR) {
            ManageBozorthErrors("onRefresh, Load", RetVal, true);
            GB_AcquisitionOptionsGlobals.BozorthLibLoaded = false;
        } else {
            GB_AcquisitionOptionsGlobals.BozorthLibLoaded = true;
        }

        if (GB_AcquisitionOptionsGlobals.acquiredFrameValid) {
            LogBitmap(GB_AcquisitionOptionsGlobals.acquiredFrame);
        }
    }

    protected byte[] CreateMonochromeImage(int size, byte val) {
        byte[] valToRet = new byte[size];
        for (int i = 0; i < size; i++) valToRet[i] = val;
        return valToRet;
    }
//
//    public void LogOnLogcat(String funcName, String message) {
//        Log.d("GbAndroidExample", funcName + ": " + message);
//    }
//
//    public void SaveWsq() {
//        if (GB_AcquisitionOptionsGlobals.acquiredFrameValid) {
//            try {
//                GB_AcquisitionOptionsGlobals.acquiredFrame.SaveToWsq(GB_AcquisitionOptionsGlobals.WsqFileName, this);
//            } catch (Exception ex) {
//                LogAsDialog("SaveWsq: " + ex.getMessage());
//            }
//        } else {
//            LogAsDialog("SaveWsq: acquiredFrame not valid");
//        }
//    }
//
//    public void LoadWsq() {
//        try {
//            GbExampleGrayScaleBitmapClass bmpToShow = new GbExampleGrayScaleBitmapClass();
//            boolean loaded = bmpToShow.GbBmpFromWsqFile(GB_AcquisitionOptionsGlobals.WsqFileName, true, true, this);
//            if (loaded) {
//                LogBitmap(bmpToShow);
//                LogPopup("Loaded from wsq");
//            } else {
//                LogAsDialog("LoadWsq: Failure in open Wsq");
//            }
//        } catch (Exception ex) {
//            LogAsDialog("LoadWsq: " + ex.getMessage());
//        }
//    }

    // 5ran6: FUNCTION ALREADY CALLED WITHIN ENROLLFINGER(...)
    public boolean ProcessSlapImage(byte[] frame, int sx, int sy, int ObjType, int ExpectedFingersNum,
                                    GbfinimgJavaWrapperDefineSegmentImageDescriptor[] descriptors) {
        try {
            String funcName = "ProcessSlapImage";
            int SegmSx = 500, SegmSy = 500;

            if (sx < SegmSx) SegmSx = sx;
            if (sy < SegmSy) SegmSy = sy;
            for (int i = 0; i < 4; i++) {
                descriptors[i] = new GbfinimgJavaWrapperDefineSegmentImageDescriptor();
                descriptors[i].SegmentImage = new byte[SegmSx * SegmSy];
            }
            GBJavaWrapperUtilIntForJavaToCExchange SegmNum = new GBJavaWrapperUtilIntForJavaToCExchange(),
                    Diag = new GBJavaWrapperUtilIntForJavaToCExchange();
            int RetVal = GB_AcquisitionOptionsGlobals.GBFINIMG_Jw.ProcessImage(
                    frame, sx, sy,
                    ObjType,
                    GbfinimgJavaWrapperDefinesProcessOptions.GBFINIMG_REFINE_DRY_FINGERPRINT_IMAGE |
                            GbfinimgJavaWrapperDefinesProcessOptions.GBFINIMG_REFINE_WET_FINGERPRINT_IMAGE |
                            GbfinimgJavaWrapperDefinesProcessOptions.GBFINIMG_HALO_LATENT_ELIMINATION,
                    SegmSx, SegmSy,
                    null, 0,
                    descriptors,
                    SegmNum, Diag
            );
            if (RetVal != GbfinimgJavaWrapperDefinesReturnCodes.GBFINIMG_NO_ERROR) {
                ManageGbfinimgErrors("onProcess, ProcessImage", RetVal, true);
                return false;
            }
            if (SegmNum.Value != ExpectedFingersNum) {
                Log.i(funcName, "SegmNum = " + SegmNum.Value + ", Expected = " + ExpectedFingersNum);
                return false;
            }
            if (Diag.Get() != 0) {
                Log.i(funcName, "Diag = " + Diag.Value);
                return false;
            }
            LogAsDialog("SegmNum=" + SegmNum.Get() + ",Diag=" + Diag.Get());
        } catch (Exception ex) {
            LogAsDialog("onProcess: " + ex.getMessage());
            return false;
        }
        return true;
    }

    // 5ran6: FUNCTION TO BE CALLED
    public void EnrollFinger() {
        // 5ran6: during enrolling, you can create an interface, most preferable with pics so users can select if they have four complete fingers or 3. by defaalt should be 4
        // 5ran6: if 4, then ExpectedFingers = 4 , else if 3, ExpectedFingers = 3

        // 5ran6: also, this function is used for enrolling two thumbs. so ExpectedFingers = 2, then the UI indicates for the user to provide 2 thumbs
        int ExpectedFingers = 4;

        if (GB_AcquisitionOptionsGlobals.acquiredFrameValid) {
            try {
                if (GB_AcquisitionOptionsGlobals.ObjTypeToAcquire == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_FLAT_SINGLE_FINGER) {
                    GB_AcquisitionOptionsGlobals.acquiredFrame.EncodeToLFSMinutiae(
                            GB_AcquisitionOptionsGlobals.GetTemplateFileName(tbName.getText().toString()),
                            GbfrswJavaWrapperDefinesImageFlags.GBFRSW_FLAT_IMAGE,
                            this);
                } else if (GB_AcquisitionOptionsGlobals.ObjTypeToAcquire == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_ROLL_SINGLE_FINGER) {
                    GB_AcquisitionOptionsGlobals.acquiredFrame.EncodeToLFSMinutiae(
                            GB_AcquisitionOptionsGlobals.GetTemplateFileName(tbName.getText().toString()),
                            GbfrswJavaWrapperDefinesImageFlags.GBFRSW_ROLLED_IMAGE,
                            this);
                } else if (GB_AcquisitionOptionsGlobals.ObjTypeToAcquire == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_FLAT_SLAP_4) {

                    GbfinimgJavaWrapperDefineSegmentImageDescriptor[] descriptors = new GbfinimgJavaWrapperDefineSegmentImageDescriptor[4];
                    boolean ret = ProcessSlapImage(
                            GB_AcquisitionOptionsGlobals.acquiredFrame.bytes,
                            GB_AcquisitionOptionsGlobals.acquiredFrame.sx,
                            GB_AcquisitionOptionsGlobals.acquiredFrame.sy,
                            GbfinimgJavaWrapperDefinesInputImageType.GBFINIMG_INPUT_IMAGE_TYPE_RIGHT_HAND_4,  // 5ran6: Very IMPORTANT! you should change this value based on the fingers/hand to be used. For now it is for RIGHT HAND SLAP_4. There is LEFT_HAND  SLAP_4 and THUMBS_2. For 3 fingers, I'll cross check value to be passed here and let you know. Thanks
                            ExpectedFingers, // 5ran6: once ExpectedFingers value has been set, it will pass smoothly
                            descriptors
                    );
                    Log.i("Check ProcessSlapImage", "ProcessSlapImage ret = " +
                            ret);

                    Log.i("check", Arrays.toString(descriptors));


                    for (int i = 0; i < ExpectedFingers; i++) {
                        Log.i("Check img size", "Step = " + i + "Expected SizeX = " + (
                                descriptors[i].BoundingBoxR - descriptors[i].BoundingBoxL));
                        Log.i("Check img size", "Step = " + i + "BBR = " + (descriptors[i].BoundingBoxR));
                        Log.i("Check img size", "Step = " + i + "BBL = " + (descriptors[i].BoundingBoxL));
                        GbExampleGrayScaleBitmapClass bmpCls =
                                new GbExampleGrayScaleBitmapClass(
                                        descriptors[i].SegmentImage,
                                        500, 500,
                                        //descriptors[i].BoundingBoxR - descriptors[i].BoundingBoxL,
                                        //descriptors[i].BoundingBoxB - descriptors[i].BoundingBoxT,
                                        false,
                                        false,
                                        this
                                );
                        Log.i("Check img size", "Real SizeX = " + (
                                bmpCls.sx));
                        bmpCls.EncodeToLFSMinutiae(
                                GB_AcquisitionOptionsGlobals.GetTemplateFileName(tbName.getText().toString() + i),
                                GbfrswJavaWrapperDefinesImageFlags.GBFRSW_FLAT_IMAGE,
                                this);
                    }
                    if (!ret) {
                        throw new Exception("ProcessSlapImage error");
                    }
                } else {
                    throw new Exception("object does not support enrolling");
                }
            } catch (Exception ex) {
                LogAsDialog("EnrollFinger: " + ex.getMessage());
            }
        } else {
            LogAsDialog("EnrollFinger: acquiredFrame not valid");
        }
    }

    // 5ran6: FUNCTION TO BE CALLED
    public void Identify() {
        if (GB_AcquisitionOptionsGlobals.acquiredFrameValid) {
            try {
                if (GB_AcquisitionOptionsGlobals.ObjTypeToAcquire == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_FLAT_SINGLE_FINGER) {
                    // 5ran6: I will remove this if statement and test later..but for now just leave it
                    if (((GB_AcquisitionOptionsGlobals.GetAcquisitionFlatSingleOptionsParameter()) &
                            GBMSAPIJavaWrapperDefinesAcquisitionOptions.GBMSAPI_AO_FLAT_SINGLE_FINGER_ON_ROLL_AREA)
                            == 0) {
                        throw new Exception("flat single finger on roll area must be set");
                    }
                    boolean ret = GB_AcquisitionOptionsGlobals.acquiredFrame.Identify(
                            GbfrswJavaWrapperDefinesImageFlags.GBFRSW_FLAT_IMAGE,
                            this);
                    if (ret) {
                        report.setText("Done");
                        gifImageView.setBackgroundResource(R.drawable.success);
                        
                        //5ran6: VERIFICATION SUCCESSFUL! Loading screen animation begins
                        //5ran6: if you need to call any API, call here
                        //5ran6: Intent to Main activity and destroy this one by calling finish();
                        finish();
                    } else {
                        gifImageView.setBackgroundResource(R.drawable.unsuccessful);
                        report.setText("Identity Not Found. ");
                        StartStopAcquisition();

                    }


                }
                // 5ran6: this is the block that identifies and what we will be calling
                // 5ran6: that means that before you identify, you must set the value of GB_AcquisitionOptionsGlobals.ObjTypeToAcquire = GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_ROLL_SINGLE_FINGER
                else if (GB_AcquisitionOptionsGlobals.ObjTypeToAcquire == GBMSAPIJavaWrapperDefinesScannableBiometricType.GBMSAPI_SBT_ROLL_SINGLE_FINGER) {
                    GB_AcquisitionOptionsGlobals.acquiredFrame.Identify(
                            GbfrswJavaWrapperDefinesImageFlags.GBFRSW_ROLLED_IMAGE,
                            this);
                } else {
                    throw new Exception("object does not support identify");
                }
            } catch (Exception ex) {
                LogAsDialog("Identify: " + ex.getMessage());
            }
        } else {
            LogAsDialog("Identify: acquiredFrame not valid");
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            // No explanation needed, we can request the permission.
            String[] permissions = {
                    Manifest.permission.READ_EXTERNAL_STORAGE,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE
            };
            ActivityCompat.requestPermissions(this,
                    permissions,
                    1);
        }

        try {
            super.onCreate(savedInstanceState);
            GB_AcquisitionOptionsGlobals.GBMSAPI_Jw = new GBMSAPIJavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.WSQ_Jw = new WsqJavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.GBFRSW_Jw = new GbfrswJavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.GBFINIMG_Jw = new GbfinimgJavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.Jpeg_Jw = new GbjpegJavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.AN2000_Jw = new Gban2000JavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.GBFIR_Jw = new GbfirJavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.GBNFIQ_Jw = new GbNfiqJavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.GBNFIQ2_Jw = new GbNfiq2JavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.LFS_Jw = new LfsJavaWrapperLibrary();
            GB_AcquisitionOptionsGlobals.BOZORTH_Jw = new BozorthJavaWrapperLibrary();
            setContentView(R.layout.activity_login_with_fingerprint);

            LoggerAcquisitionInfoTv = (TextView) findViewById(R.id.Acquisition_Info);
            LoggerImageInfoTv = (TextView) findViewById(R.id.Image_Info);
            LoggerView = (ImageView) findViewById(R.id.FrameView);
            gifImageView = findViewById(R.id.processing);
            report = findViewById(R.id.tv);

            LoggerAcqInfoList = new ArrayList<String>();
            LoggerImageInfoList = new ArrayList<String>();
            LoggerPopupList = new ArrayList<String>();
            LoggerBitmapList = new ArrayList<GbExampleGrayScaleBitmapClass>();

            bGetAttDevList = (Button) findViewById(R.id.bAttDevList);
            bGetAttDevList.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    onRefresh();
                }
            });
            bGetAttDevList.setText("Refresh");

            bStartStop = (Button) findViewById(R.id.bStartStop);
            bStartStop.setEnabled(false);
            bStartStop.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    StartStopAcquisition();
                }
            });
            bStartStop.setText("Start Acquisition");

            Button bEnroll = (Button) findViewById(R.id.bEnroll);
            bEnroll.setEnabled(true);
            bEnroll.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    EnrollFinger();
                }
            });
            bEnroll.setText("Enroll");

            Button bIdentify = (Button) findViewById(R.id.bIdentify);
            bIdentify.setEnabled(true);
            bIdentify.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Identify();
                }
            });
            bIdentify.setText("Identify");

            tbName = (EditText) findViewById(R.id.tbName);
            tbName.setEnabled(true);

            GB_AcquisitionOptionsGlobals.acquiredFrameValid = false;
            LogAcquisitionInfoOnScreen("");
            LogImageInfoOnScreen("Image Info");

            byte[] whiteImage = CreateMonochromeImage(256, (byte) 255);
            GbExampleGrayScaleBitmapClass GbBmp = new GbExampleGrayScaleBitmapClass(
                    whiteImage, 16, 16, false, true, this);
            LogBitmap(GbBmp);

            int RetVal = GB_AcquisitionOptionsGlobals.WSQ_Jw.Load();
            String checkGbmsapi;
            if (RetVal == WsqJavaWrapperDefinesReturnCodes.WSQPACK_OK) {
                checkGbmsapi = "Wsq Load Ok";
                LogAcquisitionInfoOnScreen(checkGbmsapi);
            } else {
                checkGbmsapi = "Wsq Load Failure: " + GB_AcquisitionOptionsGlobals.WSQ_Jw.GetLastErrorString();
                LogAcquisitionInfoOnScreen(checkGbmsapi);
            }
            RetVal = GB_AcquisitionOptionsGlobals.Jpeg_Jw.Load();
            if (RetVal == GbjpegJavaWrapperDefinesReturnCodes.GBJPEG_OK) {
                checkGbmsapi = "Jpeg Load Ok";
                LogAcquisitionInfoOnScreen(checkGbmsapi);
            } else {
                checkGbmsapi = "Jpeg Load Failure: " + GB_AcquisitionOptionsGlobals.Jpeg_Jw.GetLastErrorString();
                LogAcquisitionInfoOnScreen(checkGbmsapi);
            }

            onRefresh();
            StartLogTimer();
            //starts scanner
            StartStopAcquisition();
        } catch (Exception ex) {
            LogAsDialog("OnCreate exc:" + ex.getMessage());
            throw ex;
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.process_image) {
            Intent intent = new Intent(this, GbfinimgWindow.class);
            startActivity(intent);
            return true;
        }
        if (id == R.id.wsq_visualizer) {
            Intent intent = new Intent(this, WsqWindow.class);
            startActivity(intent);
            return true;
        }
        if (id == R.id.jp2_visualizer) {
            Intent intent = new Intent(this, Jp2Window.class);
            startActivity(intent);
            return true;
        }
        if (id == R.id.acquisition_settings) {
            if (GB_AcquisitionOptionsGlobals.DeviceID == 0) {
                LogPopup("No device attached");
                return false;
            }
            Intent intent;
            String app;
            app = comboObjectsToAcquire.getSelectedItem().toString();
            if (GBMSAPIJavaWrapperDefinesScannableBiometricType.ObjToAcquireIsFlatSingle(app)) {
                intent = new Intent(this, FlatSingleFingerAcquisitionOptions.class);
                startActivity(intent);
            } else if (GBMSAPIJavaWrapperDefinesScannableBiometricType.ObjToAcquireIsSlapOrJoint(app)) {
                intent = new Intent(this, SlapAcquisitionOptions.class);
                startActivity(intent);
            } else if (GBMSAPIJavaWrapperDefinesScannableBiometricType.ObjToAcquireIsPalm(app)) {
                intent = new Intent(this, SlapAcquisitionOptions.class);
                startActivity(intent);
            } else if (GBMSAPIJavaWrapperDefinesScannableBiometricType.ObjToAcquireIsRoll(app)) {
                intent = new Intent(this, RollAcquisitonOptions.class);
                startActivity(intent);
            }

            return true;
        }
        if (id == R.id.device_features) {
            if (GB_AcquisitionOptionsGlobals.DeviceID == 0) {
                LogPopup("No device attached");
                return false;
            }
            Intent intent = new Intent(this, DeviceFeaturesActivity.class);
            startActivity(intent);
            return true;
        }
        if (id == R.id.framerate_settings) {
            if (GB_AcquisitionOptionsGlobals.DeviceID == 0) {
                LogPopup("No device attached");
                return false;
            }
            GB_AcquisitionOptionsGlobals.ObjTypeToAcquire =
                    GBMSAPIJavaWrapperDefinesScannableBiometricType.ScannableTypeFromString(comboObjectsToAcquire.getSelectedItem().toString());
            GB_AcquisitionOptionsGlobals.ScanArea = GB_AcquisitionOptionsGlobals.GetScanAreaFromAcquisitionOptionsAndObject();
            Intent intent = new Intent(this, FrameRateSettings.class);
            startActivity(intent);
            return true;
        }
        if (id == R.id.dactymatch_settings) {
            Intent intent = new Intent(this, DactyMatchSettings.class);
            startActivity(intent);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        int RetVal = GB_AcquisitionOptionsGlobals.GBMSAPI_Jw.Unload();
        String checkGbmsapi;
        if (RetVal == GBMSAPIJavaWrapperDefinesReturnCodes.GBMSAPI_ERROR_CODE_NO_ERROR) {
            checkGbmsapi = "Unload Ok";
            LogAcquisitionInfoOnScreen(checkGbmsapi);
        } else {
            ManageGbmsapiErrors("onDestroy, Unload", RetVal, true);
        }
        RetVal = GB_AcquisitionOptionsGlobals.WSQ_Jw.Unload();
        if (RetVal == WsqJavaWrapperDefinesReturnCodes.WSQPACK_OK) {
            checkGbmsapi = "onDestroy, Wsq Unload Ok";
            LogAcquisitionInfoOnScreen(checkGbmsapi);
        } else {
            checkGbmsapi = "onDestroy, Wsq Unload Failure";
            LogAcquisitionInfoOnScreen(checkGbmsapi);
        }


    }

    private boolean onProcess() {
        try {
            int SegmSx = 500, SegmSy = 500;
            // String fname = comboFilesList.getSelectedItem().toString();
            String fname = "Finger";
            int ObjType = gbfinimgWindow.GbfinimgObjTypesArray[2];
            GbExampleGrayScaleBitmapClass GbBmp = new GbExampleGrayScaleBitmapClass();
            if (!GB_AcquisitionOptionsGlobals.GbfinimgLibLoaded) {
                throw new Exception("Gbfinimg library not loaded");
            }
            boolean ret = GbBmp.GbBmpFromRawFileWithSize(fname, this);
            if (!ret) {
                throw new Exception("GbBmpFromRawFileWithSize error");
            }
            if (GbBmp.sx < SegmSx) SegmSx = GbBmp.sx;
            if (GbBmp.sy < SegmSy) SegmSy = GbBmp.sy;
            GbfinimgJavaWrapperDefineSegmentImageDescriptor[] descriptors = new GbfinimgJavaWrapperDefineSegmentImageDescriptor[4];
            for (int i = 0; i < 4; i++) {
                descriptors[i] = new GbfinimgJavaWrapperDefineSegmentImageDescriptor();
                descriptors[i].SegmentImage = new byte[SegmSx * SegmSy];
            }
            GBJavaWrapperUtilIntForJavaToCExchange SegmNum = new GBJavaWrapperUtilIntForJavaToCExchange(),
                    Diag = new GBJavaWrapperUtilIntForJavaToCExchange();
            int RetVal = GB_AcquisitionOptionsGlobals.GBFINIMG_Jw.ProcessImage(
                    GbBmp.bytes, GbBmp.sx, GbBmp.sy,
                    ObjType,
                    GbfinimgJavaWrapperDefinesProcessOptions.GBFINIMG_REFINE_DRY_FINGERPRINT_IMAGE |
                            GbfinimgJavaWrapperDefinesProcessOptions.GBFINIMG_REFINE_WET_FINGERPRINT_IMAGE |
                            GbfinimgJavaWrapperDefinesProcessOptions.GBFINIMG_HALO_LATENT_ELIMINATION,
                    SegmSx, SegmSy,
                    null, 0,
                    descriptors,
                    SegmNum, Diag
            );
            if (RetVal != GbfinimgJavaWrapperDefinesReturnCodes.GBFINIMG_NO_ERROR) {
                ManageGbfinimgErrors("onProcess, ProcessImage", RetVal, true);
                return false;
            }
            LogAsDialog("SegmNum=" + SegmNum.Get() + ",Diag=" + Diag.Get());
            gbfinimgWindow.SaveAN2000File(fname, GbBmp, ObjType, descriptors, SegmNum.Get());
            gbfinimgWindow.SaveAN2011File(fname, GbBmp, ObjType, descriptors, SegmNum.Get());
            SegmentsInfoWindow.NumOfSegments = SegmNum.Get();
            SegmentsInfoWindow.Diagnostic = Diag.Get();
            SegmentsInfoWindow.descriptors = descriptors;

            Intent intent = new Intent(this, SegmentsInfoWindow.class);
            startActivity(intent);
            return true;
        } catch (Exception ex) {
            LogAsDialog("onProcess: " + ex.getMessage());
            return false;
        }


    }


}
