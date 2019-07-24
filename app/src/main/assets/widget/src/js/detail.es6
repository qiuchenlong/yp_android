/**
 * Created by HJH on 2018/6/14.
 */
(function() {
    $(($) => {
        /*分享*/
        $('.js-share').on('click', function(e) {
            $('.shareCover').show();
        });
        $('.shareCover').on('click', function(e) {
            $('.shareCover').hide();
        });
        $('.shareCover .shareList').on('click', function(e) {
            e.stopPropagation();
        });
        $('.js-cancel').on('click', function(e) {
            $('.shareCover').hide();
        });
        /*我要评论*/
        $('.js-comment').on('click', function(e) {
            $('.comment-on').show();
        });
        $('.comment-on').on('click', function(e) {
            $('.comment-on').hide();
        });
        $('.comment-on div').on('click', function(e) {
            e.stopPropagation();
        });
        $('.comment_hd .icon-xiangshangbiaoshi-copy').on('click', function(e) {
            $('.comment-on').hide();
        });
        $('.comment-close').on('click', function(e) {
            $('.comment-on').hide();
        });
        $('.comment_btn').on('click', function(e) {
            $('.comment-on').hide();
        });
        /*点击周榜响应*/
        $('.rank_date .selct').on('click', function(e) {
            $('.js-select').show();
        });
        /*周榜月榜下拉*/
        $('.js-select_li').on('click', function(e) {
            $('.js-select').hide();
            var str1 = $(this).text();
            $('.select_li').html(str1);
        });
    });
})();

