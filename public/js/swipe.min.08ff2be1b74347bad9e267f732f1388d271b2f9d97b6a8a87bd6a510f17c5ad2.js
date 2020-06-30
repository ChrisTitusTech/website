/*!
* Swipe 2.2.14
*
* Brad Birdsall
* Copyright 2013, MIT License
*
*/;(function(root,factory){if(typeof define==='function'&&define.amd){define([],function(){root.Swipe=factory();return root.Swipe;});}else if(typeof module==='object'&&module.exports){module.exports=factory();}else{root.Swipe=factory();}}(this,function(){var root=typeof self=='object'&&self.self===self&&self||typeof global=='object'&&global.global===global&&global||this;var _document=root.document;function Swipe(container,options){'use strict';options=options||{};var start={};var delta={};var isScrolling;var delay=options.auto||0;var interval;var disabled=false;var noop=function(){};var offloadFn=function(fn){setTimeout(fn||noop,0);};var throttle=function(fn,threshhold){threshhold=threshhold||100;var timeout=null;function cancel(){if(timeout)clearTimeout(timeout);}
function throttledFn(){var context=this;var args=arguments;cancel();timeout=setTimeout(function(){timeout=null;fn.apply(context,args);},threshhold);}
throttledFn.cancel=cancel;return throttledFn;};function getScrollbarWidth(){return root.innerWidth-_document.documentElement.clientWidth;}
var isCancelable=function(event){if(!event)return false;return typeof event.cancelable!=='boolean'||event.cancelable;};var browser={addEventListener:!!root.addEventListener,passiveEvents:(function(){var supportsPassive=false;try{var opts=Object.defineProperty({},'passive',{get:function(){supportsPassive=true;}});root.addEventListener('testEvent',null,opts);root.removeEventListener('testEvent',null,opts);}
catch(e){supportsPassive=false;}
return supportsPassive;})(),touch:('ontouchstart'in root)||root.DocumentTouch&&_document instanceof DocumentTouch,transitions:(function(temp){var props=['transitionProperty','WebkitTransition','MozTransition','OTransition','msTransition'];for(var i in props){if(temp.style[props[i]]!==undefined){return true;}}
return false;})(_document.createElement('swipe'))};if(!container)return;var element=container.children[0];var slides,slidePos,width,length;var index=parseInt(options.startSlide,10)||0;var speed=options.speed||300;options.continuous=options.continuous!==undefined?options.continuous:true;var slideDir=(function(el,prop,dir){if(el.currentStyle){dir=el.currentStyle[prop];}else if(root.getComputedStyle){dir=root.getComputedStyle(el,null).getPropertyValue(prop);}
return 'rtl'===dir?'right':'left';})(container,'direction');options.autoRestart=options.autoRestart!==undefined?options.autoRestart:false;var throttledSetup=throttle(setup);var events={handleEvent:function(event){if(disabled)return;switch(event.type){case 'mousedown':case 'touchstart':this.start(event);break;case 'mousemove':case 'touchmove':this.move(event);break;case 'mouseup':case 'mouseleave':case 'touchend':this.end(event);break;case 'webkitTransitionEnd':case 'msTransitionEnd':case 'oTransitionEnd':case 'otransitionend':case 'transitionend':this.transitionEnd(event);break;case 'resize':throttledSetup();break;}
if(options.stopPropagation){event.stopPropagation();}},start:function(event){var touches;if(isMouseEvent(event)){touches=event;event.preventDefault();}else{touches=event.touches[0];}
start={x:touches.pageX,y:touches.pageY,time:+new Date()};isScrolling=undefined;delta={};if(isMouseEvent(event)){element.addEventListener('mousemove',this,false);element.addEventListener('mouseup',this,false);element.addEventListener('mouseleave',this,false);}else{element.addEventListener('touchmove',this,browser.passiveEvents?{passive:false}:false);element.addEventListener('touchend',this,false);}},move:function(event){var touches;if(isMouseEvent(event)){touches=event;}else{if(event.touches.length>1||event.scale&&event.scale!==1){return;}
if(options.disableScroll&&isCancelable(event)){event.preventDefault();}
touches=event.touches[0];}
delta={x:touches.pageX-start.x,y:touches.pageY-start.y};if(typeof isScrolling==='undefined'){isScrolling=!!(isScrolling||Math.abs(delta.x)<Math.abs(delta.y));}
if(!isScrolling){if(isCancelable(event)){event.preventDefault();}
stop();if(options.continuous){translate(circle(index-1),delta.x+slidePos[circle(index-1)],0);translate(index,delta.x+slidePos[index],0);translate(circle(index+1),delta.x+slidePos[circle(index+1)],0);}else{delta.x=delta.x/((!index&&delta.x>0||index===slides.length-1&&delta.x<0)?(Math.abs(delta.x)/width+1):1);translate(index-1,delta.x+slidePos[index-1],0);translate(index,delta.x+slidePos[index],0);translate(index+1,delta.x+slidePos[index+1],0);}}},end:function(event){var duration=+new Date()-start.time;var isValidSlide=Number(duration)<250&&Math.abs(delta.x)>20||Math.abs(delta.x)>width/2;var isPastBounds=!index&&delta.x>0||index===slides.length-1&&delta.x<0;if(options.continuous){isPastBounds=false;}
var direction=Math.abs(delta.x)/delta.x;if(!isScrolling){if(isValidSlide&&!isPastBounds){if(direction<0){if(options.continuous){move(circle(index-1),-width,0);move(circle(index+2),width,0);}else{move(index-1,-width,0);}
move(index,slidePos[index]-width,speed);move(circle(index+1),slidePos[circle(index+1)]-width,speed);index=circle(index+1);}else{if(options.continuous){move(circle(index+1),width,0);move(circle(index-2),-width,0);}else{move(index+1,width,0);}
move(index,slidePos[index]+width,speed);move(circle(index-1),slidePos[circle(index-1)]+width,speed);index=circle(index-1);}
runCallback(getPos(),slides[index],direction);}else{if(options.continuous){move(circle(index-1),-width,speed);move(index,0,speed);move(circle(index+1),width,speed);}else{move(index-1,-width,speed);move(index,0,speed);move(index+1,width,speed);}}}
if(isMouseEvent(event)){element.removeEventListener('mousemove',events,false);element.removeEventListener('mouseup',events,false);element.removeEventListener('mouseleave',events,false);}else{element.removeEventListener('touchmove',events,browser.passiveEvents?{passive:false}:false);element.removeEventListener('touchend',events,false);}},transitionEnd:function(event){var currentIndex=parseInt(event.target.getAttribute('data-index'),10);if(currentIndex===index){if(delay||options.autoRestart)restart();runTransitionEnd(getPos(),slides[index]);}}};setup();begin();return{setup:setup,slide:function(to,speed){stop();slide(to,speed);},prev:function(){stop();prev();},next:function(){stop();next();},restart:restart,stop:stop,getPos:getPos,disable:disable,enable:enable,getNumSlides:function(){return length;},kill:kill};function detachEvents(){if(browser.addEventListener){element.removeEventListener('touchstart',events,browser.passiveEvents?{passive:true}:false);element.removeEventListener('mousedown',events,false);element.removeEventListener('webkitTransitionEnd',events,false);element.removeEventListener('msTransitionEnd',events,false);element.removeEventListener('oTransitionEnd',events,false);element.removeEventListener('otransitionend',events,false);element.removeEventListener('transitionend',events,false);root.removeEventListener('resize',events,false);}else{root.onresize=null;}}
function attachEvents(){if(browser.addEventListener){if(browser.touch){element.addEventListener('touchstart',events,browser.passiveEvents?{passive:true}:false);}
if(options.draggable){element.addEventListener('mousedown',events,false);}
if(browser.transitions){element.addEventListener('webkitTransitionEnd',events,false);element.addEventListener('msTransitionEnd',events,false);element.addEventListener('oTransitionEnd',events,false);element.addEventListener('otransitionend',events,false);element.addEventListener('transitionend',events,false);}
root.addEventListener('resize',events,false);}else{root.onresize=throttledSetup;}}
function cloneNode(el){var clone=el.cloneNode(true);element.appendChild(clone);clone.setAttribute('data-cloned',true);clone.removeAttribute('id');}
function setup(opts){if(opts!=null){for(var prop in opts){options[prop]=opts[prop];}}
slides=element.children;length=slides.length;for(var i=0;i<slides.length;i++){if(slides[i].getAttribute('data-cloned'))length--;}
if(slides.length<2){options.continuous=false;}
if(browser.transitions&&options.continuous&&slides.length<3){cloneNode(slides[0]);cloneNode(slides[1]);slides=element.children;}
if('right'===slideDir){for(var j=0;j<slides.length;j++){slides[j].style.float='right';}}
slidePos=new Array(slides.length);width=root.innerWidth-getScrollbarWidth();element.style.width=(slides.length*width*2)+'px';var pos=slides.length;while(pos--){var slide=slides[pos];slide.style.width=width+'px';slide.setAttribute('data-index',pos);if(browser.transitions){slide.style[slideDir]=(pos*-width)+'px';move(pos,index>pos?-width:(index<pos?width:0),0);}}
if(options.continuous&&browser.transitions){move(circle(index-1),-width,0);move(circle(index+1),width,0);}
if(!browser.transitions){element.style[slideDir]=(index*-width)+'px';}
container.style.visibility='visible';detachEvents();attachEvents();}
function prev(){if(disabled)return;if(options.continuous){slide(index-1);}else if(index){slide(index-1);}}
function next(){if(disabled)return;if(options.continuous){slide(index+1);}else if(index<slides.length-1){slide(index+1);}}
function runCallback(pos,index,dir){if(options.callback){options.callback(pos,index,dir);}}
function runTransitionEnd(pos,index){if(options.transitionEnd){options.transitionEnd(pos,index);}}
function circle(index){return(slides.length+(index%slides.length))%slides.length;}
function getPos(){var currentIndex=index;if(currentIndex>=length){currentIndex=currentIndex-length;}
return currentIndex;}
function slide(to,slideSpeed){to=typeof to!=='number'?parseInt(to,10):to;if(index===to)return;if(browser.transitions){var direction=Math.abs(index-to)/(index-to);if(options.continuous){var natural_direction=direction;direction=-slidePos[circle(to)]/width;if(direction!==natural_direction){to=-direction*slides.length+to;}}
var diff=Math.abs(index-to)-1;while(diff--){move(circle((to>index?to:index)-diff-1),width*direction,0);}
to=circle(to);move(index,width*direction,slideSpeed||speed);move(to,0,slideSpeed||speed);if(options.continuous){move(circle(to-direction),-(width*direction),0);}}else{to=circle(to);animate(index*-width,to*-width,slideSpeed||speed);}
index=to;offloadFn(function(){runCallback(getPos(),slides[index],direction);});}
function move(index,dist,speed){translate(index,dist,speed);slidePos[index]=dist;}
function translate(index,dist,speed){var slide=slides[index];var style=slide&&slide.style;if(!style)return;style.webkitTransitionDuration=style.MozTransitionDuration=style.msTransitionDuration=style.OTransitionDuration=style.transitionDuration=speed+'ms';style.webkitTransform=style.msTransform=style.MozTransform=style.OTransform=style.transform='translateX('+dist+'px)';}
function animate(from,to,speed){if(!speed){element.style[slideDir]=to+'px';return;}
var start=+new Date();var timer=setInterval(function(){var timeElap=+new Date()-start;if(timeElap>speed){element.style[slideDir]=to+'px';if(delay||options.autoRestart)restart();runTransitionEnd(getPos(),slides[index]);clearInterval(timer);return;}
element.style[slideDir]=(((to-from)*(Math.floor((timeElap/speed)*100)/100))+from)+'px';},4);}
function begin(){delay=options.auto||0;if(delay)interval=setTimeout(next,delay);}
function stop(){delay=0;clearTimeout(interval);}
function restart(){stop();begin();}
function disable(){stop();disabled=true;}
function enable(){disabled=false;restart();}
function isMouseEvent(e){return /^mouse/.test(e.type);}
function kill(){stop();container.style.visibility='';element.style.width='';element.style[slideDir]='';var pos=slides.length;while(pos--){if(browser.transitions){translate(pos,0,0);}
var slide=slides[pos];if(slide.getAttribute('data-cloned')){var _parent=slide.parentElement;_parent.removeChild(slide);}
slide.style.width='';slide.style[slideDir]='';slide.style.webkitTransitionDuration=slide.style.MozTransitionDuration=slide.style.msTransitionDuration=slide.style.OTransitionDuration=slide.style.transitionDuration='';slide.style.webkitTransform=slide.style.msTransform=slide.style.MozTransform=slide.style.OTransform='';}
detachEvents();throttledSetup.cancel();}}
if(root.jQuery||root.Zepto){(function($){$.fn.Swipe=function(params){return this.each(function(){$(this).data('Swipe',new Swipe($(this)[0],params));});};})(root.jQuery||root.Zepto);}
return Swipe;}));