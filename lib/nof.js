(function() {
  var fs, path, walkFiles;

  fs = require('fs');

  path = require('path');

  // Recursively collect absolute file paths under `dir` (replaces walkdir.sync).
  walkFiles = function(dir) {
    var entries, files, full, i, len;
    files = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (error) {
      return files;
    }
    for (i = 0, len = entries.length; i < len; i++) {
      full = path.join(dir, entries[i].name);
      if (entries[i].isDirectory()) {
        files = files.concat(walkFiles(full));
      } else if (entries[i].isFile()) {
        files.push(full);
      }
    }
    return files;
  };

  module.exports = function(...specPaths) {
    var error, i, len, pattern, results, specContents, specDirectory, specPath, stats;
    specPaths = specPaths.flat(2e308);
    if (specPaths.length === 0) {
      specPaths = ['spec'];
    }
    specPaths = specPaths.map(function(directory) {
      return path.resolve(directory);
    });
    pattern = /^(\s*)f+(it|describe)((\s+)|(\s*\())/gm;
    results = [];
    for (i = 0, len = specPaths.length; i < len; i++) {
      specDirectory = specPaths[i];
      try {
        if (!fs.statSync(specDirectory).isDirectory()) {
          continue;
        }
      } catch (error1) {
        error = error1;
        continue;
      }
      results.push((function() {
        var j, len1, ref, ref1, results1;
        ref = walkFiles(specDirectory);
        results1 = [];
        for (j = 0, len1 = ref.length; j < len1; j++) {
          specPath = ref[j];
          try {
            stats = fs.statSync(specPath);
            if (!stats.isFile()) {
              continue;
            }
            if (stats.size === 0) {
              continue;
            }
          } catch (error1) {
            error = error1;
            continue;
          }
          if ((ref1 = path.extname(specPath)) !== '.coffee' && ref1 !== '.js') {
            continue;
          }
          specContents = fs.readFileSync(specPath, 'utf8');
          results1.push(fs.writeFileSync(specPath, specContents.replace(pattern, '$1$2$3')));
        }
        return results1;
      })());
    }
    return results;
  };

}).call(this);
