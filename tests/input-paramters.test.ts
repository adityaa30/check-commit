import IGitActionSettings from "../src/settings";
import { getConfig } from "../src/config";
import { Rule } from "../src/message-helper";

describe('Input parameters tests', () => {
    const commits = {
        scope: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
        feat(input): Sample commit subject with scope

        - Sample commit body
        - Explanation sample`,
        noscope: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
        feat: Sample commit subject with no scope

        - Sample commit body
        - Explanation sample`
    };

    it('compulsory-scope is set true', () => {
        const settings = {} as IGitActionSettings;
        settings.compulsoryScope = true;

        const config = getConfig(settings);

        const ruleOK = new Rule(commits.scope, config);
        const ruleError = new Rule(commits.noscope, config);

        expect(ruleOK.check()).toEqual(true);
        expect(ruleError.check).toThrow(Error);
    });

    it('compulsory-scope is set false', () => {
        const settings = {} as IGitActionSettings;
        settings.compulsoryScope = false;

        const config = getConfig(settings);

        const ruleOK = new Rule(commits.noscope, config);
        const ruleOk2 = new Rule(commits.scope, config);

        expect(ruleOK.check()).toEqual(true);
        expect(ruleOk2.check()).toEqual(true);
    });
});