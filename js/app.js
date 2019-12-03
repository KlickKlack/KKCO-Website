//設定檔
var config = appConfig;

//Images
var preloaded_images = [];

// init event
$(document).ready(function() {
    var rnd = Math.random();
    (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
    
    if (jQuery.browser.mobile) {
        if (rnd < 0.5) {
            //mobile activity slides
            load_slides(false);
        }else{
            //mobile 5g slides
            load_slides(true);
        }
    } else {
        if (rnd < 0.5) {
            //old slides
            load_slides(false);
        }else{
            //video 5g            
            load_bg_video();
        }
        

    }

    //grecaptcha form validation prepare
    var forms = document.getElementsByClassName('needs-validation');
    
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
        event.stopPropagation();
        event.preventDefault();
        submit_inquire();
      }, false);
    });

    //處理案例上圖
    function load_cases_pic() {
        var cases_pic = $(".img")
        var idx = 0;
        
        //隨機排序
        var cases_shuffle = shuffle(config.cases);
        var current_image = 0;

        /*
        $(".img").each(function( index ) {
            $(this).hide()
        });*/
        
        var page_width = $(window).width();

        for (var i=0; i<cases_shuffle.length; i++) {

            $(".img").each(function( index ) {

                if (page_width >= 750) {
                    cases_shuffle[index]['uri'] = cases_shuffle[index]['uri'].replace(/m2x/i, 'l2x');
                }
                $(this).attr('src', cases_shuffle[index]['uri'])
                $(this).attr('title', cases_shuffle[index]['alt'])
                $(this).attr('alt', cases_shuffle[index]['alt'])

                /*if ( ! $(this).hasClass('hide') ) {
                    $(this).delay(400 * index).fadeIn(750); 
                }*/
            });

            /*
            //preload Images
            preloaded_images[i] = new Image();
            preloaded_images[i].src = cases_shuffle[i];
            //console.log('start loading '+cases_shuffle[i])

            preloaded_images[i].onload = function (e) {
                
                var dom = $(".img:eq("+current_image+")")
                dom.attr('src', e.target.src);

                if ( ! dom.hasClass('hide') ) {
                    //dom.delay(200 * i).fadeIn(500);
                }
                //$(".img:eq(0)").attr('src', e.target.src)
                current_image++;

                if (current_image >= cases_shuffle.length) {
                    //console.warn('全部圖片載入完成')
                    show_cases_pic();
                }

                
            }
            */
        }

        function show_cases_pic() {
            $(".img").each(function( index ) {
                if ( ! $(this).hasClass('hide') ) {
                    $(this).delay(400 * index).fadeIn(750); 
                }
            });
        }
        
        /*
        $(".img").each(function( index ) {     
            var uri = cases_shuffle[index];
            $(this).hide()
            $(this).attr('src', uri);
            console.log($(this).attr('src')+ ' start loading');

            $(this).bind('load', function() {
                console.log($(this).attr('src')+ ' finish loading');

                if ( ! $(this).hasClass('hide') ) {
                    $(this).delay(400 * index).fadeIn(750); 
                }
            });
        });
        */

    }

    //案例上圖
    load_cases_pic();

    //mute icon
    $("#mute-icon").click(function() {
        var video_dom = document.getElementById("bg_video");
        video_dom.muted = !video_dom.muted;

        //var mute_btn_img = document.getElementById("mute_icon_img");
        var mute_txt = document.getElementById("mute_txt");
        mute_txt.innerHTML = (video_dom.muted) ?  "sound off" : "sound on"
        //mute_mg.src = (video_dom.muted) ?  "images/mute.svg" : "images/unmute.svg"
    });

    //聯絡我們
    $("#contact-us").click(function() {
        $('html,body').animate({
            scrollTop: $(".contacts_form").offset().top},
            1500);
    }); 
    
    $("#b1").click(function() {
        $('html,body').animate({
            scrollTop: $(".contacts_form").offset().top},
            1000);
    }); 

    $("#b2").click(function() {
        $('html,body').animate({
            scrollTop: $(".contacts_form").offset().top},
            700);
    });

    $("#know-more").click(function() {
        $('html,body').animate({
            scrollTop: $(".p1").offset().top + 125},
            700);
    });
    

    //更多案例
    $("#more_cases").click(function() {

        $(".img.hide").each(function(index) {
            $(this).delay(400*index).fadeIn(750);
        });
        
        $(".p6").css("height",  'calc(100% + 50px)');

        $(this).hide()
    }); 


    $(function () {

        $( ".nav-icon" ).click(function() {
            $(".navbar").toggleClass("expand")
        });

    });
});

