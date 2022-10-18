import { useReactive } from "ahooks";
import React from "react";

interface IState {
  currentStepIndex: number;
}
interface IMultistepForm {
  currentStepIndex: number;
  step: React.ReactElement;
  steps: React.ReactElement[];
  isFirstStep?: boolean;
  isLastStep?: boolean;
  next?: () => void;
  back?: () => void;
  goTo?: (index: number) => void;
}
export const useMultistepForm = (
  steps: React.ReactElement[]
): IMultistepForm => {
  const state = useReactive({
    currentStepIndex: 0
  });

  const isFirstStep = state.currentStepIndex === 0;
  const isLastStep = state.currentStepIndex === steps.length - 1;

  const next = () => {
    if (state.currentStepIndex >= steps.length - 1) {
      return;
    }
    state.currentStepIndex = state.currentStepIndex + 1;
  };

  const back = () => {
    if (state.currentStepIndex <= 0) {
      return;
    }
    state.currentStepIndex = state.currentStepIndex - 1;
  };

  const goTo = (index: number) => {
    state.currentStepIndex = index;
  };

  return {
    currentStepIndex: state.currentStepIndex,
    step: steps[state.currentStepIndex],
    isFirstStep,
    isLastStep,
    steps,
    next,
    back,
    goTo
  };
};
