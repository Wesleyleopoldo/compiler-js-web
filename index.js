function runCode() {
  const code = document.getElementById("code").value;
  const divOutput = document.getElementById("output");

  const originalLog = console.log;
  console.log = function(...args) {
    divOutput.innerHTML += ">> " + args.join(" ") + "<br>";
  };

  try {

    const resultado = eval(code);
    if (resultado !== undefined) {
      divOutput.innerHTML = resultado + "<br>";
      divOutput.style.color = "white";
    }
  } catch (error) {
    divOutput.innerHTML = "Erro: " + error.message + "<br>";
    divOutput.style.color = "red";
  }

}