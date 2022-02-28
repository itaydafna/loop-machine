import styled from "styled-components";

const VideoBackground = () => {
  return (
    <Video autoPlay loop muted poster="background-video/video-poster-lw.png">
      <source src="background-video/club-ambient.mp4" type="video/mp4" />
    </Video>
  );
};

const Video = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
`;

export default VideoBackground;
