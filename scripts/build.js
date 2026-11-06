// Assembles docs/index.html from src/ as one self-contained page
// (open it straight from disk, or serve the docs/ folder with GitHub Pages).
// Usage: node scripts/build.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, "src", file), "utf8");

const reset = "<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}"
  + "body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n";

const html = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n"
  + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n"
  + reset + read("head.html") + "</head>\n<body>\n" + read("body.html")
  + "<script>\n" + read("engine.js") + "\n" + read("ui.js") + "\n</script>\n</body>\n</html>\n";

const out = path.join(root, "docs", "index.html");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html, "utf8");
console.log(`wrote docs/index.html (${Buffer.byteLength(html).toLocaleString("en-US")} bytes)`);
