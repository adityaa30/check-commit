import { getDefaultSettings } from "../src/settings";
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
        const settings = getDefaultSettings();
        settings.compulsoryScope = true;

        const config = getConfig(settings);

        const rule1 = new Rule(commits.scope, config);
        const rule2 = new Rule(commits.noscope, config);

        expect(rule1.check()).toEqual(true);
        expect(() => rule2.check()).toThrow(Error);
    });

    it('compulsory-scope is set false', () => {
        const settings = getDefaultSettings();
        settings.compulsoryScope = false;

        const config = getConfig(settings);

        const rule1 = new Rule(commits.noscope, config);
        const rule2 = new Rule(commits.scope, config);

        expect(rule1.check()).toEqual(true);
        expect(rule2.check()).toEqual(true);
    });
});