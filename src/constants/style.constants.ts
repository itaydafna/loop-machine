import { darken } from "polished";

export const COLORS = {
  LOOPER_BODY: "#696969",
  PAD_OFF: "#edeade",
  PAD_ON: "#fffdd0",
  ACTIVE_COUNTER_DOT: "#000080",
  LOADER_COLOR: "#ffffff"
};

export const LOOPER_EDGE = 550;
export const PADS_CONTAINER_EDGE = 420;
export const RIBBON_HEIGHT = 40;
export const COUNTER_DOT_DIAMETER = 20;

export const ACTIVE_PAD_ANIMATION_DURATION = 1.5;
export const LOADER_SPIN_DURATION = 5;

export enum PadAnimationStates {
  LOOPER_OFF_PAD_OFF = "LOOPER_OFF_PAD_OFF",
  LOOPER_OFF_PAD_ON = "LOOPER_OFF_PAD_ON",
  LOOPER_ON_PAD_OFF = "LOOPER_ON_PAD_OFF",
  LOOPER_ON_PAD_ON = "LOOPER_ON_PAD_ON"
}

export const PAD_BODY_ANIMATION_VARIANTS = {
  [PadAnimationStates.LOOPER_OFF_PAD_OFF]: {
    backgroundColor: darken(0.05, COLORS.PAD_OFF)
  },
  [PadAnimationStates.LOOPER_OFF_PAD_ON]: {
    backgroundColor: darken(0.05, COLORS.PAD_OFF)
  },
  [PadAnimationStates.LOOPER_ON_PAD_OFF]: {
    backgroundColor: darken(0.07, COLORS.PAD_ON)
  },
  [PadAnimationStates.LOOPER_ON_PAD_ON]: (color: string) => ({
    backgroundColor: darken(0.2, color)
  })
};

export const PAD_TOP_ANIMATION_VARIANTS = {
  [PadAnimationStates.LOOPER_OFF_PAD_OFF]: {
    y: -8,
    backgroundColor: COLORS.PAD_OFF
  },
  [PadAnimationStates.LOOPER_OFF_PAD_ON]: {
    y: -2,
    backgroundColor: COLORS.PAD_OFF
  },
  [PadAnimationStates.LOOPER_ON_PAD_OFF]: {
    y: -8,
    backgroundColor: COLORS.PAD_ON
  },
  [PadAnimationStates.LOOPER_ON_PAD_ON]: (color: string) => ({
    y: -2,
    backgroundColor: [color, darken(0.15, color)],
    transition: {
      backgroundColor: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: ACTIVE_PAD_ANIMATION_DURATION,
      }
    }
  })
};

export const determinePadAState = (
  isLooperOn: boolean,
  isPadActive: boolean
) => {
  if (!isLooperOn && !isPadActive) return PadAnimationStates.LOOPER_OFF_PAD_OFF;
  if (!isLooperOn && isPadActive) return PadAnimationStates.LOOPER_OFF_PAD_ON;
  if (isLooperOn && !isPadActive) return PadAnimationStates.LOOPER_ON_PAD_OFF;
  if (isLooperOn && isPadActive) return PadAnimationStates.LOOPER_ON_PAD_ON;
};
