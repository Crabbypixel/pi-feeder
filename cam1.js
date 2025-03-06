const livestream = require('rpi_camera_livestream')

livestream.setVerboseMode(true)
livestream.setPort(3333)
livestream.setPathname('/webcam')
livestream.start().then(url => console.log(`Livestream started on ${url}`))

