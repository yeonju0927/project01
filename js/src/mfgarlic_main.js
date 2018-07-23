// mfgarlic_main.js

(function($) {
// 1. headBox > gnb 영역---------------------------
// 1-1. 하위 메뉴 숨기기 & 변수 선언

var headBoxW = $('.headBox_wrap');
var headBox = headBoxW.children('#headBox');
var headLi = headBox.find('ul').children('li');
var headOl = headBox.find('ol');
var olLink = headOl.find('a');
var timed = 500;

headOl.hide();

//1-2. head > li에 마우스 올렸을 때  하위 메뉴만 보여주기
headLi.on('mouseenter', function(e){
  e.preventDefault();
$(this).children('ol').stop().slideDown(timed);
headOl.addClass('show');

});
// ------------------------------------------------

//1-3.headBox에서 마우스를 뗐을 때
headLi.on('mouseleave', function(e) {
  e.preventDefault();
$(this).children('ol').stop().slideUp(timed);
headOl.removeClass('show');
});
// ------------------------------------------------

//1-4.head > li > a에 포커스 상태일 때, 위와 동일하게 효과 적용
headLi.children('a').on('focus', function(e){
  $(this).next('ol').stop().slideDown(timed);
});
var headOlLi = headOl.children('li');
// console.log(headOlLi);
$.each(headOl,function(i,v){
  // console.log(i);
  var j = headOl.eq(i).children('li');
  j.eq(-1).children('a').on('blur',function(){
    // console.log('up');
     headOl.eq(i).stop().slideUp(timed);
  });
});
headOl.children('li').last().children('a').on('blur', function(e) {
  headOl.stop().slideUp(timed);
});
// ------------------------------------------------

// 2.gnb 버튼 클릭 시 메뉴 펼쳐 보여주기(기기별 표시)
var wind = $(window);
var windWidth = wind.outerWidth();
var navigation = $('#navigation_all');
var gnb = $('#gnb');
var gnbWrap = $('.gnb_wrap');
var unbWrap = $('.unb_wrap');
var gnbBtn = $('#drop_menu');

gnb.hide();

if (windWidth < 1025) {
gnbBtn.on('click', function(e){
gnb.stop().slideToggle();
});


}else if (windWidth > 1024){
gnbBtn.hide();
gnb.show();
};


$(window).on('resize', function(e) {
  var nowW = $(window).outerWidth();
  if(winW !== nowW) {
    location.reload();
  }
});



//3.슬라이드 배너 (자동 넘김 + 좌우 버튼 + 인디케이터)
//3-1. 배너 자동 넘김
var adBanner = $('.adBanner');
var bannerFrame = adBanner.children('ul');
var bannerLi = bannerFrame.children('li');
var arrowBtn = $('.arrow_button');
var prevBtn = $('#prev_btn')[0];
var nextBtn = $('#next_btn')[0];
var num = 0;
var bannerLength = adBanner.find('li').length -1;

arrowBtn.children('button').on('click', function(e){
e.preventDefault();

var it = $(this)[0];

if (it ===prevBtn && num > 0) {
  num -=1;
}else if (it === nextBtn && num <bannerLength) {
  num +=1;
}
var move = num * -100 + '%';
bannerFrame.stop().animate({marginLeft:move});
bannerLi.eq(num).addClass('active');
bannerLi.eq(num).siblings('li').removeClass('active');

});





}) (jQuery);