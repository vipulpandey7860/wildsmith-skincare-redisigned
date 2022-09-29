function show() {
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}


function ImgAnimate() {

  var images = document.querySelectorAll(".imgs");

  for (let i = 0; i < images.length; i++) {
    gsap.to(images[i], {

      scrollTrigger: {
        trigger: images[i],
        scroller: "#main",
        start: "top 80%",

      },
      opacity: '1',
      duration: 2,
      


    })
  }
}

function ImgMobileAnimate() {

  var images = document.querySelectorAll(".imgs");

  for (let i = 0; i < images.length; i++) {
    gsap.to(images[i], {

      scrollTrigger: {
        trigger: images[i],
        scroller: "body",
        start: "top 50%",

      },
      opacity: '1',
      duration: 1.5,
      


    })
  }
}



if(window.innerWidth<=500){
  show();
  ImgMobileAnimate();
}

else{
  show();
  ImgAnimate();


}