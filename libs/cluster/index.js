const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const appClaster = (appStart, scopeEnable) => {
  if (cluster.isMaster && scopeEnable) {
    console.log('**********************************************************');
    console.log(`Cluster Service: Master with pid ${process.pid} is running`);
    console.log('**********************************************************');
    // Fork workers.
    for (let i = 0; i < numCPUs; i += 1) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`Cluster Service: Worker with pid ${worker.process.pid} died`);
    });
  } else {
    // Start app
    appStart();
    console.log(`Service: Worker with pid ${process.pid} started`);
  }
}; // end function

module.exports = appClaster;
