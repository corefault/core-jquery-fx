/******************************************************************
 coreFX
  jquery effect plugin
 
 author: daniel kagemann
 
 history
   v0.1
    * basic functionality
	* easing support
 
 *****************************************************************/

(function($) {
	
		function _easing (func,pos)
		{
			if (func=="linear") {return pos;}
			else if (func=="spring") {return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));}
			else if (func=="easeOutBounce") {
			   if ((pos) < (1/2.75)) { return (7.5625*pos*pos);
				} else if (pos < (2/2.75)) { return (7.5625*(pos-=(1.5/2.75))*pos + .75);
				} else if (pos < (2.5/2.75)) { return (7.5625*(pos-=(2.25/2.75))*pos + .9375);
				} else { return (7.5625*(pos-=(2.625/2.75))*pos + .984375);	}
			}
			else if (func=="elastic") {	return -1 * Math.pow(4,-8*pos) * Math.sin((pos*6-1)*(2*Math.PI)/2) + 1;	}
			else if (func=="mirror") {
				var	pos2 = (-Math.cos(pos*Math.PI)/2) + 0.5
				if(pos<0.5) {var	p = pos*2;return ((-Math.cos(p*Math.PI)/2) + 0.5);}
				else {var	p = 1-(pos-0.5)*2;return ((-Math.cos(p*Math.PI)/2) + 0.5);}
			}
			else if (func=="bouncePast") {
				if (pos < (1/2.75)) {return (7.5625*pos*pos);} 
				else if (pos < (2/2.75)) {return 2 - (7.5625*(pos-=(1.5/2.75))*pos + .75);
				} else if (pos < (2.5/2.75)) { return 2 - (7.5625*(pos-=(2.25/2.75))*pos + .9375);
				} else {return 2 - (7.5625*(pos-=(2.625/2.75))*pos + .984375);}		
			}
			else if (func=="easeFromTo") {
				if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
				return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
			}
			else if (func=="easeInOutBack") {
				var s = 1.70158;
				if((pos/=0.5) < 1) return 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s));
				return 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
			}
			return pos;
		}
	
	
	$.fn.extend ({
	
		coreFX: function (opts)
		{
			//# valid opts: {duration, from, to, property, ease, reverse, unit}
			var opts = opts || {};
			
			return this.each (function() {
				var start = (new Date).getTime();
				var dur   = opts.duration || 500;
				var finish= start+dur;
				var unit = opts.unit || "px";
				var obj = $(this);
		
				obj.css(opts.property, opts.from+unit);

				var handle = setInterval(function (){
					var time = (new Date).getTime();
					var pos = time>finish ? 1 : (time-start)/dur;

					//# move property
					var target  = parseInt (opts.to);
					var source  = parseInt (opts.from);
					var pingpong= opts.reverse || false;
					
					//# easing support
					var easing = opts.ease || "linear";
					pos = _easing(easing,pos);
					var interpolate = (source+(target-source)*pos).toFixed(3);
					obj.css(opts.property, interpolate+unit);

					if (time>finish) {
						clearInterval(handle);
						if (pingpong == true) {
							//# change from and to
							setTimeout (function(){obj.coreFX ({duration: dur, from: target, to: source, ease: easing,property:opts.property,reverse:true,unit:unit});},10);
						}
					}
				}, 20);
			});
		}
	});
})(jQuery);
