function combineErrorMessage(messages: string[]): string {
    let errors = `Following ${messages.length} errors occurred:\n`;
    messages.forEach((val, idx) => {
        errors += `[${idx + 1}] ${val}\n`;
    });
    return errors;
}

export class MultipleInvalid extends Error {
    constructor(errors: string[]) {
        super(combineErrorMessage(errors));
        this.name = "MultipleInvalid";
    }
}

export class ValueError extends Error {
    constructor(message?: string | undefined) {
        super(message);
        this.name = "ValueError";
    }
}

export class ErrorCollector {
    private errors: string[] = [];

    public add(err: string) {
        this.errors.push(err);
    }

    public empty(): boolean {
        return this.errors.length == 0;
    }

    public getCollectiveError(): (null | Error | MultipleInvalid) {
        switch (this.errors.length) {
            case 0: {
                return null;
            };
            case 1: {
                return new Error(this.errors[0]);
            };
            default: {
                return new MultipleInvalid(this.errors);
            };
        }
    }

    public clear() {
        this.errors.length = 0;
    }
}