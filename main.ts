radio.onReceivedNumber(function (receivedNumber) {
    if (received == 0) {
        if (grupp == 114) {
            signalStrength1 = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        } else {
            if (grupp == 115) {
                signalStrength2 = radio.receivedPacket(RadioPacketProperty.SignalStrength)
                xMax = receivedNumber
            } else {
                if (grupp == 116) {
                    signalStrength3 = radio.receivedPacket(RadioPacketProperty.SignalStrength)
                    ymax = receivedNumber
                }
            }
        }
        received = 1
    }
})
input.onButtonPressed(Button.A, function () {
    if (visa == 1) {
        calibrate += 5
        basic.showNumber(calibrate)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (visa == 0) {
        visa = 1
    } else {
        visa = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (visa == 1) {
        calibrate += -5
        basic.showNumber(calibrate)
    }
})
let xFinal = 0
let xRadar = 0
let yRadar = 0
let x = 0
let y = 0
let ymax = 0
let signalStrength3 = 0
let signalStrength2 = 0
let signalStrength1 = 0
let calibrate = 0
let xMax = 0
let visa = 0
let received = 0
let grupp = 0
radio.setGroup(114)
grupp = 114
received = 0
visa = 0
xMax = 2
calibrate = 25
basic.forever(function () {
    if (received == 1) {
        grupp += 1
        if (grupp == 117) {
            grupp = 114
        }
        radio.setGroup(grupp)
        received = 0
        y = ((0 - signalStrength2 - calibrate) ** 2 + (0 - xMax - calibrate) ** 2 - (0 - signalStrength1 - calibrate) ** 2) / (2 * (0 - xMax - calibrate))
        x = ((0 - signalStrength2 - calibrate) ** 2 + (0 - xMax - calibrate) ** 2 - (0 - signalStrength3 - calibrate) ** 2) / (2 * (0 - xMax - calibrate))
        yRadar = Math.round(5 * y / (0 - xMax - calibrate))
        xRadar = Math.round(10 * x / (0 - xMax - calibrate))
        if (xRadar > 4) {
            xFinal = 4
        } else {
            if (xRadar < 0) {
                xFinal = 0
            } else {
                xFinal = xRadar
            }
        }
        if (visa == 0) {
            basic.clearScreen()
            if (yRadar > 4) {
                led.plot(xFinal, 4)
            } else {
                if (yRadar < 0) {
                    led.plot(xFinal, 0)
                } else {
                    led.plot(xFinal, yRadar)
                }
            }
        }
    }
})
