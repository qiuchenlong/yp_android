//获取tab的index
$(function () {
    $('.nav_a').on('click', function () {
        var index = $(this).index();
        console.log(index)
    })
})

//绘制
function funIniGroup() {
    frames_url = ['frame0.html', 'frame0_male.html', 'frame0_publish.html', 'frame0_gratis.html']
    var navLis = $api.domAll('.nav .nav_a'),
        frames = [];
    var systemType = api.systemType;
    // var h = $api.dom('.appHeader').offsetHeight;
    // var headH = $api.dom('.appHeader').offsetHeight;
    // var headT = $api.offset('.appHeader');
    // var h = headH + headT;
    if (systemType == 'android') {
        for (var i = 0, len = navLis.length; i < len; i++) {
            frames.push({
                name: 'frame' + i,
                url: frames_url[i],
                bgColor: '#eee',
                bounces: false,
                // pageParam: {
                //     'headerH': h
                // }
            });

        };

        api.openFrameGroup({
            name: 'group',
            scrollEnabled: false,
            preload: 0,
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: 480,
                marginBottom: 60
            },
            index: 0,
            frames: frames
        }, function (ret, err) {});
    } else {
        for (var i = 0, len = navLis.length; i < len; i++) {
            frames.push({
                name: 'frame' + i,
                url: frames_url[i],
                bgColor: '#eee',
                bounces: false,
                // pageParam: {
                //     'headerH': h
                // }
            });
        };
        api.openFrameGroup({
            name: 'group',
            scrollEnabled: false,
            preload: 0,
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: 480
            },
            index: 0,
            frames: frames
        }, function (ret, err) {});
    }
};