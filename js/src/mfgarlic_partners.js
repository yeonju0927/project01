// mfgarlic_partners.js

(function($) {

var text = $('#membership_banner').children('p');

text.hide();

 $(window).on('load',function(e){
 e.preventDefault();
 text.slideDown(1500);
 });

}) (jQuery);
        