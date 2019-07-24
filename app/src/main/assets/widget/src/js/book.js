'use strict';

/**
 * Created by Administrator on 2018/6/19.
 */
(function () {
    $(function ($) {
        $('.js-comment').on('click', function (e) {
            $('.g-propagation').show();
        });
        $('.g-propagation').on('click', function (e) {
            $(this).hide();
        });
        $('.js-directory').on('click', function (e) {
            $('.g-propagation').hide();
            $('.m-directory').show();
        });
        $('.m-directory .d_right').on('click', function (e) {
            $('.m-directory').hide();
        });
        $('.g-propagation div').on('click', function (e) {
            /*阻止冒泡事件*/
            e.stopPropagation();
        });
    });
    $(function ($) {
        //菜单目录切换
        $('.js-menu').on('click', function (e) {
            $('.js-menu~.ul').toggle();
        });
        //bg_tab切换
        $('.ft_li .bg_tab').on('click', function (e) {
            var $this = $(this); // 获取到当前目标
            var index = $this.index(); // 当前索引
            $this.addClass('current').siblings().removeClass('current');
        });
        $('.ft_li .bg_tab').eq(0).on('click', function (e) {
            $('.m-article').css('background', '#eee6dd');
        });
        $('.ft_li .bg_tab').eq(1).on('click', function (e) {
            $('.m-article').css('background', '#0c0c0c');
        });
        $('.ft_li .bg_tab').eq(2).on('click', function (e) {
            $('.m-article').css('background', '#b8cd8d');
        });
    });
    $(function ($) {
        //字体大小
        var _index = localStorage.getItem('index'); // 拉取记录的字体
        var index = _index == null ? 1 : parseInt(_index); // 默认位置
        var sizes = [31, 36, 41, 46, 51]; // 字体数组
        var $minus = $('.js-size_minus');
        var $add = $('.js-size_add');
        var $comment = $('.js-comment');
        var $progressbar1 = $('.progressbar1');
        setCss(); // 初始化
        // 保存状态
        function saveIndex() {
            localStorage.setItem('index', index);
        }
        // 判断disabled类
        function judgeClass() {
            if (index == 0) {
                $minus.addClass('disabled');
            } else if (index == sizes.length - 1) {
                $add.addClass('disabled');
            } else {
                $minus.removeClass('disabled');
                $add.removeClass('disabled');
            }
        }
        // 设置css
        function setCss() {
            $comment.css('font-size', sizes[index] / 100 + 'rem');
            $progressbar1.css('width', 100 / (sizes.length - 1) * index + '%');
        }
        // -
        $minus.on('click', function (e) {
            if (index == 0) {
                return;
            } // 解决超界问题
            index -= 1;
            saveIndex();
            judgeClass();
            setCss();
        });
        // +
        $add.on('click', function (e) {
            if (index == sizes.length - 1) {
                return;
            } // 解决超界问题
            index += 1;
            saveIndex();
            judgeClass();
            setCss();
        });
    });
})();

//# sourceMappingURL=book.js.map