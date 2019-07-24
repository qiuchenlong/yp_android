'use strict';

/**
 * Created by HJH on 2018/6/14.
 */
(function () {
    $(function ($) {
        /*分享*/
        $('.js-share').on('click', function (e) {
            $('.shareCover').show();
        });
        $('.shareCover').on('click', function (e) {
            $('.shareCover').hide();

        });
        $('.shareCover .shareList').on('click', function (e) {
            e.stopPropagation();
        });
        $('.js-cancel').on('click', function (e) {
            $('.shareCover').hide();
        });

               /*打赏*/
        $('.dashang').on('click', function (e) {
            $('.liCover').show();
        });
        $('.liCover').on('click', function (e) {
            $('.liCover').hide();
        });
        $('.liCover .shareList').on('click', function (e) {
            e.stopPropagation();
        });
        $('.li-cancel').on('click', function (e) {
            $('.liCover').hide();
        });

        /*我要评论*/
        $('.js-comment').on('click', function (e) {
            $('.comment-on').show();
        });
        /*$('.comment-on').on('click', function (e) {
            $('.comment-on').hide();
        });*/
        $('.comment-on div').on('click', function (e) {
            e.stopPropagation();
        });
        $('.comment-on .u-hd_f .iconfont').on('click', function(e) {
            $('.comment-on').hide();
        })
        $('.comment_hd .icon-xiangshangbiaoshi-copy').on('click', function (e) {
            $('.comment-on').hide();
        });
        $('.comment-close').on('click', function (e) {
            $('.comment-on').hide();
        });
        $('.comment_btn').on('click', function (e) {
            $('.comment-on').hide();
        });
        // 评论点击
        $('.comment_bd .u-score').on('click', function(e) {
            // console.log(e.offsetX / 33); // 164/5=33
            let num = Math.ceil(e.offsetX / 33);
            console.log(num);
            $(this).find('.star').css('width', `${20 * num}%`);
        });
    });
})();

//# sourceMappingURL=detail.js.map
