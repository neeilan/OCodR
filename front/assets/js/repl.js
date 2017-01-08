document.languages = {
  RUBY : 'ruby',
  JS : 'nodejs',
  JAVA : 'java',
  CSHARP : 'csharp',
  FSHARP : 'fsharp'
}

var heads = {
	csharp :{
		start: 'public class Hello1{public static void Main() {',
		end:   ' }}'
	},
	java : {
		start: 'public class Main{public static void main(String[] args) {',
		end:   ' }}'
	}
};

function indent(code){
  var chars = code.toString().split('');
  var result = [];
  for (var i in chars){
    var char = chars[i];
    if (char == '{' || char == ';'){
      result.push(char);
      result.push('\n');
    }
    else if (char == '}'){
      result.push('\n');
      result.push(char);
    }
    else{
      result.push(char);
    }
  }
  return result.join('');
}


document.executeCode = function(language) { 
  var code;
  if (heads[language]){
    code = heads[language].start + out.value + heads[language].end;
  } else {
    code = out.value;
  }

  var REPLIT_TOKEN = {
    "msg_mac":"iEYgCNoz7R2NBWzEo/gIrvBC2wGFOgWntT2p9PI4qe0=", // expires in 5 days
    "time_created":1483841551000
  };

  function setResult(result){
    document.getElementById("result").innerHTML += '<br/>' + result;
  }

  var repl = new ReplitClient('api.repl.it', 80, language, REPLIT_TOKEN);

  repl.evaluateOnce(
     code, {
     stdout: function(output) {
       // output from the ruby process: hello world
       setResult(output);
     }
   }).then(
     function success(result) {
       // The evaluation succeeded. Result will contain `data` or `error`
       // depending on whether the code compiled and ran or if there was an
       // error.
       if (result.error) {
         setResult('Error:' + result.error);
       } else {
          setResult(result.data);
       }
     },
     function error(error) {
       // There was an error connecting to the service :(
       setResult('Error connecting to the service');
     }
   );
}

// var run = document.getElementById("execute");

// run.addEventListener('click', function() {
//     var code = codeToRun.value;
//     document.executeCode(document.languages.CSHARP, code);
// })
