  //Set callback function
    can1.setCallBack(function(data, err) {
        if(err) throw err;
        else console.log(data);
    });

    //Set line width shown on the canvas element (default: 3)
    can1.setLineWidth(5);

    //Set options
    can1.setOptions(
        {
            language: "ja",
            numOfReturn: 3
        }
    );

    var run = document.getElementById("execute");

    run.addEventListener('click', function() {
        console.log('clicked');
    })

    //recognize captured trace
    can1.recognize();

    //Clear canvas, captured trace, and stored steps
    can1.erase();
