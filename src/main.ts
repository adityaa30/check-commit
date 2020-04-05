import * as core from "@actions/core";
import * as github from "@actions/github";

import { getCommitMessage } from "./git-helper";
import { getConfig } from "./config";
import { getSettings } from "./settings-helper";
import { Rule } from "./message-helper";

async function run(): Promise<void> {
    try {
        const commitSHA = github.context.sha;
        core.debug(`Commit Message SHA:${commitSHA}`);

        const message = await getCommitMessage(commitSHA);
        core.debug(`Commit Message Found:\n${message}`);

        const settings = getSettings();
        const config = getConfig(settings);
        const rule = new Rule(message, config);
        rule.check(); // raises an exception if any problem occurs

        // No problem occured. Commit message is OK
        core.info('Commit message is OK 😉🎉');
    } catch (err) {
        core.setFailed(`Action failed with error
        ${err.stack}`);
    }
};

run();