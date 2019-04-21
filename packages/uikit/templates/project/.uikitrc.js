const fs = require('fs');
const klawSync = require('klaw-sync');

module.exports = {
  postGenerate({ dest }) {
    const scripts = klawSync(`${dest}/scripts`);

    scripts.forEach(({ path: filePath }) => fs.chmodSync(filePath, 0o755));
  }
}
