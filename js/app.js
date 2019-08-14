//設定檔
var config = appConfig;

//Images
var preloaded_images = [];

// init event
$(document).ready(function() {

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