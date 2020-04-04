export default class ErrorCollector {
    private errors: string[] = [];

    public add(err: string) {
        this.errors.push(err);
    }

    public empty(): boolean {
        return this.errors.length == 0;
    }

    public getCollectiveError(): (null | Error) {
        switch (this.errors.length) {
            case 0: {
                return null;
            };
            case 1: {
                return new Error(this.errors[0]);
            };
            default: {
                let message = `Following ${this.errors.length} errors occurred:\n`;
                this.errors.forEach((val, idx) => {
                    message += `[${idx + 1}] ${val}\n`;
                });
                return new Error(message);
            };
        }
    }

    public clear() {
        this.errors.length = 0;
    }
}