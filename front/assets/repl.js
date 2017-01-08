document.languages = {
  RUBY : 'ruby',
  JS : 'nodejs',
  JAVA : 'java',
  CSHARP : 'csharp',
  FSHARP : 'fsharp'
}

function indentCode(code){
  var chars = code.split('');
  var result = [];
  for (var i in chars){
    var char = chars[i];
    if (char == '{' || char == ';'){
      result.push(char);
      result.push('\r');
    }
    else if (char == '}'){
      result.push('\r');
      result.push(char);
    }
    else{
      result.push(char);
    }
  }
  return result.join('');
}

document.executeCode = function(language, code){

  var REPLIT_TOKEN = {
    "msg_mac":"iEYgCNoz7R2NBWzEo/gIrvBC2wGFOgWntT2p9PI4qe0=", // expires in 5 days
    "time_created":1483841551000
  };

  function setResult(result, append){
    if (append){
      document.getElementById("result").innerHTML += ('<br/>' + result);
    }
    else{
    document.getElementById("result").innerHTML = result;
    }
  }

  var repl = new ReplitClient('api.repl.it', 80, language, REPLIT_TOKEN);
  repl.evaluateOnce(
     code, {
     stdout: function(output) {
       setResult(output, true);
     }
   }).then(
     function success(result) {
       // The evaluation succeeded. Result will contain `data` or `error`
       // depending on whether the code compiled and ran or if there was an
       // error.
       if (result.error) {
         setResult('Error:' + result.error);
       } else if (result.data) {
        setResult('Result:' + result.data, true);
       }
     },
     function error(error) {
       // There was an error connecting to the service :(
       setResult('Error connecting to the service');
     }
   );
}

var run = document.getElementById("execute");
var indent = document.getElementById("indent");

indent.addEventListener('click', function(){
  codeToRun.value = indentCode(codeToRun.value);
})

run.addEventListener('click', function() {
    var code = codeToRun.value;
    document.executeCode(document.languages.RUBY, code);
})
