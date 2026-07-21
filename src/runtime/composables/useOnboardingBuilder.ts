import type { Config, DriveStep } from "driver.js";
import {
    Initial,
    type OnboadingStepBuilder,
    type OnboardingPhase,
    type OnboardingStep,
    PhaseSwitched,
    type State,
    StepsAdded,
    type tOrFunc,
} from "../types/onboarding";
import { useDriverFactory } from "./useDriveFactory";

export function useOnboardingBuilder(config?: Config) {
    const { createDriver } = useDriverFactory();
    const additionalConfig = { ...config };

    function addPhases<Phases>(
        phases: OnboardingPhase<Phases>[],
    ): OnboadingStepBuilder<Phases> {
        const phaseMap = phases.reduce(
            (map, x) => map.set(x.name, x),
            new Map<Phases, OnboardingPhase<Phases>>(),
        );
        return onboadingStepBuilder<Phases>(phaseMap);
    }

    function onboadingStepBuilder<Phases>(
        phaseMap: Map<Phases, OnboardingPhase<Phases>>,
        steps = [] as OnboardingStep[],
        currentPhase: OnboardingPhase<Phases> | undefined = undefined,
        state: State = new Initial(),
    ): OnboadingStepBuilder<Phases> {
        function addSteps(newSteps: OnboardingStep[]) {
            if (!newSteps.length) {
                throw new Error("steps cannot be empty");
            }

            if (state instanceof PhaseSwitched) {
                const step = newSteps[0];

                if (step) {
                    const oldPhase = state.oldPhase;
                    step.popover = {
                        ...step.popover,
                        onPrevClick: async (_, __, { driver }) => {
                            if (currentPhase?.onExit) {
                                await currentPhase?.onExit();
                            }

                            if (oldPhase?.onEnter) {
                                await oldPhase.onEnter();
                            }

                            driver.movePrevious();
                        },
                    };
                }
            }

            const newState = new StepsAdded(steps);
            return onboadingStepBuilder(
                phaseMap,
                steps.concat(newSteps),
                currentPhase,
                newState,
            );
        }

        function switchPhase(phase: Phases) {
            const currentStep = steps.at(-1);
            const newPhase = phaseMap.get(phase);

            if (!newPhase) {
                throw new Error(`Phase "${phase}" not found`);
            }

            if (phase === currentPhase?.name) {
                throw new Error(`Phase "${phase}" is already the current phase`);
            }

            // if the switch is an initial switch before any steps.
            if (steps.length === 0 && newPhase && newPhase.onEnter) {
                const onEnter = newPhase.onEnter;

                const parentOnHighlightStarted =
                    additionalConfig.onHighlightStarted;

                additionalConfig.onHighlightStarted = async (
                    element,
                    step,
                    opts,
                ) => {
                    if (parentOnHighlightStarted) {
                        parentOnHighlightStarted(element, step, opts);
                    }

                    if (!opts.state.previousStep) {
                        await onEnter();
                    }
                };
            } else if (currentStep && newPhase && newPhase !== currentPhase) {
                currentStep.popover = {
                    ...currentStep.popover,
                    onNextClick: async (_, __, { driver }) => {
                        if (currentPhase?.onExit) {
                            await currentPhase.onExit();
                        }

                        if (newPhase.onEnter) {
                            await newPhase.onEnter();
                        }

                        driver.moveNext();
                    },
                };
            }

            const newState = new PhaseSwitched(newPhase, currentPhase);
            return onboadingStepBuilder(phaseMap, steps, newPhase, newState);
        }

        function buildDriver(config?: Config) {
            function unwrap<T>(x?: tOrFunc<T>): T | undefined {
                if (typeof x === "function") {
                    const xFunc = x as () => T;
                    return xFunc();
                }

                return x;
            }

            const driveSteps = steps.map((x) => {
                return {
                    ...x,
                    popover: {
                        ...x.popover,
                        title: unwrap(x.popover?.title),
                        description: unwrap(x.popover?.description),
                    },
                } as DriveStep;
            });

            return createDriver(driveSteps, { ...additionalConfig, ...config });
        }

        return {
            addSteps,
            switchPhase,
            currentPhase,
            buildDriver,
        };
    }

    return {
        addPhases,
    };
}
