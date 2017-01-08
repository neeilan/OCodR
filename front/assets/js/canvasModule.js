(function main(){
    //create new canvas
    var canvas = new handwriting.Canvas(document.getElementById("can"));
    canvasResize(canvas);

    //enable redo
    canvas.set_Undo_Redo(true, false);

    var run = document.getElementById("execute");
    var out = document.getElementById("out");
    var can = document.getElementById('can');
    var undo = document.getElementById('undo');
    var clear = document.getElementById('clear');

    window.onresize = function() {
        canvasResize(canvas);
    };  

     run.addEventListener('click', function() {
        document.executeCode(document.languages.RUBY);
    });

     can.addEventListener('mouseup', function() {
        canvas.recognize();
     });

     undo.addEventListener('click', function() {
        canvas.undo();
     });

     clear.addEventListener('click', function() {
        canvas.erase();
     });

    //callback for OCR Api
    canvas.setCallBack(function(data, err) {
        if(err) throw err;
        else {
            displayOut(data);
        };
     });

    //Set options
    canvas.setOptions(
        {
            language: "en",
            numOfReturn: 1
        }
    );
})();

   function displayOut(data) {
     out.value = indent(data);
   }

   function canvasResize(canvas) {
        can.width = window.innerWidth - 300;
        can.height = window.innerHeight;
        canvas.resize();
   }