# lovelace ld2410 control-card
### Custom control card for Hi-Link LD2410 Presence Detection
<hr>
This card is optimized for our firmware and hardware.
the hardware was designed by Giovanni Castania. can be purchased on the store.

why choose our firmware?
Our firmware is an optimization of the esphome ld2410 project.
we reduced the entities created by 20%. added additional zones for your automations.
Bluetooth adopting will create a name structure suitable for the card to recognize the various LD24XXs within your Home Assistant system.

why buy our hardware?
The entire hardware package is optimized. arrives with preloaded firmware and is ready for adoption.
everything will work without problems.
It is also modular, users will be able to add sensors and modules as they wish.
on the store's git there are codes for some of the most common sensors.
Furthermore, you will actively contribute to the project which required many hours of development and testing.

[![firmware](./example/firmware.png)](https://github.com/papperone/ESPresenceLD)  [![shop](./example/shop.png)](https://www.tindie.com/products/33322/)

<hr>


[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

[![buymeacoffee_badge](https://img.shields.io/badge/Donate-buymeacoffe-ff813f?style=flat)](https://www.buymeacoffee.com/madmicio)
[![PayPal.Me][paypal_me_shield]][paypal_me]


![image of the LD2410 card](./example/main.png)

## Hacs Card Install

1. add madmicio/lovelace-ld-2410-control-card as custom reposity

2. Find and install `LD2410 Control card` plugin


### Manual install

1. Download and copy `ampli-panel-card.js`, `DS-DIGII.TTF`, `LEDCalculator.ttf`

 from (https://github.com/madmicio/lovelace-ld-2410-control-card/releases) into your custom components  directory.

2. Add a reference `lovelace-ld2410-control-card.js`
` inside your resources config:

  ```yaml
  resources:
    - url: /local/"your_directory"/lovelace-ld2410-control-card.js

      type: module
  ```


### Card Config
#### Gui Config:
by configuring the card in the visual editor, by default you will find the first LD2410 device present in your Home Hassistant configured.
The card, in fact, searches for all the LD2410s present in your system and generates a list.
![image of the LD2410 card](./example/editor.png)

#### Default Editor Config:
you will find the first configured device and below a list of available devices.
N.B.: once you have selected the device you must click on the "+" icon

the configured devices that appear in the "LD2410 device list" are automatically removed from the list of available devices

by default the device assumes the friendly name of the project.
you can edit the name in the input box of each device.

![image of the LD2410 card](./example/editor2.png)


#### Manual Config:
```yaml
type: custom:ld2410-control-card
devices_name:
  - device: espresenceld_b655d0
    name: Living Room
  - device: espresenceld_a276e8
    name: Kitchen
```

### Divice Setup

in engineering mode you can configure the sensitivity of the device.
you can configure gates 2 to 8 and you can set the sensitivity of each gate.

if the red zone exceeds the purple line, then presence detection will be true

![image of the LD2410 card](./example/gates.png)

#### Addition Zone Config:


for your extra automations our project has a slider for the configuration of three additional zones. each additional zone has a binary sensor that you can use in your automations

![image of the LD2410 card](./example/zone.png)

### Options Config:
![image of the LD2410 card](./example/options.png)

[paypal_me]: https://paypal.me/maurizioarci
[paypal_me_shield]: https://img.shields.io/static/v1.svg?label=%20&message=PayPal.Me&logo=paypal