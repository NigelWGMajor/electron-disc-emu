# Disc

A simple program to emulate a timer disk.

Uses electron to present a simple shell.

The emulation tries to emulate some dispalay elements which are updated in a cyc;lic loop much like would be expected with a microcontroller.

To emulate input from controls we might use a mouse click and scroll wheel, and present a menu in a limited display. This would be much like using a clickable encoder and a simple text display.

As of now, the ring of lights is randomly changed on a timer.

You can drag the ring from insoide any light.
Clkicking in the non-light space triggers a click event tat currently changes the timing
The scroll wheel is also available.

Simple device would use the scroll to change a menu displayed in the middle, and click would activate the current choice.