function shuffle(arr) {   

    var fixed_count = 8;         //固定前面幾張圖
    
    var fixed_arr  = arr.slice(0, fixed_count);
    var random_arr  = arr.slice(fixed_count);
    var i, j, temp;
    for (i = random_arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = random_arr[i];
        random_arr[i] = random_arr[j];
        random_arr[j] = temp;
    }

    var result_arr = fixed_arr.concat(random_arr);
    
    return result_arr;
    
};

//隱私權政策
function show_privacy(e) {    
    Swal.fire({
        html:'<iframe src="privacy.html" style="height:70vh; width:70vw; border:0px;">',
        width:'80vw',
        height: '80%',
        confirmButtonColor: 'rgb(36,37,38)'
    })
}

//送出表單
function submit_inquire()  {

    $.ajax({
        url: config.api_uri,
        method: "POST",
        data: {
             name: $('#name').val(),
             email: $('#mail').val(),
             phone: $('#phone').val(),
             type: $('#type').val(),
             description: $('#description').val(),
             token: grecaptcha_token
            }
      })
      .done(function( res ) {

        var success = res.data ? res.data.success : res.success;
        var errmsg = '';

        if (success) {
            if (res.data.score < 0.3 )
                //失敗
                Swal.fire(
                    '送出失敗',
                    '驗證失敗，請嘗試重新送出表單',
                    'error'
                )
            else 
                //成功
                Swal.fire({
                    title:'送出成功',
                    text:'我們會盡快與您聯繫，謝謝！',
                    type:'success',
                    onClose: function() {
                        window.location.reload();
                    }
                })
                //@TODO: need to reload or redirect page
        } else {
            if (res.data)
                errmsg = (res.data['error-codes'][0] == 'timeout-or-duplicate' )  ? '畫面閒置太久，請重新整理頁面後再送出' : '請填寫電子郵件及聯絡電話等必要資訊'
            else
                errmsg = '請填寫電子郵件及聯絡電話等必要資訊'

            //失敗
            Swal.fire(
                '送出失敗',
                errmsg,
                'error'
              )
        }
      });

}

function display_ui (is_5g) {
    
    var button_txt = is_5g ? "馬上了解" : "立即預約";
    var landscape_title = is_5g ? "5G整合令人驚歎<br>網路價值更添驚喜" : "最專業的活動網路解決方案";
    
    $("#b1").show();

    $("#b1 > a").html(button_txt);
    $(".landscape-title").html(landscape_title);
}

function load_bg_video() {
    //5g button
    display_ui(true);

    //5g video
    var video = $('#bg_video');
    
    /*
    var window_width = $(window).width();
    if (window_width >= 1920) {
        video_res = 'FullHD';
    } else if (window_width >= 720) {
        video_res = '720p';
    } else {
        video_res = '540p';
    }*/

    //video.append("<source src='video/MOVINGSTAGE_5G_"+video_res+".mp4' type='video/mp4' >");    
    video.append("<source src='video/movingstage_5g_full.mp4' type='video/mp4' >");

}

function load_slides(is_5g) {
    var video = $('#bg_video');
    video.hide();
    
    if (is_5g) {
        //5g slides
        $(".cb-slideshow").addClass('slides_5g');

        //5g button
        display_ui(true);   
    } else {     
        //activity slides
        $(".cb-slideshow").addClass('slides_activity');

        //5g button
        display_ui(false);
    }

    $('ul.cb-slideshow li').addClass('slides');
    $('ul.cb-slideshow li:first-child').remove();
    $(".cb-slideshow").addClass('animated');
}