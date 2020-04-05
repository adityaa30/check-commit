import IGitActionSettings from "./settings";

export interface RegexHeader {
    type: RegExp;
    scope: RegExp;
    subject: RegExp;

    combined: RegExp;
}

export interface IConfig {
    // Format for header: <type>(<scope>): <subject>
    header: RegexHeader;

    // Body strictly has first line empty
    body: RegExp;
};

export function getConfig(settings: IGitActionSettings): IConfig {
    const config = {} as IConfig;
    config.header = {} as RegexHeader;

    config.header.type = /[a-zA-Z]+/;
    config.header.scope = /\(([a-zA-Z]+)\)/;
    config.header.subject = /.+/; // Strictly has atleast on charater

    if (settings.compulsoryScope) {
        config.header.combined = /([a-zA-Z]+)\(([a-zA-Z]+)\)!?: (.+)/;
    } else {
        config.header.combined = /([a-zA-Z]+)(\(([a-zA-Z]+)\))?!?: (.+)/;
    }

    config.body = /^\n(.+\s*)*/;

    return config;
};
