import styled, { css } from "styled-components";
import { lighten } from "polished";

import useLooper from "../hooks/useLooper";

import SamplePad from "./SamplePad";
import { ReactComponent as PlayIcon } from "../assets/play-circle-outline.svg";
import { ReactComponent as StopIcon } from "../assets/stop-circle-outline.svg";
import { ReactComponent as NotesIcon } from "../assets/musical-notes.svg";

import {
  COLORS,
  PADS_CONTAINER_EDGE,
  LOOPER_EDGE,
  RIBBON_HEIGHT,
  COUNTER_DOT_DIAMETER,
  LOADER_SPIN_DURATION
} from "../constants/style.constants";
import { LOOP_SECONDS_DURATION } from "../constants/app.constants";

const Looper = () => {
  const {
    isLooperOn,
    startLooper,
    stopLooper,
    pads,
    togglePad,
    elapsedLoopSeconds,
    isAllAudioLoaded
  } = useLooper();

  return isAllAudioLoaded ? (
    <LooperBody>
      <LooperBodyFront>
        <TopRibbon>
          {new Array(LOOP_SECONDS_DURATION).fill(null).map((_, index) => (
            <CounterDot
              key={index}
              index={index}
              isLooperOn={isLooperOn}
              elapsedLoopSeconds={elapsedLoopSeconds}
            />
          ))}
        </TopRibbon>
        <PadsContainer>
          {Object.values(pads).map(({ id, isActive, color }) => (
            <SamplePad
              key={id}
              id={id}
              isActive={isActive}
              isLooperOn={isLooperOn}
              color={color}
              toggleIsActive={() => togglePad(id)}
            />
          ))}
        </PadsContainer>
        <BottomRibbon>
          <StopButton width={50} onClick={stopLooper} />
          <PlayButton width={50} onClick={startLooper} />
        </BottomRibbon>
      </LooperBodyFront>
    </LooperBody>
  ) : (
    <>
      <LoaderContainer>
        <Loader width={200} />
        <LoadingText>Loading...</LoadingText>
      </LoaderContainer>
    </>
  );
};

const LooperBody = styled.div`
  height: ${LOOPER_EDGE}px;
  width: ${LOOPER_EDGE}px;
  background: ${COLORS.LOOPER_BODY};
  border-radius: 5%;
  transform-style: preserve-3d;
  transform: scale(0.8) rotate3d(1, 1, 1, -7deg);
  position: relative;

  &:hover {
    transform: scale(1);
  }

  transition: transform 0.5s;
`;

const LooperBodyFront = styled.div`
  height: ${LOOPER_EDGE}px;
  width: ${LOOPER_EDGE}px;
  border-radius: 5%;
  background: ${lighten(0.2, COLORS.LOOPER_BODY)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-15px);
`;

const PadsContainer = styled.div`
  padding: 5px;
  height: ${PADS_CONTAINER_EDGE}px;
  width: ${PADS_CONTAINER_EDGE}px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-around;
`;

const TopRibbon = styled.div`
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${RIBBON_HEIGHT}px;
  width: ${PADS_CONTAINER_EDGE}px;
`;

const BottomRibbon = styled.div`
  display: flex;
  align-items: center;
  height: ${RIBBON_HEIGHT}px;
  width: ${PADS_CONTAINER_EDGE}px;
`;

const buttonsBaseStyles = css`
  cursor: pointer;
  path {
    stroke: ${lighten(0.05, COLORS.LOOPER_BODY)};
  }
  path:last-child {
    fill: ${lighten(0.05, COLORS.LOOPER_BODY)};
  }
`;

const PlayButton = styled(PlayIcon)`
  ${buttonsBaseStyles};
`;

const StopButton = styled(StopIcon)`
  ${buttonsBaseStyles};
`;

const CounterDot = styled.div<{
  isLooperOn: boolean;
  index: number;
  elapsedLoopSeconds: number;
}>`
  height: ${COUNTER_DOT_DIAMETER}px;
  width: ${COUNTER_DOT_DIAMETER}px;
  border-radius: 50%;
  background-color: ${({ isLooperOn, index, elapsedLoopSeconds }) =>
    isLooperOn && index <= elapsedLoopSeconds
      ? COLORS.ACTIVE_COUNTER_DOT
      : COLORS.PAD_OFF};

  transition: background-color 0.3s;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loader = styled(NotesIcon)`
  fill: ${COLORS.LOADER_COLOR};
  animation-name: spin;
  animation-duration: ${LOADER_SPIN_DURATION}s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  color: ${COLORS.LOADER_COLOR};
  font-size: 30px;
  margin-top: 10px;
`;

export default Looper;
