const gulp = require('gulp');
const rsync = require('gulp-rsync');
const GulpSSH = require('gulp-ssh');
const GulpShell = require('gulp-shell');
const fs = require('fs');

function sshConnection() {
  return new GulpSSH({
    ignoreErrors: false,
    sshConfig: {
      host: '212.42.196.109',
      port: 22,
      username: 'abm',
      privateKey: fs.readFileSync('/home/sam/.ssh/212.42.196.109'),
    }
  });
}


gulp.task('copyFiles', function deploy() {
  return gulp.src(['./**', '!./node_modules', '!./node_modules/**', '!./.git', '!./.git/**', '!./logs', '!./logs/**', '!./build', '!./build/**'])
    .pipe(rsync({
      hostname: '212.42.196.109',
      username: 'abm',
      destination: '~/INeed/WEB',
      archive: true,
      silent: false,
      compress: true,
    }));
});

function prepareFiles() {
  const gulpSSH = sshConnection();
  return gulpSSH.shell(['cd INeed/WEB', 'npm install', 'npm run build']);
}

function deployRestart() {
  const gulpSSH = sshConnection();
  return gulpSSH.shell(['pm2 restart INeed.WEB']);
}

gulp.task('deploy', [ 'copyFiles' ], prepareFiles);
gulp.task('deploy-restart', [ 'deploy' ], deployRestart);