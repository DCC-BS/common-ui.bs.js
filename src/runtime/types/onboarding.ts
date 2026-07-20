export type OnboardingPhase<Phases> = {
    name: Phases;
    onEnter?: () => Promise<void>;
    onExit?: () => Promise<void>;
};

export type OnboadingStepBuilder<Phases> = {
    addSteps: (steps: OnboardingStep[]) => OnboadingStepBuilder<Phases>;
    switchPhase: (phase: Phases) => OnboadingStepBuilder<Phases>;
    currentPhase: undefined | OnboardingPhase<Phases>;
    buildDriver: () => Driver;
};

export type tOrFunc<T> = T | (() => T);

export type OnboardingStep = DriveStep | {
    popover?: {
        title?: tOrFunc<string>,
        description?: tOrFunc<string>
    }
};

export interface State {
    name: "Initial" | "PhaseSwitched" | "StepsAdded";
}

export class Initial {
    name = "Initial" as const;
}

export class PhaseSwitched<Phases> implements State {
    name = "PhaseSwitched" as const;

    constructor(
        public readonly newPhase?: OnboardingPhase<Phases>,
        public readonly oldPhase?: OnboardingPhase<Phases>,
    ) {}
}

export class StepsAdded implements State {
    name = "StepsAdded" as const;

    constructor(public readonly newSteps: OnboardingStep[]) {}
}
