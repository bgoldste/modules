import fs from "fs";
import path from "path";

const REACT_NATIVE_MODULES = path.join("react-native");
const REACT_NATIVE_OUTPUT_FILE = "data.json";

let data = {};

const parseDir = dir => {
  let entries = fs.readdirSync(dir);
  entries.map(entry => {
    let entryPath = path.join(dir, entry)
    let stats = fs.statSync(entryPath);
    if (stats.isDirectory()) {
      parseDir(entryPath);
    } else {
      data[entryPath] = fs.readFileSync(entryPath, "utf8");
    }
  });
}

const parseModules = dir => {
  let modules = fs.readdirSync(dir);
  modules.map(module => {
    parseDir(path.join(dir, module));
  })
}

const parseData = (data, file) => {
  let map = {};
  Object.keys(data).map(key => {
    let paths = key.split("/");
    let base = paths.splice(0, 2);
    let file = paths.join("/");
    if (!map.hasOwnProperty(base[1])) {
      map[base[1]] = {};
    }
    Object.assign(map[base[1]], {
      [file]: {
        code: data[key],
        parentDir: null,
        newFile: true
      }
    });
  })
  fs.writeFileSync(file, JSON.stringify(map, null, 2));
}

parseModules(REACT_NATIVE_MODULES);
parseData(data, REACT_NATIVE_OUTPUT_FILE);