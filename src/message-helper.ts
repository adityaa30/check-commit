import * as core from "@actions/core";

import Commit from "./commit";
import { ErrorCollector } from "./error-helper";
import { IConfig } from "./config";

export const ALLOWED_TYPES = {
    feat: 'new feature for the user, not a new feature for build script',
    fix: 'bug fix for the user, not a fix to a build script',
    build: 'add required/missing build file',
    chore: 'updating grunt tasks etc; no production code change',
    docs: 'changes to the documentation',
    style: 'formatting, missing semi colons, etc; no production code change',
    refactor: 'refactoring production code, eg. renaming a variable',
    test: 'adding missing tests, refactoring tests; no production code change',
};

export class Rule {
    private commit: Commit;
    private errors: ErrorCollector;
    private config: IConfig;

    constructor(message: string, config: IConfig) {
        this.commit = new Commit(message);
        this.errors = new ErrorCollector();

        this.config = config;
    }

    private removeFixups(): boolean {
        const fixup = 'fixup! ';
        let found = false;
        while (this.commit.header.substr(0, fixup.length) === fixup) {
            found = true;
            this.commit.header = this.commit.header.substring(fixup.length);
        }
        if (found) {
            core.info("'fixup!' found in the commit header.\nPlease remove it before merge 🙂");

            // fixup! body should not be present (optional)
            if(this.commit.header.length === 0) {
                core.warning("'fixup!' commits generally dont have a body");
            }
        }

        return found;
    }

    private checkHeader(): boolean {
        let header = this.commit.header.match(this.config.header.combined);
        let ok = true;

        if (header == null) {
            ok = false;

            this.errors.add(
                'Header does not follow the format : '
                + '<type>(<scope>): <subject>'
            );

        } else {
            const type = header[1];
            const scope = header[3];
            const subject = header[4];

            // Check if type is a valid type
            if (!Object.keys(ALLOWED_TYPES).includes(type.toLowerCase())) {
                // Check if type is OK
                ok = false;

                let errorMessage = 'Type should be one of\n';
                Object.keys(ALLOWED_TYPES).forEach(val => {
                    errorMessage += `${val} - ${ALLOWED_TYPES[val]}\n`;
                });

                this.errors.add(errorMessage);
            }

            // Check if scope has '-' symbol at start or end?
            if (typeof scope == 'undefined' && !this.config.compulsoryScope) {
                // Its OK as scope is not compulsory
            } else if (typeof scope == 'undefined' && this.config.compulsoryScope) {
                ok = false;

                this.errors.add("Scope is compulsory inside the commit header")
            } else if (scope[0] == '-' || scope[scope.length - 1] == '-') {
                ok = false;

                this.errors.add("Scope cannot have '-' at the start or end");
            }
        }

        // Check for header length
        if (this.commit.header.length > this.config.maxHeaderLength) {
            ok = false; this.config.maxHeaderLength

            this.errors.add(`Length of header cannot be more than ${this.config.maxHeaderLength}.
If required, change the value of input parameter max-header-length in your .yml file`);
        }

        return ok;
    }

    private checkBody(): boolean {
        if (!this.commit.hasBody) return true;

        let ok = true;

        let body = this.commit.body.match(this.config.body);
        if (body == null) {
            ok = false;

            this.errors.add('There is no empty line after the header');
        }

        return ok;
    }

    public check(): boolean {
        let ok = true;

        this.errors.clear();
        this.removeFixups();

        let result1 = this.checkHeader();
        let result2 = this.checkBody();

        ok = result1 && result2;

        if (!ok)
            throw this.errors.getCollectiveError();

        return ok;
    }
};