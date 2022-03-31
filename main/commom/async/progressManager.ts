class ProgressManager {
    public constructor(protected onStart: () => void, protected onEnd: () => void) {}

    protected stackNumber: number = 0;

    protected parent: ProgressManager;

    public start() {
        if (this.parent) {
            this.parent.start();
        }
        this.stackNumber++;
        this.triggerStart();
        return this;
    }

    public stop() {
        if (this.parent) {
            this.parent.stop();
        }
        this.stackNumber--;
        this.triggerEnd();
        return this;
    }

    public appendChild(child: ProgressManager) {
        child.linkParent(this);
        return this;
    }

    public linkParent(parent: ProgressManager) {
        this.parent = parent;
        return this;
    }

    protected triggerStart() {
        if (this.stackNumber === 1 && typeof this.onStart === 'function') {
            this.onStart();
        }
    }

    protected triggerEnd() {
        if (this.stackNumber === 0 && typeof this.onEnd === 'function') {
            this.onEnd();
        }
    }
}

export function createProgressManager(
    onStart?: () => void,
    onEnd?: () => void,
    parent?: ProgressManager
): ProgressManager;

export function createProgressManager(context: object, boolProperty: string, parent?: ProgressManager): ProgressManager;

export function createProgressManager(...args) {
    if (args.length >= 2 && typeof args[0] === 'object') {
        const [context, boolProperty, parent] = args;
        return createProgressManager(
            () => {
                context[boolProperty] = true;
            },
            () => {
                context[boolProperty] = false;
            },
            parent
        );
    } else {
        const [onStart, onEnd, parent] = args;
        return new ProgressManager(onStart, onEnd).linkParent(parent);
    }
}
