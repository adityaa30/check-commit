import { randomSHA } from "./utils";

import { getDefaultSettings } from "../src/settings";
import { getConfig } from "../src/config";
import { Rule } from "../src/message-helper";

describe('Input parameters tests', () => {
  const commits = {
    fixup: `commit ${randomSHA()}
fixup! fixup! feat(input): Sample commit fixup! with scope

- Sample commit fixup!
- Explanation sample`,
    scope: `commit ${randomSHA()}
feat(input): Sample commit subject with scope

- Sample commit body
- Explanation sample`,
    noscope: `commit ${randomSHA()}
feat: Sample commit subject with no scope

- Sample commit body
- Explanation sample`,
    longheader: `commit ${randomSHA()}
feat: This is a very very very very very long header which will raise an error

- Sample commit body
- Explanation sample`,
    shortHeader10: `commit ${randomSHA()}
feat: samp`,
    shortHeaderFixup: `commit ${randomSHA()}
fixup! fixup! fixup! feat: samp`,
    shortHeader12: `commit ${randomSHA()}
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