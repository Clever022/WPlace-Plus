import fs from "fs";
import path from "path";

const header = fs.readFileSync("src/wplaceplus.meta.js", "utf8");
const main = fs.readFileSync("src/main.js", "utf8");

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
