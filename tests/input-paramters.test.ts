import { getDefaultSettings } from "../src/settings";
import { getConfig } from "../src/config";
import { Rule } from "../src/message-helper";

describe('Input parameters tests', () => {
    const commits = {
        fixup: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
fixup! fixup! feat(input): Sample commit fixup! with scope

- Sample commit fixup!
- Explanation sample`,
        scope: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat(input): Sample commit subject with scope

- Sample commit body
- Explanation sample`,
        noscope: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat: Sample commit subject with no scope

- Sample commit body
- Explanation sample`,
        longheader: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat: This is a very very very very very long header which will raise an error

- Sample commit body
- Explanation sample`,
        shortHeader10: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat: samp`,
        shortHeaderFixup: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
fixup! fixup! fixup! feat: samp`,
        shortHeader12: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat: sample`
    };

    it('compulsory-scope is set true', () => {
        const settings = getDefaultSettings();
        settings.compulsoryScope = true;

        const config = getConfig(settings);

        const rule1 = new Rule(commits.scope, config);
        const rule2 = new Rule(commits.noscope, config);
        const rule3 = new Rule(commits.fixup, config);

        expect(rule1.check()).toEqual(true);
        expect(() => rule2.check()).toThrow(Error);
        expect(rule3.check()).toEqual(true);
    });

    it('compulsory-scope is set false', () => {
        const settings = getDefaultSettings();
        settings.compulsoryScope = false;

        const config = getConfig(settings);

        const rule1 = new Rule(commits.noscope, config);
        const rule2 = new Rule(commits.scope, config);
        const rule3 = new Rule(commits.fixup, config);

        expect(rule1.check()).toEqual(true);
        expect(rule2.check()).toEqual(true);
        expect(rule3.check()).toEqual(true);
    });

    it('very long header', () => {
        const settings = getDefaultSettings();
        const config = getConfig(settings);

        const rule1 = new Rule(commits.longheader, config);
        const rule2 = new Rule(commits.fixup, config);

        expect(() => rule1.check()).toThrow(Error);
        expect(rule2.check()).toEqual(true);
    });

    it('max-header-length = 10', () => {
        const settings = getDefaultSettings();
        settings.maxHeaderLength = 10;

        const config = getConfig(settings);

        const rule1 = new Rule(commits.longheader, config);
        const rule2 = new Rule(commits.shortHeader12, config);
        const rule3 = new Rule(commits.shortHeader10, config);
        const rule4 = new Rule(commits.shortHeaderFixup, config);

        expect(() => rule1.check()).toThrow(Error);
        expect(() => rule2.check()).toThrow(Error);
        expect(rule3.check()).toEqual(true);
        expect(rule4.check()).toEqual(true);
    });
});