import fs from "fs";
import path from "path";
import config from "./config.js";
import crypto from "crypto";

const MODULES_DIR = path.join("modules");
const OUTPUT_FILE = path.join(config.dist.directory, "modules.json");
const ACCEPTED_EXTENSIONS = [".json", ".js", ".ts", ".jsx", ".tsx", ".md", ".py"];
const META_FILE = ["meta.json"]

const parseModules = dir => {
  const valid = message => {
    console.log(`${message} \u2705`);
  }

  const invalid = message => {
    console.log(`${message} \u274C`);
  }

  const accepted = str => {
    return ACCEPTED_EXTENSIONS.includes(path.extname(str))
  }

  const meta = str => {
    return (path.basename(str) == META_FILE);
  }

  const checksum = str => crypto.createHash('md5').update(str, 'utf8').digest('hex')

  const generateRoot = (type, module) => {
    switch (type) {
      case "django":
        return `/backend/modules/${module}`
      case "react-native":
        return `/modules/${module}`
    }
  }

  const parseModule = (moduleDir, callback) => {
    let entries = fs.readdirSync(moduleDir);
    entries.map(entry => {
      let entryPath = path.join(moduleDir, entry)
      let stats = fs.statSync(entryPath);
      if (stats.isDirectory()) {
        parseModule(entryPath, callback);
      } else if (accepted(entryPath)) {
        let filePath = path.join(...entryPath.split("/").splice(3));
        let content = fs.readFileSync(entryPath, "utf8");
        callback(filePath, content, meta(entryPath));
      }
    });
  }

  let data = {};
  let moduleTypes = fs.readdirSync(dir);
  moduleTypes.map(moduleType => {
    let modules = fs.readdirSync(path.join(dir, moduleType));
    console.log("")
    console.log("Parsing", moduleType, "modules...", "\n")
    modules.map(module => {
      let hasMeta = false;
      let slug = `${moduleType}-${module}`;
      let modulePath = path.join(dir, moduleType, module);
      data[slug] = {
        meta: {
          title: slug,
          description: "",
          type: moduleType,
          slug: slug,
          key: module,
          options: { "x": 0, "y": 0, "domTree": "" },
          root: generateRoot(moduleType, module),
          setup: "To properly configure this module, follow the instructions given in README.md inside the module folder."
        },
        files: {}
      };
      parseModule(modulePath, (filePath, content, meta = false) => {
        if (meta) {
          hasMeta = true
          data[slug].meta = Object.assign(data[slug].meta, JSON.parse(content));
        } else {
          data[slug].files[filePath] = content;
        }
        data[slug].meta.checksum = checksum(JSON.stringify(data[slug]));
      });

      // Validations
      let isValid = true;
      console.log("=>", slug)
      if (!hasMeta) {
        isValid = false;
        invalid("meta.json is missing");
      }
      if (moduleType == "react-native") {
        if (!data[slug].files["package.json"]) {
          isValid = false;
          invalid("package.json is missing")
        }
      }
      if (isValid) {
        valid("module passes all checks")
      }
    });
  })
  console.log("")
  console.log("Total of modules:", Object.keys(data).length);
  return data;
}

let data = parseModules(MODULES_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
