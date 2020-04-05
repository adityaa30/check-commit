export interface IGitActionSettings {

    // <scope> field will be compulsory
    compulsoryScope: boolean;

    // Maximum length that the header should have
    maxHeaderLength: number;

};

// Settings used while testing
export const getDefaultSettings = () => {
    return {
        compulsoryScope: false,
        maxHeaderLength: 50
    } as IGitActionSettings;
};