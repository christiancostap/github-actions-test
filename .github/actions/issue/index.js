// To compile - npx ncc build .github/actions/issue/index.js -o .github/actions/issue/dist

const core = require('@actions/core');
const github = require('@actions/github');

async function run () {
  try {
    const token = core.getInput('token');
    const title = core.getInput('title');
    const body = core.getInput('body');
    const assignees = core.getInput('assignees');

    const octokit = github.getOctokit(token);
    console.log(github.context.repo)
    const res = await octokit.rest.issues.create({
      //owner: github.context.repo.owner,
      //repo: github.context.repo.repo,
      ...github.context.repo, // faz o mesmo que as duas linhas acima.
      title,
      body,
      assignees: assignees ? assignees.split(',') : undefined
    });
    console.log(res)
    core.setOutput('issue', JSON.stringify(res.data))

  } catch (error) {
    core.setFailed(error.message);
  }
}
run();