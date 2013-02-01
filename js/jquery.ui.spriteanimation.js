/*!
 * jquery.ui.spriteanimation.js
 *
 * @modified  2013/02/01
 * @requires  jQuery 1.7.x or later &&
 *            jQuery UI Widget 1.8.x or later
 * @version   1.0.8
 * @author    FiNGAHOLiC
 * @link      https://github.com/FiNGAHOLiC/jquery.ui.spriteanimation
 * @license   The MIT License
 *
 */

;(function($, window, document, undefined){

	$.widget('ui.spriteanimation', {
		options : {
			fps: 30,
			frameWidth: 0,
			frameHeight: 0,
			frameTotal: 0,
			bgLineChange: false,
			bgLineChangeNum: 0,
			repeat: false
		},
		widgetEventPrefix : 'spriteanimation.',
		widgetEventSuffix : '.spriteanimation',
		_create : function(){
			this._setupProps();
			this._setEvents();
		},
		_setupProps: function(){
			var o = this.options;
			this._frameWidth = o.frameWidth;
			this._frameHeight = o.frameHeight;
			this._frameTotal = o.frameTotal - 1;
			this._bgLineChange = o.bgLineChange;
			this._bgLineChangeNum = o.bgLineChangeNum;
			this._frameLineNum = 0;
			this._frameCurrent = 0;
			this._repeat = o.repeat;
			this._timer = null;
			this._fps = Math.floor(1000 / o.fps);
		},
		_setEvents: function(){
			var suffix = this.widgetEventSuffix;
			this.element
				.on('play' + suffix, $.proxy(this._play, this))
				.on('stop' + suffix, $.proxy(this._stop, this))
				.on('rewind' + suffix, $.proxy(this._rewind, this))
				.on('reverse' + suffix, $.proxy(this._reverse, this))
				.on('fastforward' + suffix, $.proxy(this._fastforward, this));
		},
		_setPosition: function(x, y){
			this.element.css({
				backgroundPosition: x + 'px' + ' ' + y + 'px'
			});
		},
		_setFrame: function(num){
			this._frameCurrent = num;
			this._setPosition(
				this._frameWidth * num * -1,
				this._frameLineNum * this._frameHeight * -1
			);
		},
		_nextFrame: function(){
			var num = this._frameCurrent + 1;
			if(num > this._frameTotal){
				if(this._repeat){
					num = 0;
					if(this._bgLineChange){
						this._frameLineNum = 0;
					};
				}else{
					this._trigger('frameend');
					return false;
				};
			}else if(this._bgLineChange && (num % this._bgLineChangeNum) === 0){
				this._frameLineNum += 1;
			};
			this._setFrame(num);
			return true;
		},
		_prevFrame: function(){
			var num = this._frameCurrent - 1;
			if(num < 0){
				if(this._repeat){
					num = this._frameTotal;
					if(this._bgLineChange){
						this._frameLineNum = Math.ceil(((this._frameTotal + 1) / this._bgLineChangeNum) - 1);
					};
				}else{
					this._trigger('framefirst');
					return false;
				};
			}else if(this._bgLineChange && ((num + 1) % this._bgLineChangeNum) === 0){
				this._frameLineNum -= 1;
			};
			this._setFrame(num);
			return true;
		},
		_goFrame: function(direction){
			clearTimeout(this._timer);
			($.proxy(function loop(){
				if(this[direction ? '_nextFrame' : '_prevFrame']()){
					this._timer = setTimeout($.proxy(loop, this), this._fps);
				};
			}, this)());
		},
		_play: function(){
			this._goFrame(true);
		},
		_stop: function(){
			clearTimeout(this._timer);
		},
		_reverse: function(){
			this._goFrame(false);
		},
		_rewind: function(){
			clearTimeout(this._timer);
			if(this._bgLineChange){
				this._frameLineNum = 0;
			};
			this._setFrame(0);
		},
		_fastforward: function(){
			clearTimeout(this._timer);
			var num = this._frameTotal;
			if(this._bgLineChange){
				num = this._bgLineChangeNum - 1;
				this._frameLineNum = Math.ceil(((this._frameTotal + 1) / this._bgLineChangeNum) - 1);
			};
			this._setFrame(num);
		}
	});

})(jQuery, window, this.document);
