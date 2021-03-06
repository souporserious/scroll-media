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
// http://codepen.io/markteater/full/xbNyOJ/
// 
// // set height based on video length. Determine the amount 1sec is equalt to 1pixel. Probs 1 frame for every 1 pixel
// ability to set scroll duration to height/width of viewport.... better ability to specify a pixel value the video should last

// function easeOut(t, b, c, d) {
//   return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
// }

// var $win = $(window),
//     $video = $('video'),
//     frameRate = 29.97,
//     target = 0,
//     scroll = 0,
//     isTicking, scrollTimeout, delta, target;

// basics of inertia
// --- allow timing function ?
// get start and end then move towards that goal over a period of time

class ScrollMedia {

    constructor(video, ready) {

        this.options = {
            offset: 0, // offset from when the video should start scrubbing, defaults to top of video
            controlScrollbar: true // when scrubbing the video it will control the scroll position
        };

        this.video = video;
        this.isTicking = false;
        this.frameRate = 29.97;
        //this.wheelEvent = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';

        this.winHeight = window.innerHeight;

        this.scrollY =
        this.targetTime =
        this.pixelLength =
        this.duration = 0;

        // get duration after meta data loads and then kick things off
        this.video.addEventListener('loadedmetadata', () => {

            // grab any meta values we need
            this.duration = (this.video.duration).toFixed(4);
            this.pixelLength = (this.duration * this.frameRate) + this.winHeight;

            this.init();

            // callback after video is ready
            // !!! maybe call this on resize? for height setting
            if(typeof ready === 'function') {
               ready.call(this); 
            }
        });
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // listen for mousewheel
        //document.addEventListener(this.wheelEvent, e => this.onScroll(e));
        window.addEventListener('scroll', e => this.onScroll(e));

        // update scrollbar based on scrubber
        // this.video.addEventListener('timeupdate', () => {
        //     window.scrollTo(0, this.video.currentTime * this.frameRate);
        // });
    }

    onScroll(e) {
        //this.delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        this.scrollY = window.pageYOffset;
        this.requestTick();
    }

    requestTick() {
        if(!this.isTicking) {
            requestAnimationFrame(() => this.scrubVideo());
        }
        this.isTicking = true;
    }

    scrubVideo() {
        
        // if(this.delta < 0) {
        //     this.video.currentTime += (1 / this.frameRate);
        // }
        // else {
        //     this.video.currentTime -= (1 / this.frameRate);
        // }
        
        this.video.currentTime = this.scrollY / this.frameRate;

        console.log(this.video.currentTime);

        this.isTicking = false;
    }
}

var video = document.querySelector('video'),
    body = document.querySelector('body');

var videoMedia = new ScrollMedia(video, function () {
    
    // set body height
    body.style.height = this.pixelLength + 'px';
}); 
 

    /**
     * Callback for our scroll event
     * keeps track of the last scroll value
     */
    // onScroll: function(event) {
        
    //     var e = event.originalEvent ? event.originalEvent : event; // get original event if available
            
    //     target += (e.wheelDelta > 0) ? -70 : 70;
    //     if (target < 0) target = 0;
      
    //     delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        
    //     this.requestScrollTick();
    // },

    /**
     * Animate stuff on scroll
     */
    // scrollHandler: function() {
      
    //     scroll += (target - scroll) * 0.1;
      
    //   console.log(scroll);

    //     if(delta < 0) {
    //         $video[0].currentTime += (1 / frameRate);
    //     }
    //     else {
    //         $video[0].currentTime -= (1 / frameRate);
    //     }

    //     // stop ticking
    //     isTicking = false;
    // }
