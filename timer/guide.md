The whole summary of the timer initially when a button is click it gets the data and convert its to a time so that we could compare the distance between the currDate and the date that was pick

For the countdown to work we need to set an interval that will call the function every time the reason why this work because we subtracted the currrent date and the date that was pick and automatically after we set the distance the hours,minutes,seconds,day automatically sums up using the distance

The Problem
I didn't know how I would be able to compare the timer but in order for it to work is that our input:date returns a date 2019-03-26 but its not useful for validating the distance for the current Date so what we did is that after we get the time we use Date.getTime() to calculate the milisseconds and same as on the currDate so that we could compare the distance between the two and start up the timer with a setInterval so that the countdown continually to tick
