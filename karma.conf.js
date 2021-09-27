// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-parallel'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-spec-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    parallelOptions: {
      executors: require('os') ? Math.ceil(require('os').cpus().length / 2) + 1 : 1,
    },
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: { random: true },
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/RestMenuAngular'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['spec', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    maxLogLines: 5,
    browserNoActivityTimeout: 60000,
    reportSlowerThan: 400,
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: false, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: true, // print the time elapsed for each spec
      failFast: false,
      prefixes: {
        success: 'OK: ', // override prefix for passed tests, default is '✓ '
        failure: 'FAILED: ', // override prefix for failed tests, default is '✗ '
        skipped: 'SKIPPED: ', // override prefix for skipped tests, default is '- '
      },
    },
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--no-sandbox', '--remote-debugging-port=9222'],
      },
      ChromeDebug: {
        base: 'Chrome',
        flags: ['--disable-gpu', '--no-sandbox', '--remote-debugging-port=9222'],
      },
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true,
  });
};
