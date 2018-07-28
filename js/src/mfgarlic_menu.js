// mfgarlic_menu.js
(function($) {

//1. 큰 이미지 ('.big_image' 호버하면 active 활성화)

var bigImg = $('.big_image');

bigImg.on('mouseenter', function(e){

$(this).addClass('active');

});

bigImg.on('mouseleave', function(e){

bigImg.removeClass('active');

});

// 2. 큰 이미지 & 작은 이미지 연결

var imgM = $('.imageM');
var imgMLink = imgM.children('a');
var bigLink = bigImg.find('a');
var miniMenu = $('.mini_menu_wrap').children('div');
var addrs = '../img/menu/';
var miniImg = [

{thums:  'biscotti',  image:  'biscotti_pc',  link:'#',   nar: '5월 신메뉴-전채요리'},
{thums:  'herbOlio',  image:  'herbOlio_pc',  link:'#',   nar: '5월 신메뉴-파스타'},
{thums:  'steak',     image:  'steak_pc',     link:'#',   nar: '5월 신메뉴-스테이크'},
{thums:  'herbRice',  image:  'herbRice_pc',  link:'#',   nar: '5월 신메뉴-라이스'},
{thums:  'herbPizza', image:  'herbPizza_pc', link:'#',   nar: '5월 신메뉴-피자'}

];


var imgshow = function(i){

bigImg.css({backgroundImage: 'url(' + addrs + miniImg[i].image + '.png)',

backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'});

/*bigLink.attr({href:'http://' + miniImg[i].link}); 아직 연결할 페이지 없음*/

};


for(var e = 0; e < miniMenu.length; e+=1) {

miniMenu.eq(e).children('a').css({backgroundImage:'url('+ addrs + miniImg[e].thums + '.png)',backgroundRepeat: 'no-repeat', backgroundSize:'contain', backgroundPosition:'center', transition: 'all 300ms'});

};

imgshow(0);


imgM.on('click', function(e){

e.preventDefault();
var i = $(this).parent().index();
imgshow(i);

});


}) (jQuery);