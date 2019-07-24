package com.ten.android.yipinapicloud;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.widget.Toast;

import com.umeng.analytics.MobclickAgent;
import com.uzmap.pkg.openapi.ExternalActivity;

import java.util.List;

import permissions.dispatcher.NeedsPermission;
import permissions.dispatcher.OnNeverAskAgain;
import permissions.dispatcher.OnPermissionDenied;
import permissions.dispatcher.OnShowRationale;
import permissions.dispatcher.PermissionRequest;
import permissions.dispatcher.RuntimePermissions;


@RuntimePermissions
public class MainActivity extends ExternalActivity {

//    private static final String[] PERMISSIONS = {Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.ACCESS_FINE_LOCATION,
//            Manifest.permission.CALL_PHONE, Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO};
//
//    private static final int RC_PERM = 123;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);

        MainActivityPermissionsDispatcher.writeExternalStorageTaskWithPermissionCheck(this);

    }


    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }


    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }






    @NeedsPermission({Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO})
    void writeExternalStorageTask() {
//        Toast.makeText(this, "获取权限", Toast.LENGTH_SHORT).show();
    }

    @OnShowRationale({Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO})
    void showMessageForDial(final PermissionRequest request) {
        new AlertDialog.Builder(this)
                .setMessage("请授予应用权限")
                .setPositiveButton("继续", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        request.proceed();    //点击确定则继续请求
                    }
                })
                .setNegativeButton("取消", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        request.cancel();    //否则取消请求
                    }
                })
                .show();

    }

    @OnPermissionDenied({Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO})
    void noCallPermission() {
        Toast.makeText(this, "没有获得权限", Toast.LENGTH_SHORT).show();
    }


    @OnNeverAskAgain({Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO})
    void dontAsk() {
        Toast.makeText(this, "如需要开启权限，请前往设置进行手动开启", Toast.LENGTH_SHORT).show();
    }


}
