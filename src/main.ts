import * as core from "@actions/core";
import * as github from "@actions/github";

import { getCommitMessage } from "./git-helper";

async function run(): Promise<void> {
    const commitSHA = github.context.sha;
    core.debug(`Commit Message SHA:${commitSHA}`);

    const message = await getCommitMessage(commitSHA);
    core.debug(`Commit Message Found:\n${message}`);
};

try {
    run();
} catch (err) {
    core.setFailed(`Action failed with error ${err}`);
}