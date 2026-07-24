const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const posthtml = require("posthtml");
const include = require("posthtml-include");

const htmlRoot = path.join(__dirname, "..", "app", "html");
const pagesDir = path.join(htmlRoot, "pages");
const projectRoot = path.join(__dirname, "..");

const banner =
  "<!-- Auto-generated from app/html/pages — edit the source there, not this file. -->\n";

function hashFile(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(content).digest("hex").slice(0, 8);
}

const cssHash = hashFile(path.join(projectRoot, "dist", "styles.css"));
const jsHash = hashFile(path.join(projectRoot, "app", "js", "script.js"));

fs.readdirSync(pagesDir)
  .filter((file) => file.endsWith(".html"))
  .forEach((file) => {
    const source = fs.readFileSync(path.join(pagesDir, file), "utf8");

    posthtml([include({ root: htmlRoot })])
      .process(source)
      .then((result) => {
        const html = result.html
          .replace('href="dist/styles.css"', `href="dist/styles.css?v=${cssHash}"`)
          .replace('src="app/js/script.js"', `src="app/js/script.js?v=${jsHash}"`);
        fs.writeFileSync(path.join(projectRoot, file), banner + html);
        console.log(`Built ${file}`);
      });
  });
