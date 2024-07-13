import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const VideoSectionWrapper = styled.section`
  position: relative;
  height: calc(100vh - 100px);
  overflow: hidden;
  text-align: center;
`;

const VideoContainer = styled.div`
  position: relative;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
`;

const VideoText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding-left: 5%;
  padding-bottom: 5%;
  color: white;
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-size: 300%;
  text-align: left;
  width: 75%;
  z-index: 2;
  transition: opacity 0.3s ease;
`;

const VideoSection = () => {
  const [isHidden, setIsHidden] = useState(false);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const videoTextRef = useRef(null);
  const videoSources = [
    '/videos/XYZ.mp4',
    '/videos/xyz_vid_2.mp4'
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("ended", playNextVideo);
    video.addEventListener("loadeddata", handleLoadedData);

    playNextVideo();

    return () => {
      video.removeEventListener("ended", playNextVideo);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  const playNextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    setCurrentVideoIndex(nextIndex);
    videoRef.current.src = videoSources[nextIndex];
    videoRef.current.load();
  };

  const handleLoadedData = () => {
    videoRef.current.play();
  };

  const toggleOverlay = () => {
    if (isHidden) {
      overlayRef.current.style.opacity = "1";
      videoTextRef.current.style.opacity = "1";
      overlayRef.current.style.display = "block";
      videoTextRef.current.style.display = "block";
    } else {
      overlayRef.current.style.opacity = "0";
      videoTextRef.current.style.opacity = "0";
    }
    setIsHidden(!isHidden);
  };

  return (
    <VideoSectionWrapper>
      <VideoContainer>
        <Video id="video" ref={videoRef} autoPlay muted />

      </VideoContainer>
      <Overlay id="overlay" ref={overlayRef} onClick={toggleOverlay} />
      <VideoText id="video-text" ref={videoTextRef}>
        <h1>Dale un vistazo a nuestras ofertas</h1>
      </VideoText>
    </VideoSectionWrapper>
  );
};

export default VideoSection;
