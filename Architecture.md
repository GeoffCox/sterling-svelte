# Architecture

## DOM event forwarding

Components forward all DOM events associated with the type of component.
The below list groups events based on their scope and purpose.

## Browser

- error (error loading external file)
  -offline
  -online
- storage (web storage was updated)

## Document & Page

- beforeunload
- hashchange
- load
- message
- open
- pagehide
- pageshow
- popstate
- resize
- unload

## Element

- fullscreenchange
- fullscreenerror

## Interaction

### Focus

- blur
- focus
- focusin
- focusout

### Keyboard

- keydown
- keypress
- keyup

### Mouse

- click
- contextmenu
- dblclick
- mousedown
- mouseenter
- mouseleave
- mousemove
- mouseover
- mouseout
- mouseup
- mousewheel
- wheel

### Touch

- touchcancel
- touchend
- touchmove
- touchstart

### Drag and Drop

- drag
- dragend
- dragenter
- dragleave
- dragover
- dragstart
- drop

### Other

- scroll (element is scrolled)
- search (type in a search box)
- show (right-click shows context menu)
- toggle (open/close &lt;details&gt; element)

## Clipboard

- copy
- cut
- paste

## Form

- change
- input
- invalid
- reset
- select
- submit

## Animation (CSS)

-animationend
-animationiteration
-animationstart
-transitionend

## Media

- abort
- canplay
- canplaythrough
- durationchange
- ended
- loadeddata
- loadedmetadata
- loadstart
- pause
- play
- playing
- progress
- ratechange
- seeked
- seeking
- stalled
- suspend
- timeupdate
- volumechange
- waiting

## Printing

- afterprint
- beforeprint
