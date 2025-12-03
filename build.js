import fs from "fs";
import path from "path";

const header = fs.readFileSync("src/wplaceplus.meta.js", "utf8");
let main = fs.readFileSync("src/main.js", "utf8");

// Inline simple local imports from src (e.g. Button.js) to avoid leaving `import` in built userscript
function inlineLocalImports(code) {
  return code.replace(/import\s+([^;]+)\s+from\s+["']\.\/([^"']+)\.js["'];?/g, (match, imports, file) => {
    const filePath = path.join("src", `${file}.js`);
    if (!fs.existsSync(filePath)) return match;
    let content = fs.readFileSync(filePath, "utf8");
    // Remove `export default ...;` and `export ` keywords so functions/consts are available inlined
    content = content.replace(/export\s+default\s+[^;\n]+;?/g, "");
    content = content.replace(/export\s+(function|const|let|var|class)\s+/g, "$1 ");
    content = content.replace(/export\s*{[^}]+};?/g, "");
    return content;
  });
}

main = inlineLocalImports(main);

const output = `${header}
(function () {
${main
  .split("\n")
  .map(l => "  " + l)
  .join("\n")}
})();
`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/wplace.user.js", output, "utf8");

console.log("Built dist/wplace.user.js");
