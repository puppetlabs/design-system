const { execSync } = require('child_process');
const fs = require('fs');
const klawSync = require('klaw-sync');

module.exports = {
  postGenerate({ dest }) {
    // Make scripts executable
    const scripts = klawSync(`${dest}/scripts`);
    scripts.forEach(({ path: filePath }) => fs.chmodSync(filePath, 0o755));

    // Install and run the newly-created project
    execSync('npm install', { cwd: dest, stdio: 'inherit' });
    execSync('npm start', { cwd: dest, stdio: 'inherit' });
  },
};
