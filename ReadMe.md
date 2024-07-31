# Disc

A simple program to emulate a timer disk.

Uses electron to present a simple shell.

The emulation tries to emulate some dispalay elements which are updated in a cyclic loop much like would be expected with a microcontroller.

To emulate input from controls we might use a mouse click and scroll wheel, and present a menu in a limited display. This would be much like using a clickable encoder and a simple text display.

As of now, the ring of lights is randomly changed on a timer.

You can drag the ring from inside any of the lighted rectangles.
Clicking in the non-rectangle space triggers a click event that currently changes the timing
The scroll wheel is also available.

A simple interactive would use the scroll wheel to change a menu or selection dispayed in the center and a click would activate that menu option.

The ring of rectangles, and possibly the menu backround/brightness would likely indicate all status info, other than that in the text area.


Hardware assumptions:

- A number of neopixels 
- A rotary encoder
- A switch (possibly on the rotary encoder)
- A display - a couple of lines maybe 32 characters each

This should be enough for a basic machine with some functionality.

Additional optional hardware:

- Battery and charger
- Wifi and/or Bluetooth
- Keyboard or Midi HID via usb
- sd 

Prototype:

- Adafruit ESP32-S2 Reverse Feather TFT Feather PID:5345
  - 240 x 135 px 16-bit color
- Lithium Ion Polymer Batteryy 3.7 V 500 mAh PID:1578
- Neopixel Ring - 24 x 5050 RGB Led with integrated Drivers PID:1586
  

Essential elements:

**Control**

- 3 modes
  - up
  - down
  - select
- These could in minimal systems be the same physical signal with differening lengths or timing
  - Possible implementations:
    - Clickable Encoder
    - Up Down & Select buttons
  
**Display**

- Info
  - state
  - info/data
  - cycle/time

- Actions
  - request
  - change
  - accept

- Feedback
  - ack
  - busy
  - yes/no

**Engine view**

structure
- defines inputs
- defines outputs
startup
- declares stores
- declares routes
- declares levels
- opens inputs
cycle
- reads inputs
- triages
- processes
- outputs
An Engine simplifies the pattern, by replacing complex program flow with a more declarative, templated approach. The rationale at each level of handling is simplified to the point where much of the work is declarative in nature.
This leads to a sinmplified program structure and more versatility in how it is implemented. The "ultimate" engine would incorporate the simplicity and translatability of a RISC approach with declarative rules. The organizatiuon of the system would be clearly visualizable, in fact the structure would BE the diagram.

So how to do that, in reality?

First, the language we need to describe the process...

A _Trigger_ might come from an interrupt, a variable reaching some threshold, or perhaps just a timer tick; also the start or looping of the program itself.

The _Trigger_ also carries some information related to itself: these together define a _Signal_.

A _Signal_ needs to be handled: competing signals might need to be _Triaged_, or the priority might be predefined in the sequence in which sources are polled.

In any case, the appropriate handler would need to be determined, which could depend on the context in which the trigger occurs (For example any signal could mean a different thing depending on the context in which it occurs)

Any signal can produce an effect (via its handler) that affects the _State_ of the system. This _State_ is represented in stored values, some of which might have externally visble implications (LEDs, displays ...). The effects of _State_ changes are propagated through the system by further handlers that respond to the state changes and change other state in response. This implies that there might be a propagation delay.

From the viewpoint of time, a system is typically initialized by some _Startup_ routine, which sets up the initial _State_ before opening the channels through which _Triggers_ may be occur. After that it might eneter into a processing loop.
A processing loop may simply be a time-triggered cycle, or could be driven by data, for example in a stack or processing queue. Ultimately the cycle might exit and the process stop, closing the engine.

The purpose of defining an engine for this is to simplify the process control, and allow for a simplified set of instructions to be followed to achieve the desired outcomes with a minimum of complexity.

An "Ideal" execution engine should:

- Be intuitively layered
- Execute small quick actions
- Encapsulate transients
- Minimize memory movement
- Recognize and handle errors in line
- Support interrupts
- Encapsulate complexity
- Be easily reconfigurable
- Be understandable
- Be Self-documenting

## Guidance

### Be intuitively layered

Because there are differnt concerns at different levels and facets of organizing the problem domain, the solution should respect the natural lines of fracture.

### Execute small quick actions

In the spirit of Reduced Instruction sets, an action hsould be scoped to complete a meaningful unit oif work, while still leaving plenty of space in the cycle for other work. This is necessary to prevent recursive stacking and process hogging.

### Encapsulate transients

In a single action, it is common for additional storage to be needed while data is being transformed. This temprary bloat should where possible be wrapped within the actino and not persist outside of it.

### Minimize memory movement

When initial products are consumed, their storage can be recycled. This means that additional resources may not need to be allocated by careful use of storage.

### Recognize and handle errors in line

Every action is a forward transaction in time, and when the result is not usable this must be recognizable and there always should be a known path forward based on that recognition.

### Support interrupts

Because we never know when an action is commenced, what other demands may be placed on a syste,m, all operations must respect interruptability. The potential side effectys (including stacking and unstacking) are minimized by respecting the need for minimal atoimic transactions.

### Encapsulate complexity

Where complexity occurs, it should be contained in small efficient microcode implemenetations which are independently testable and replacable.

### Be easily reconfigurable

The portions of the system should be easily configured in relation to one another, and at a scale small enough for capoability but large enough to be understandable in their contributin to the system as a whole.

### Be understandable

Symbols and names must contribute to the communication of intent. Related concepts must use related terms.

### Be Self-documenting

Declarative elements, for example constants used for configuration, must be easy to interpret in the context of their intended use.

## Hmmmmm ... so what?

So, I need to design a simple system. It will have some input, some output, some user-generated signals, some visible output. I would like to be able to implement this in a couple of different environments (e.g. one embedded, another to emulate). To achieve that I would like a strong but simple abstract framework to organize my developemnt, a paradigm to guide the development, in which the major decisions can be made declaratively in relation to that framework, while the implementation details can be simple to code because the abstraction makes it so.

Okay. Tome to get Concrete (in an abstract kind of way LOL)

Build this:

Define inputs. Each will, when triggered, put some data in a store. The code to do that should be simple enough.  

Define Handlers. Each will, when triggered, chack to see if it is needed then either exit or invoke an action (or possibly a remedial action).

Actions take an input store and an optiona output store and do something.

## Another view...




