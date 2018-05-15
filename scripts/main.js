( function($) {

$(document).ready( function() { 
    var xmlns = "http://www.w3.org/2000/svg",
        container = $('.anim_container'),
        dT = .6;
    
    // console.log(container);

    TweenMax.set('#search_mag', {
        transformOrigin: "146px 146px"
    });


    // var tl = new TimelineMax({paused:false, repeat:-1, yoyo:true,repeatDelay:2, delay:.5 });
    var enterSearch = new TimelineMax({paused:true}),
        showResults = new TimelineMax({paused:true});

    enterSearch
    .to('#halo_circle', dT, {
      morphSVG:{shape:'#halo_crescent' , shapeIndex:0},
      opacity:1,
      ease:Power4.easeInOut
    }, 'start')
    .to('#search_mag', dT, {
        scale: ".06111",
        ease:Power4.easeInOut
    }, 'start')
    .to('#search_input', dT, {
        marginLeft: -18,
        marginTop: -18,
        width: 36,
        height: 36,
        borderRadius: 18,
        ease:Power4.easeInOut
    }, 'start')
    .to('#search_mag', dT, {
        left: "+=222",
        zIndex: 2,
        ease:Power4.easeInOut
    }, 'start+=1')
    .to('#search_button', dT, {
        left: "+=222",
        ease:Power4.easeInOut
    }, 'start+=1')
    .to('#search_input', dT, {
        marginLeft: -240,
        width: 480,
        textIndent: 16,
        ease:Power4.easeInOut,
        onComplete: 
    }, 'start+=1');

    
    
    $('#search_mag').click(function(){
        enterSearch.timeScale(2).play();
    });
    
    showResults
    .to('#searchbar', dT, {
        height: 72,
        ease:Power4.easeInOut
    });

    // $('#search_button').click(function(){
    //     showResults.timeScale(2).play();
    // });
});

} ) ( jQuery );