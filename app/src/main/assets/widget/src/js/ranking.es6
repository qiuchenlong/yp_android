/**
 * Created by Administrator on 2018/6/13.
 */
;(function() {
    // 要传的参数
    let params = {
        type1 : '1',
        type2 : '1',
        type3 : '1',
    };
    // 获取数据
    function updateList() {
        console.log(params);
        $.ajax({
            type : 'get',
            url  : gApi.rankList,
            data : params,
            success(res) {
                // console.log(res);
                /*let str = ``;
                $('.rank_right').html(str);*/
            },
        });
    };
    $(($) => {
        // 初始化
        updateList();
        // 选择左侧分类
        $('.rank_left .ul .li').on('click', function(e) {
            let $this = $(this);
            // 显示
            $this.addClass('active').siblings().removeClass('active');
            // 赋值、数据请求
            // params.type1 = $this.attr('data-value');
            params.type1 = $this.data('value');
            updateList();
        });
        // 选择顶部分类
        $('.type_a').on('click', function(e) {
            let $this = $(this);
            // 显示
            $this.addClass('active').siblings().removeClass('active');
            // 赋值、数据请求
            params.type2 = $this.data('value');
            updateList();
        });
        // 选择下拉榜单
        $('#select').on('change', function(e) {
            // 赋值、数据请求
            params.type3 = this.value;
            updateList();
        });
        /*点击周榜响应*/
        $('.js-select_val').on('click', function(e) {
            $('.js-select').toggle();
        });
        $('.js-select').on('click', function(e) {
            $('.js-select').hide();
        });
        /*周榜月榜下拉*/
        $('.js-select_li').on('click', function(e) {
            $(this).addClass('current').siblings().removeClass('current');
            var str1 = $(this).find('em').text();
            $('.js-select_val').html(str1);
        });
    });
})();
