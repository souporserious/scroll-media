// http://codepen.io/ollieRogers/pen/lfeLc/?editors=001
// http://codepen.io/anon/pen/GxDJg
// http://www.reddit.com/r/webdev/comments/2krge1/codepens_killer_html5_video_scrolling_controls_w/
// http://codepen.io/anon/pen/mJwbK?editors=001
// someone beat us: http://codepen.io/anon/pen/mJwbK
// physics: http://physics.stackexchange.com/questions/33323/end-position-of-movement-factoring-in-deceleration

// resources
// http://chrisbateman.github.io/impetus/
// http://codepen.io/redspiderfish/pen/MYmeYz
// http://codepen.io/bhaveshgohel/pen/plEnd
// http://www.kirupa.com/html5/animating_with_easing_functions_in_javascript.htm
// http://www.kirupa.com/html5/animating_in_code_using_javascript.htm
// https://serato.com/forum/discussion/114735
// http://codepen.io/anon/pen/GxDJg?editors=001

function easeOut(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
};

var $win = $(window),
    $video = $('video'),
    frameRate = 29.97,
    target = 0,
    scroll = 0,
    isTicking, scrollTimeout, delta, target;

var ScrollVideo = function() {
    
    this.scrollY = 0;
  
    $win.on('mousewheel DOMMouseScroll', this.onScroll.bind(this)); 
};

ScrollVideo.prototype = {
  
    /**
     * Callback for our scroll event
     * keeps track of the last scroll value
     */
    onScroll: function(event) {
        
        var e = event.originalEvent ? event.originalEvent : event; // get original event if available
            
        target += (e.wheelDelta > 0) ? -70 : 70;
        if (target < 0) target = 0;
      
        delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        
        this.requestScrollTick();
    },

    /**
     * Calls rAF if it hasn't already
     * been done
     */
    requestScrollTick: function() {

        if( !isTicking ) {
            window.requestAnimationFrame(this.scrollHandler);
        }
        isTicking = true;
    },

    /**
     * Animate stuff on scroll
     */
    scrollHandler: function() {
      
        scroll += (target - scroll) * 0.1;
      
      console.log(scroll);

        if(delta < 0) {
            $video[0].currentTime += (1 / frameRate);
        }
        else {
            $video[0].currentTime -= (1 / frameRate);
        }

        // stop ticking
        isTicking = false;
    }
};

var scrollVideo = new ScrollVideo();