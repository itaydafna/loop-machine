import { memo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import {
  PAD_BODY_ANIMATION_VARIANTS,
  PAD_TOP_ANIMATION_VARIANTS,
  determinePadAState
} from "../constants/style.constants";

type Props = {
  id: string;
  isActive: boolean;
  isLooperOn: boolean;
  color: string;
  toggleIsActive: () => void;
};

const SamplePad = ({ isActive, isLooperOn, color, toggleIsActive }: Props) => {
  return (
    <PadBody
      onClick={toggleIsActive}
      custom={color}
      variants={PAD_BODY_ANIMATION_VARIANTS}
      animate={determinePadAState(isLooperOn, isActive)}
    >
      <PadTop
        custom={color}
        variants={PAD_TOP_ANIMATION_VARIANTS}
        animate={determinePadAState(isLooperOn, isActive)}
      ></PadTop>
    </PadBody>
  );
};

const PadBody = styled(motion.div)`
  width: 31%;
  height: 31%;
  border-radius: 12px;
`;

const PadTop = styled(motion.div)`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default memo(SamplePad);
