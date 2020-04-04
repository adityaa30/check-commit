import * as core from "@actions/core";

import IGitActionSettings from "./settings";

export function getSettings(): IGitActionSettings {
    const settings = ({} as unknown) as IGitActionSettings;
    settings.compulsoryScope = (core.getInput('compulsory-scope') || 'true').toLowerCase() === 'true';

    return settings;
};
