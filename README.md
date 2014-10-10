# core-jquery-fx
##### small jquery plugins 

This is a collection of (useful) effects using jquery.

## progressbar
A simple progressbar plugin.

``
$(<selector>).progressbar (<parameters>);
``

#### parameters:

* *text*: define the text to be used.
* *barcolor*: the color for the progressbar
* *backgroundcolor*: the backgroundcolor of the bar
* *percent*: the percentag of the progressbar

see the ``index.html`` for a demonstration.


## coreType
A typewriter plugin with configurable text, interval and type errors.

``
$(<selector>).coreType (<parameters>);
``

#### parameters:

* *text*: define the text to be used. otherwise the content from <selector> is used
* *interval*: delay between characters in milliseconds. defaults to 100 ms
* *errors*: define the typing error effect in the range from 0 to 100 where 0 means no errors.

see the ``index.html`` for a demonstration.

## coreFX
Add some simple effects to a selected element with easing support.

``
$(<selector>)).coreFX(<parameters>);
``

#### parameters:

* *duration*: duration of the effect in milliseconds. default is 500ms
* *from*: starting point for property
* *to*: end point for property
* *property*: css property to change, e.g. "top""
* *ease*: the easing funktion to use. see below
* *reverse*: true for pingpong effect, false otherwise
* *unit*: unit as string. e.g. "%" or "px". default is "px"

#### easing:
the following easing functions are supported

* linear
* spring
* easeOutBounce
* elastic
* mirror
* bouncePast
* easeFromTo
* easeInOutBack



