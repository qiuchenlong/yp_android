package com.ten.android.yipinapicloud;

import android.app.Application;

import com.umeng.commonsdk.UMConfigure;
import com.uzmap.pkg.openapi.APICloud;

public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        //初始化APICloud，SDK中所有的API均需要初始化后方可调用执行
        APICloud.initialize(this);


        UMConfigure.init(this, UMConfigure.DEVICE_TYPE_PHONE, null);

    }
}
