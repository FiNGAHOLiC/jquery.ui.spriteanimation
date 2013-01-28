# jquery.ui.spriteanimation.js

jquery.ui.spriteanimation.js is a simple background image sprite animation plugin.

## Demo

http://fingaholic.github.com/jquery.ui.spriteanimation/

## Usage

### Options

* **fps** `Integer` Frame per second (default value is 30)
* **frameWidth** `Integer` Frame width (default value is 0)
* **frameHeight** `Integer` Frame height (default value is 0)
* **frameTotal** `Integer` Total frames (default value is 0)
* **bgLineChange** `Boolean` Use multiple background image or not (default value is false)
* **bgLineChangeNum** `Integer` Maximum number of frames per line (default value is 0)
* **frameLinePosY** `Integer` Initial background y position (default value is 0)
* **repeat** `Boolean` Repeat or not (default value is false)

### Base setting

```javascript
var $sprite = $('#sprite').spriteanimation({
	frameWidth: 200,
	frameTotal: 60
});
```
### Base setting with some options

```javascript
var $sprite = $('#sprite').spriteanimation({
	frameWidth: 200,
	frameHeight: 200,
	frameTotal: 60,
	bgLineChange: true,
	bgLineChangeNum: 20
});
```

### Control animation

#### Play

```javascript
$sprite.trigger('play.spriteanimation');
```

#### Stop

```javascript
$sprite.trigger('stop.spriteanimation');
```

#### Reverse

```javascript
$sprite.trigger('reverse.spriteanimation');
```

#### Rewind

```javascript
$sprite.trigger('rewind.spriteanimation');
```

#### Fast-Forward

```javascript
$sprite.trigger('fastforward.spriteanimation');
```

## Requirements

jQuery 1.7.x or later.
jQuery UI Widget 1.8.x or later.

## Browsers

IE6+ and other new browsers.

## License

Licensed under the MIT license.
