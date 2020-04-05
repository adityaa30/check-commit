import * as core from '@actions/core';

import { IGitActionSettings, getDefaultSettings } from './settings';
import { ValueError } from './error-helper';

export function getSettings(): IGitActionSettings {
    const settings = getDefaultSettings();

    settings.compulsoryScope = (core.getInput('compulsory-scope') || 'false').toLowerCase() === 'true';

    let _maxHeaderLength = parseInt((core.getInput('max-header-length') || '50'));
    if (_maxHeaderLength == NaN || _maxHeaderLength <= 0) {
        throw new ValueError('max-header-length should be valid non-zero positive integer')
    } else {
        settings.maxHeaderLength = _maxHeaderLength;
    }

    return settings;
};
