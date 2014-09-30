/******************************************************************
 coreType
  jquery typewriter plugin
 
 author: daniel kagemann
 
 history
   v0.1
    * basic functionality
	 * random typing errors 
	 * configurable text, interval and typeerrors
	 * html code will be ignored
   v0.2
    * added finish callback
 *****************************************************************/

(function($) {
	
	$.fn.extend ({
		
		//# extend with typewriter function
		coreType: function (opts) 
		{
			//# valid opts {text, interval,errors, finish}
			var	opts     = opts || {};
			
			return this.each (function() {
				var val = opts.text || $(this).html ();
				var ms  = opts.interval || 100;
				var typeerrors = opts.errors || 0;
            var callback = opts.finish || function(){};
				var idx = 0;
				var obj = $(this);
				var state = {Typing:0,Mistake:1,Correction:2,Wait:3};
				var action = state.Typing;
				var last   = action;
				var chars  = ['qwertzuiop','asdfghjkl','yxcvbnm'];
				
				obj.html ("");
				var handle = setInterval (function (){
					
					switch (action) {
					case state.Typing:
					
						//# check for HTML tags to ignore them
						var ig;
						if (val.charAt (idx) == "<") {
							ig = val.indexOf (">",idx);
							idx = (ig!=-1) ? ig+1 : idx;
						}
						if (val.charAt(idx) == "&") {
							ig = val.indexOf (";",idx);
							idx = (ig!=-1) ? ig+1 : idx;
						}
						
						//# random error cases
						if (idx > 0 && last == state.Typing && (Math.random()*100) < typeerrors) {
							last = action, action = state.Mistake;
							invalid = " ";
							
							for (var i=0;i<chars.length;i++) {
								var to = chars[i].indexOf (val.charAt(idx));
								if (to!=-1) {
									invalid = ((to+1) > chars[i].length) ? chars[i].charAt(to-1) : chars[i].charAt(to+1);
									break;
								}
							}
							
							obj.html (val.substring (0,idx-1)+invalid+"_");
						}
						else {
							obj.html (val.substring (0,idx)+"_");
							last = action;
						}
						
						if (++idx > val.length) {
							obj.html (val);
							clearInterval (handle);
                     callback();
						}
						break;
					case state.Mistake:
						idx-=2;
						last = action, action = state.Correction;
						break;
					case state.Correction:
						obj.html (val.substring (0,idx)+"_");
						last = action, action = state.Wait;
						idx++;
						break;
					case state.Wait:
						last = action, action = state.Typing;
						break;
					}
				},ms);
			});
		}
	
	});
})(jQuery);

