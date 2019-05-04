//客服服务鼠标移入移出
$('.ss_list').mouseenter(function(){
    $('.ss_list_bg').show();
}).mouseleave(function(){
    $('.ss_list_bg').hide();
});
//商品列表鼠标移入显示右边的详细列表
$(function(){
    $(".leftNav ul li").hover(
        function(){
            $(this).find(".fj").addClass("nuw");
            $(this).find(".zj").show();
        },
        function(){
            $(this).find(".fj").removeClass("nuw");
            $(this).find(".zj").hide();
        }
    )
});
//中间轮播图
function changeImg(){
    var imgLi = $('.slide_box').children('li');
    var numLi = $('.num').children('li');
    var index =0;
    var stop = false;

    numLi.mouseover(function(){
        stop = true;
        index=numLi.index($(this));
        imgLi.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
        (this).addClass("active").stop(true,true).siblings().removeClass('active');
    }).mouseout(function(){
        stop =false;
    });
    setInterval(function(){
        if(stop) return;
        index ++;
        if(index>=imgLi.length){
            index = 0;
        }
        imgLi.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
        numLi.eq(index).addClass("active").stop(true,true).siblings().removeClass('active');
    },3000);
}
changeImg();
//快讯向上滚动
$(function () {
    function movedown() {
        var marginTop = 0;
        var stop = false;
        var interval = setInterval(function () {
            if(stop) return;
            $('#express').children('li').first().animate({'margin-top':marginTop--},0,function () {
                var first = $(this);
                if(!first.is(':animated')){
                    if((-marginTop)>first.height()){
                        first.css({'margin-top':0}).appendTo($('#express'));
                        marginTop = 0;
                    }
                }
            });
        },50);
        $('#express').mouseover(function(){
            stop = true;
        }).mouseout(function(){
            stop = false;
        });
    }
    movedown();
});
//购物车
var timeoutId;
var $last = $('.last');

function fadeOut() {
    timeoutId = setTimeout(function() {
        $last.fadeOut('slow');
    }, 500)
}

$('.car_t').hover(function() {
    clearTimeout(timeoutId);
    $last.fadeIn('slow');
}, fadeOut);

$last.hover(function() {
    clearTimeout(timeoutId)
}, fadeOut);


    var shopcar = {
        totalPrice: 0,
        totalNum: 0,
        shoplist: []
    };
    var $shop = $('.shop');
    var lis = $('li', $shop);
    lis.each(function (index, item) {
        var p = $(item).find('.J_smallTotalPrice').text().slice(1)-0;
        var n = $(item).find('.J_inputCount').val()-0;
        shopcar.shoplist.push({
            num: n,
            price: p,
            tPrice: n * p
        })
    });
    console.log(shopcar);

    $('.J_btnAddCount').on('click', function () {
        var C_index = lis.index($(this).parents('li'));
        var new_num = $('.J_inputCount', lis.eq(C_index)).val();
        changedata(C_index, ++new_num);
        console.log(shopcar);
    });
    $('.J_btnDelCount').on('click', function () {
        var C_index = lis.index($(this).parents('li'));
        var new_num = $('.J_inputCount', lis.eq(C_index)).val();
        if (new_num <= 1) {
            alert('确定要删除吗？');
            return false;
        }
        --new_num;
        changedata(C_index, new_num);
        console.log(shopcar);
    });

    function changedata(index, num) {
        if (index > -1) {
            //修改单个商品的数据
            shopcar.shoplist[index].num = num;
            shopcar.shoplist[index].tPrice = num * shopcar.shoplist[index].price;
        }
        //修改总商品数据
        shopcar.totalPrice = 0;
        shopcar.totalNum = 0;
        $.each(shopcar.shoplist, function (index, item) {
            shopcar.totalPrice += item.tPrice;
            shopcar.totalNum += item.num
        });
        changeHtml(index);
    }

    function changeHtml(index) {
        if (index > -1) {
            lis.eq(index).find('.price').text(shopcar.shoplist[index].tPrice);
            lis.eq(index).find('input').val(shopcar.shoplist[index].num);
        }
        $('.J_totalPrice').text(shopcar.totalPrice);
        $('.J_totalCount').text(shopcar.totalNum)
    }

    $('.J_btnDelete').on('click', function () {
        var C_index = lis.index($(this).parents('li'));   //获取下标
        //删除html
        lis.eq(C_index).remove();
        //删除数据
        shopcar.shoplist.splice(C_index, 1);

        changedata(-1);

    });

