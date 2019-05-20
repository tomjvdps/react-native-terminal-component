const fs = require('fs');
const escape = require('js-string-escape');

// XXX: This is a helper function to manage the translation between variables
//       provided from the function call within the react context to the static
//       JavaScript used to instantiate the Terminal.
const propagateVariables = (...names) => names.reduce(
  (str, name) => {
    return `${str}const ${name} = " + JSON.stringify(${name}) + ";`;
  },
  '',
)

// XXX: Initialization routine for the Terminal.
function setup(commandMapping) {
  const dispatch = (type, data = {}) => JSON.stringify({
    type,
    data,
  });
  const addKeyDownListener = (eventKey, target, onKeyDown) => {
    target.addEventListener('keydown', e => {
      if (e.key === eventKey) {
        onKeyDown();
        e.preventDefault();
      }
    });
  };
  const scrollToPageEnd = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  const viewRefs = {
    input: document.getElementById('input'),
    output: document.getElementById('output-wrapper')
  };
  const createOutputDiv = (className, textContent) => {
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(textContent));
    return div;
  };
  const outputToHTMLNode = {
    [Terminal.OutputType.TEXT_OUTPUT_TYPE]: content => createOutputDiv(
      'text-output',
      content,
    ),
    [Terminal.OutputType.TEXT_ERROR_OUTPUT_TYPE]: content => createOutputDiv(
      'error-output',
      content,
    ),
    [Terminal.OutputType.HEADER_OUTPUT_TYPE]: content => createOutputDiv(
      'header-output',
      `$ ${content.command}`,
    )
  };
  const displayOutputs = (outputs) => {
    viewRefs.output.innerHTML = '';
    const outputNodes = outputs.map(output =>
      outputToHTMLNode[output.type](output.content)
    );
    for (const outputNode of outputNodes) {
      viewRefs.output.append(outputNode);
    }
  };
  const getInput = () => viewRefs.input.value;
  const setInput = (input) => {
    viewRefs.input.value = input;
  };
  const clearInput = () => {
    setInput('');
  };
  const emulator = new Terminal.Emulator();
  let emulatorState = Terminal.EmulatorState.create({
    ...Terminal.EmulatorState.createEmpty(),
    'commandMapping': Terminal.CommandMapping.create({
      ...Terminal.defaultCommandMapping,
      ...Object.entries(commandMapping)
        .reduce(
          (obj, [key, { optDef }]) => {
            return {
              ...obj,
              [key]: {
                function: (state, opts) => {
                  window.postMessage(dispatch(
                    'ACTION_TYPE_COMMAND',
                    {
                      key,
                      opts,
                    },
                  ));
                  return {};
                },
                optDef,
              },
            };
          },
          {},
        ),
    }),
    // TODO: These require additional implementation props on the native side.
    //'fs': customFileSystem,
    //'environmentVariables': customEnvVariables,
    //'history': customHistory,
    //'outputs': customOutputs,
  });
  
  const historyKeyboardPlugin = new Terminal.HistoryKeyboardPlugin(emulatorState);
  const plugins = [historyKeyboardPlugin];

  // XXX: Global
  // TODO: The following two functions are really similar, condense.
  window.addOutput = (output) => {
    emulatorState = emulatorState.setOutputs(
      Terminal.Outputs.addRecord(
        emulatorState.getOutputs(),
        Terminal.OutputFactory.makeTextOutput(
          output,
        ),
      ),
    );
    displayOutputs(emulatorState.getOutputs());
    scrollToPageEnd();
    clearInput();
  };
  window.addErrorOutput = (err) => {
    emulatorState = emulatorState.setOutputs(
      Terminal.Outputs.addRecord(
        emulatorState.getOutputs(),
        Terminal.OutputFactory.makeErrorOutput(
          err,
        ),
      ),
    );
    displayOutputs(emulatorState.getOutputs());
    scrollToPageEnd();
    clearInput();
  };

  addKeyDownListener('Enter', viewRefs.input, () => {
    const commandStr = getInput();
    emulatorState = emulator.execute(emulatorState, commandStr, plugins);
    displayOutputs(emulatorState.getOutputs());
    scrollToPageEnd();
    clearInput();
  });
  addKeyDownListener('ArrowUp', viewRefs.input, () => {
    setInput(historyKeyboardPlugin.completeUp());
  });
  addKeyDownListener('ArrowDown', viewRefs.input, () => {
    setInput(historyKeyboardPlugin.completeDown());
  });
  addKeyDownListener('Tab', viewRefs.input, () => {
    const autoCompletionStr = emulator.autocomplete(emulatorState, getInput());
    setInput(autoCompletionStr);
  });
  // XXX: Inform the native runtime that the Terminal has become ready.
  setTimeout(
    () => {
      window.postMessage(dispatch(
      'ACTION_TYPE_READY',
      ));
    },
    // TODO: Need an asynchronous trigger for when the postMessage
    //       function becomes available. This implementation is
    //       coarse and a potential source of error on slow runtimes.
    1000,
  );
}

// XXX: This operation effectively concatenates the source files from a built
//      implementation of java-script terminal to generate a new React-Native
//      source file that can be used to pass dynamic properties based on the 
//      component props into. The end result is effectively a static string
//      which React Native is happy to treat as .html source content.
fs.writeFileSync(
  './demo-rn/terminal.min.js',
  `
    const escape = require('js-string-escape');

    module.exports = (commandMapping = {}, fontSize = '1.25em') => {
      return "${
        escape(
          `
             <!doctype html>
             <html>
               <head>
                 <meta charset='utf-8'>
                 <title>Terminal Emulator</title>
                 <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
                 <style>
                   ${
                     fs.readFileSync(
                       './demo-web/css/normalize.css',
                     )
                   }
                 </style>
                 <style>
                  html, body {
                    box-sizing: border-box;
                    color: white;
            `)   + "font-size: \"+fontSize+\";" + escape(
            `
                  }
                  *, *:before, *:after {
                    box-sizing: inherit;
                  }
                  body {
                    padding: 0.5%;
                  }
                  body, #input {
                    background: #171e1d;
                    font-family: monospace;
                  }
                  .input-wrapper {
                    display: flex;
                  }
                  #input, .input-wrapper {
                    color: #53eb9b;
                  }
                  #input {
                    flex: 2;
                    border: none;
                  }
                  #input:focus {
                    outline: none;
                  }
                  /* Output */
                  #output-wrapper div {
                    display: inline-block;
                    width: 100%;
                  }
                  .header-output {
                    color: #9d9d9d;
                  }
                  .error-output {
                    color: #ff4e4e;
                  }
                 </style>
               </head>
               <body>
                 <div id='output-wrapper'></div>
                 <div class='input-wrapper'>
                   <span>$&nbsp;</span><input id='input' type='text' autofocus/>
                 </div>
                 <script>
                   ${
                     fs.readFileSync(
                       './lib/terminal.js',
                     )
                   }
                 </script>
                 <script>
                 `,
               ) + propagateVariables('commandMapping') + escape(
                 `
                 ${setup.toString()}
                 setup(commandMapping);
                 </script>
               </body>
             </html>
          `,
        )
    }";
  }`
);
