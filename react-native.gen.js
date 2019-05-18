const fs = require('fs');
const escape = require('js-string-escape');

fs.writeFileSync(
  './demo-rn/terminal.min.js',
  `module.exports = "${
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
            ${
              fs.readFileSync(
                './demo-web/css/main.css',
              )
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
            ${
              fs.readFileSync(
                './demo-web/js/main.js',
              )
            }
          </script>
        </body>
      
        </html>
      `
    )
  }";`
);
