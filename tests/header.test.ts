import { getDefaultSettings } from "../src/settings";
import { getConfig } from "../src/config";
import { Rule } from "../src/message-helper";


// Using default settings here
// If any test requires a custom setting, add that test in `input-parameters.test.ts`
describe('Header tests', () => {
    const settings = getDefaultSettings();
    const config = getConfig(settings);
    const commits = {
        scope1: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat(web-server): Sample commit with scope

- Sample commit`,
        scope2: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat(web-server-addon): Sample commit with-scope`,

        invalidScope1: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat(-hello): Sample commit with-scope`,
        invalidScope2: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat(web-server-addon-): Sample commit with-scope`,
        invalidScope3: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
feat(---): Sample commit with-scope`,

        fixup1: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
fixup! fixup! fix(web-server): Sample subject

- Sample commit fixup!`,
        fixup2: `commit 1828fab3d3445932b38beb648989605efb8ea70fe
fixup! feat(web): Sample subject with fixup!

- Sample commit fixup!
- Explanation sample`,
    };

    const createRule = (message: string) => { return new Rule(message, config); };

    it("Scope has '-' symbol", () => {
        const rule1 = createRule(commits.scope1);
        const rule2 = createRule(commits.scope2);

        expect(rule1.check()).toEqual(true);
        expect(rule2.check()).toEqual(true);
    });

    it("Scope has '-' symbol at start/end", () => {
        const rule1 = createRule(commits.invalidScope1);
        const rule2 = createRule(commits.invalidScope2);
        const rule3 = createRule(commits.invalidScope3);


        expect(() => rule1.check()).toThrow(Error);
        expect(() => rule2.check()).toThrow(Error);
        expect(() => rule3.check()).toThrow(Error);
    });

    it("Header has 'fixup! '", () => {
        const rule1 = createRule(commits.fixup1);
        const rule2 = createRule(commits.fixup2);

        expect(rule1.check()).toEqual(true);
        expect(rule2.check()).toEqual(true);
    });
});