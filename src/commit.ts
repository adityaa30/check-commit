import * as core from "@actions/core";

export default class Commit {
    sha: string;
    header: string;

    body: string;
    hasBody: boolean;

    constructor(commitStr: string) {
        let commit = commitStr.trim().split('\n');

        this.sha = commit[0];
        this.header = commit[1];

        if (commit.length > 2) {
            this.hasBody = true;
            this.body = commit.splice(2).join('\n');
        } else {
            this.hasBody = false;
            this.body = "";
        }
    }
};
