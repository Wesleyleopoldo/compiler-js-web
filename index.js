

const iframe = document.getElementById("sandbox");

iframe.srcdoc = `
  <!doctype.html>
    <html>
      <head>
        <meta http-equiv="Content-Security-Policy" content="
        default-src 'none';
        script-src 'unsafe-inline' 'unsafe-eval';
        connect-src 'none';
        img-src 'none';
        style-src 'unsafe-inline';
        ">
      </head>
      <body>
        <script>
          const send = (type, message) => parent.postMessage({type, message}, '*');
          console.log = (...args) => send('log', args.join(' '));
          console.error = (...args) => send('error', args.join(' '));
          
          window.addEventListener('message', (e) => {
            if (!e.data || e.data.type !== 'run') return;
            try {
                new Function(e.data.code)();
                send('done', 'Execução finalizada');
            } catch(error) {
                send('error', error.message);
            }
          });
        </script>
      </body>
    </html>
  "
  `

const divOutput = document.getElementById("output");

function printLine(type, message) {
  const divBash = document.getElementById("bash");
  let color = "white";

  if (type === "error") color = "red";
  if (type === "done") color = "lightgreen";

  divOutput.innerHTML += `<span style="color:${color}">>> ${message}</span><br>`;
  
  divBash.scrollTop = divBash.scrollHeight;
}

window.addEventListener("message", (e) => {
  if (!e.data) return;
  printLine(e.data.type, e.data.message);
});

function runCode() {
  const code = document.getElementById("code").value;
  iframe.contentWindow.postMessage({ type: "run", code }, "*");
}