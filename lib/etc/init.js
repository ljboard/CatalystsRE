const fs = require("fs");

function main() {
  fs.readdir("./node_modules", function (err, dirs) {
    if (err) {
      console.log(err);
      return;
    }
    dirs.forEach(function(dir){
      if (dir.indexOf(".") !== 0) {
        let packageJsonFile = "./node_modules/" + dir + "/package.json";
        if (fs.existsSync(packageJsonFile)) {
          fs.readFile(packageJsonFile, function (err, data) {
            if (err) {
              console.log(err);
            }
            else {
              let json = JSON.parse(data);
              console.log('"'+json.name+'": "' + json.version + '",');
            }
          });
        }
      }
    });

  });
}

main();
