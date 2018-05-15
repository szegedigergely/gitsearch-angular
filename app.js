angular.module('gitSearchApp', ["ngTable"])
.controller('mainCtrl', function($scope, $http, $filter, NgTableParams) {
    var self = this;

    var xmlns = "http://www.w3.org/2000/svg",
        container = $('.anim_container'),
        dT = .6;
    
    TweenMax.set('#search_mag', {
        transformOrigin: '146px 146px'
    });

    var enterSearchTl = new TimelineMax({paused:true}),
        loadingTl = new TimelineMax({paused:true}),
        loadingAnim = new TimelineMax({paused:true, repeat: -1, onRepeat:function(){checkLoaded();}}),
        loadEndAnim = new TimelineMax({paused:true}),
        hideSearchTl = new TimelineMax({paused:true});

    var resultsLoaded = false;

    enterSearchTl
    .to('#halo_circle', dT, {
      morphSVG:{shape:'#halo_crescent' , shapeIndex:0},
      opacity:1,
      ease:Power4.easeInOut
    }, 'start')
    .to('#search_mag', dT, {
        scale: '.06111',
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
        marginLeft: '+=212',
        zIndex: 2,
        ease:Power4.easeInOut
    }, 'start+=1')
    .to('#search_button', dT, {
        marginLeft: '+=212',
        ease:Power4.easeInOut
    }, 'start+=1')
    .to('#search_input', dT, {
        marginLeft: -230,
        width: 460,
        textIndent: 16,
        ease:Power4.easeInOut,
        onComplete: function(){
            $('#search_input').focus();
        }
    }, 'start+=1')
    
    $('#search_mag').click(function(){
        enterSearchTl.timeScale(2).play();
    });

    loadingAnim
    .to('#search_mag', dT, {rotation: '+=360deg', ease:Power0.easeNone, repeat: 1});

    var checkLoaded = function() {
        if(resultsLoaded) {
          loadingAnim.pause();
        }else {
          loadingAnim.resume();
        }
      }

    var prepareResults = function(){
        TweenMax.set('#result_list .item', {
            top: 64,
            opacity: 0
        })
    }

    var showItems = function(){
        var showItemsTl = new TimelineMax({paused:true});
        setTimeout(function(){
        showItemsTl.staggerTo('#result_list .item', .25, {top: 0, opacity: 1, ease:Power4.easeOut}, 0.05);
            showItemsTl.play();
        },0);
    }

    var hideItems = function(){
        var hideItemsTl = new TimelineMax({paused:true});
            setTimeout(function(){
        hideItemsTl.staggerTo('#result_list .item', .25, {top: 0, opacity: 1, ease:Power4.easeOut}, -0.05);
            hideItemsTl.play();
        },0);
    }


    hideSearchTl
    .to('#search_bar', dT, {
        height: 72,
        ease:Power4.easeInOut
    }, 'start')

    $scope.list = null;
    $scope.issues = null;

    $scope.search = function(searchParam){
        $('#search_input').blur();
        $('#no_match').removeClass('at_all');
        resultsLoaded = false;
        loadingAnim.timeScale(2).resume();
        $http({
            url: 'https://api.github.com/search/repositories?q=' + encodeURIComponent(searchParam),
            method: 'GET'
        }).then(function(results){
            resultsLoaded = true;
            if(results.data.items.length){
                $scope.list = results.data;
            } else {
                $scope.list = null;
                $('#no_match').addClass('at_all');
            }
            setTimeout(function(){
                hideSearchTl.timeScale(2).play();
            }, 0);
        });
    };

    $scope.clearSearch = function(){
        $scope.list = {};
    }

    $scope.showIssues = function(repoName){
        $http({
            url: 'https://api.github.com/search/issues?q=repo:' + encodeURIComponent(repoName),
            method: 'GET'
        }).then(function(results){
            $scope.currentRepo = repoName;
            $scope.issues = results.data || {noresult: true};
        });
    };
    
    $scope.clearIssues = function(){
        $scope.issues = null;
    }

    $scope.accordion = {
        current: null
    }

    $scope.setAccordion = function(id){
        $scope.accordion.current = $scope.accordion.current == id ? null : id;
    }

    $scope.date = function(date){
        var _date = $filter('date')(new Date(date), 'MMM dd yyyy HH:mm:ss');
        return _date;
    }

});