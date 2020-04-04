import * as core from "@actions/core";

import Commit from "./commit";
import ErrorCollector from "./error-helper";

export const ALLOWED_TYPES = {
    feat: 'new feature for the user, not a new feature for build script',
    fix: 'bug fix for the user, not a fix to a build script',
    docs: 'changes to the documentation',
    style: 'formatting, missing semi colons, etc; no production code change',
    refactor: 'refactoring production code, eg. renaming a variable',
    test: 'adding missing tests, refactoring tests; no production code change',
    chore: 'updating grunt tasks etc; no production code change',
};

const regex = {
    // Format for header: <type>(<scope>): <subject>
    header: {
        type: /[a-zA-Z]+/,
        scope: /\(([a-zA-Z]+)\)/,
        subject: /.+/, // Strictly has atleast on charater
        combined: /([a-zA-Z]+)\(([a-zA-Z]+)\): (.+)/
    },

    // Body strictly has first line empty
    body: /\s*\n(.+)/
};


export class Rule {
    private commit: Commit;
    private errors: ErrorCollector;

    constructor(message: string) {
        this.commit = new Commit(message);
        this.errors = new ErrorCollector();
    }

    private checkHeader(): boolean {
        let header = this.commit.header.match(regex.header.combined);
        let ok = true;
        core.debug(`Checking commit header:\n${this.commit.header}`);

        if (header == null) {
            ok = false;

            // TODO: Check where is the problem exactly and raise exception with more accurate error message
            this.errors.add(
                'Header does not follow the format : '
                + '<type>(<scope>): <subject>'
            );

        } else if (!Object.keys(ALLOWED_TYPES).includes(header[1])) {
            // Check if type is OK
            ok = false;

            let errorMessage = 'Type should be one of\n';
            Object.keys(ALLOWED_TYPES).forEach(val => {
                errorMessage += `${val} - ${ALLOWED_TYPES[val]}\n`;
            });

            this.errors.add(errorMessage);
        }

        return ok;
    }

    private checkBody(): boolean {
        if (!this.commit.hasBody) return true;

        let ok = true;
        core.debug(`Checking commit body:\n${this.commit.body}`);

        let body = this.commit.body.match(regex.body);
        if (body == null) {
            ok = false;

            this.errors.add('There is no empty line after the header');
        }

        return ok;
    }

    public check(): boolean {
        let ok = true;

        this.errors.clear();

        ok = ok && this.checkHeader();
        ok = ok && this.checkBody();

        if (!ok)
            throw this.errors.getCollectiveError();

        return ok;
    }
};