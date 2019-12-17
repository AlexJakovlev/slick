console.log("THIS")
var win_width = $(window).width();
console.log("width " + win_width);
let settings_slic = {
    infinite: true,
    slidesToShow: 3,
    rows: 2,
    dots: true,
    arrows: false,
}

if (win_width < 769) {
    settings_slic.slidesToShow = 2
    settings_slic.rows = 2;


}
if (win_width < 376) {
    settings_slic["rows"] = 1;
    settings_slic.slidesToShow = 1;
    settings_slic.centerMode = true;
    settings_slic.variableWidth = true;

}

function start_slick(flag = true) {
    $(".slider").slick(settings_slic);
    if (flag) {
        var dd = $("ul.slick-dots");
        dd.wrap('<div class="slick_nav"></div>')
        var prev_arrow = $("<div id='prew_arrow' aria-label='Previous'  class='arrow prew_arrow'><p></p></div>");
        var next_arrow = $("<div id='next_arrow' aria-label='Next'  class='arrow next_arrow'><p></p></div>");

        next_arrow.insertAfter(dd);
        prev_arrow.insertBefore(dd);

        $(prev_arrow).on("click", function () {
            $(".slider").slick('slickPrev');
        });
        $(next_arrow).on("click", function () {
            $(".slider").slick('slickNext');
        });
    }
}
start_slick();
/********************************* */
let old_width = win_width;
const resizeObserver = new ResizeObserver(entries => {

    for (let entry of entries) {
        var win_width = $(window).width();
       
        if ((win_width > 375 && win_width < 769) && (old_width > 768 || old_width < 376)) {
        console.log(old_width + " -- " + win_width);
            console.log("to medium");
            $(".slider").slick('unslick');
            settings_slic.slidesToShow = 2
            settings_slic.rows = 2;
            settings_slic.centerMode = false;
            settings_slic.variableWidth = false;
            start_slick();
            old_width = win_width;
        }
        if (win_width < 376 && old_width > 375) {
            console.log("to min");
            $(".slider").slick('unslick');
            settings_slic["rows"] = 1;
            settings_slic.slidesToShow = 1;
            settings_slic.centerMode = true;
            settings_slic.variableWidth = true;
            start_slick(false);
            old_width = win_width;
        }
        if (win_width > 768 && old_width < 769) {
            console.log("to max");
            $(".slider").slick('unslick');
            settings_slic.slidesToShow = 3
            settings_slic.rows = 2;
            settings_slic.centerMode = false;
            settings_slic.variableWidth = false;
            start_slick();
            old_width = win_width;
        }
    }
});
resizeObserver.observe(window.document.getElementById("main"));
