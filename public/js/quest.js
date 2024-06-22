const game_id = localStorage.getItem("gameId");
const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", function () {
    callbackForDelete = (responseStatus, responseData) => {
        console.log(responseStatus);
        console.log(responseData);
        if (responseStatus == 204) {
            localStorage.removeItem("gameId");
            localStorage.removeItem("heroId");
            window.location.href = currentUrl + "/index.html";
    };
    };
    fetchMethod(currentUrl + '/api/games/' + game_id, callbackForDelete, 'DELETE', null, null);
});


/* points counter + changer - code from https://codepen.io/fonrus/pen/PwvzKE */

score = 0;

// function go(x){
//   $({score: 0}).animate({score: x},{
//     duration: 1000,
//     easing:"linear",
//     step: function(now, fx){
//       $("#score").html(score + Math.floor(now));
//     },
//     queue:false,
//     complete: function(now, fx){
//       score += x;
//     }
//   });
//   $("#tag").fadeIn({
//     duration:700,
//     easing:"linear",
//     step:function(now, fx){
//       $(this).css("top", -55 * now  +"px");
//     }
//   }).fadeOut({
//     duration:300,
//     step:function(now, fx){
//       $(this).css("top",-55 * ( 2 - now) + "px");
//     }
//   });

// }


/* countdown timer - code from https://codepen.io/nw/pen/zvQVWM */

// function Timer(duration, element) {
// 	var self = this;
// 	this.duration = duration;
// 	this.element = element;
// 	this.running = false;
	
// 	this.els = {
// 		ticker: document.getElementById('ticker'),
// 		seconds: document.getElementById('seconds'),
// 	};
	
// 	document.getElementById('toggle').addEventListener('click', function() {
// 		var cl = 'countdown--wide';
// 		if (self.element.classList.contains(cl)) {
// 			self.element.classList.remove(cl);
// 		} else {
// 			self.element.classList.add(cl);
// 		}
// 	});
	
// 	var hammerHandler = new Hammer(this.element);
// 	hammerHandler.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
// 	hammerHandler.on('panup pandown', function(ev) {
// 		if (!self.running) {
// 			if (ev.direction === Hammer.DIRECTION_UP && self.duration < 999000) {
// 				self.setDuration(self.duration + 1000);
// 			} else if (ev.direction === Hammer.DIRECTION_DOWN && self.duration > 0) {
// 				self.setDuration(self.duration - 1000);
// 			}
// 		}
// 	});
	
// 	hammerHandler.on('tap', function() {
// 		if (self.running) {
// 			self.reset();
// 		} else {
// 			self.start();
// 		}
// 	})
// }

// Timer.prototype.start = function() {
// 	var self = this;
// 	var start = null;
// 	this.running = true;
// 	var remainingSeconds = this.els.seconds.textContent = this.duration / 1000;
	
// 	function draw(now) {
// 		if (!start) start = now;
// 		var diff = now - start;
// 		var newSeconds = Math.ceil((self.duration - diff)/1000);

// 		if (diff <= self.duration) {
// 			self.els.ticker.style.height = 100 - (diff/self.duration*100) + '%';
			
// 			if (newSeconds != remainingSeconds) {
// 				self.els.seconds.textContent = newSeconds;
// 				remainingSeconds = newSeconds;
// 			}
			
// 			self.frameReq = window.requestAnimationFrame(draw);
// 		} else {
// 			//self.running = false;
// 			self.els.seconds.textContent = 0;
// 			self.els.ticker.style.height = '0%';
// 			self.element.classList.add('countdown--ended');
// 		}
// 	};
	
// 	self.frameReq = window.requestAnimationFrame(draw);
// }

// Timer.prototype.reset = function() {
// 	this.running = false;
// 	window.cancelAnimationFrame(this.frameReq);
// 	this.els.seconds.textContent = this.duration / 1000;
// 	this.els.ticker.style.height = null;
// 	this.element.classList.remove('countdown--ended');
// }

// Timer.prototype.setDuration = function(duration) {
// 	this.duration = duration;
// 	this.els.seconds.textContent = this.duration / 1000;
// }

// var timer = new Timer(10000, document.getElementById('countdown'));
// timer.start();
