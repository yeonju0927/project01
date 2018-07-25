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
  if(windWidth !== nowW) {
    location.reload();
  }
});



//3.슬라이드 배너 (자동 넘김 + 좌우 버튼 + 인디케이터)


var adBanner = $('.adBanner');
var adLiclone = adBanner.find('li').eq(0).clone(true);
var bannerUl = adBanner.children('ul');
bannerUl.append(adLiclone);
var bannerLi = bannerUl.children('li');
var abLength = adBanner.find('li').length;
bannerUl.css({width:abLength * 100 + '%'});
bannerLi.css({width:100 / abLength +'%'});
var addr = "../img/adBox/";
var image = ['banner01_pc.jpg','banner02_pc.jpg','banner03_pc.jpg'];

for(var i = 0; i<abLength; i+=1){
  if(i == abLength-1){
    bannerLi.eq(i).css({backgroundImage: 'url("'+ addr + image[0] +'")'}); 
  }else{
    bannerLi.eq(i).css({backgroundImage: 'url("'+ addr + image[i] +'")'}); 
  }
}
// bannerLi.eq(1).css({backgroundImage: 'url("'+ addr + image[1] +'")'});
// bannerLi.eq(2).css({backgroundImage: 'url("'+ addr + image[2] +'")'});
// bannerLi.eq(3).css({backgroundImage: 'url("'+ addr + image[2] +'")'});

// ------------------- indicator 클릭 시 배너 이동하기

var indicator = $('.indicator');
var indiLi    = indicator.find('li');
var num       = 0;
var timed     = 800; 
var CommonFn  = function(n){
  
  var move = n * -100 + '%';
 

  console.log(n);
  if(n >= abLength-1){
    n=0;
    bannerUl.stop().animate({marginLeft:move}, timed,function(){
      bannerUl.css({marginLeft:0});
    });
   }else if(n < 0){
    n=abLength-1;
    move = n * -100 + '%';
    bannerUl.css({marginLeft:move});
    n-=1;
    move = n * -100 + '%';
    bannerUl.stop().animate({marginLeft:move}, timed);

   }else{
    bannerUl.stop().animate({marginLeft:move}, timed);
  }
    indiLi.eq(n).addClass('active');
    indiLi.eq(n).siblings('li').removeClass('active');
    num = n;
};
CommonFn(num);

indiLi.on('click', function(e){
  e.preventDefault();
  var it = $(this);
  num = it.index();
  CommonFn(num);
});

// -------------------button 클릭 시 배너 이동하기 (인디케이터 연동)
var arrowBtn = $('.arrow_button');
var prev_btn = $('#prev_btn');
var next_btn = $('#next_btn');

arrowBtn.children('button').on('click', function(e){
var it = $(this)[0];
if(it === prev_btn[0] && num >= 0){
  num-=1;
} else if (it === next_btn[0] && num < abLength-1) {
  num+=1;
}
CommonFn(num);
});


// ---------------------자동 슬라이드
  var automove;
  function AutoSlide(){
      StopSlide();
       automove = setInterval(function(){
                  (num < abLength) ? num+=1 : num=0;
                  CommonFn(num);
                }, timed*2);  
     };
  function StopSlide() {clearInterval( automove ); console.log('stop');};
  AutoSlide();

  $('#adBox').on({mouseenter:StopSlide, mouseleave:AutoSlide});
// -----------------------------------



// 4.top-button 위치 설정
var topB = $('#top_btn');
$(window).on('scroll', function(e){
var thisTop = $(this).scrollTop();
console.log(thisTop);
if (thisTop < 300) {
  topB.stop().fadeOut();
}else {topB.stop().fadeIn();};

});


}) (jQuery);