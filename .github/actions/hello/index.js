// To compile - npx ncc build .github/actions/hello/index.js -o .github/actions/hello/dist
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // throw (new Error('some error message'));

  core.debug('Debug message');
  core.warning('Warning message');
  core.error('Error message');

  const name = core.getInput('who-to-greet');
  core.setSecret(name)
  console.log(`Hello ${name}`);

  const time = new Date();
  core.setOutput('time', time.toLocaleTimeString());

  core.startGroup('Logging github object');
  console.log(JSON.stringify(github, null, '\t'));
  core.endGroup();

  core.exportVariable('HELLO', 'hello o quê? Tá me tirando? Viaja ni mim não');
} catch (error) {
  core.setFailed(error.message);
}