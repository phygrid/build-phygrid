import React from "react"
import ReactPlayer from "react-player"
import styled from "@emotion/styled"

const ResponsivePlayer = ({ url, aspectRatio = "16:9", ...props }) => {
  return (
    <PlayerWrapper aspectRatio={aspectRatio}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        {...props}
      />
    </PlayerWrapper>
  )
}

export default ResponsivePlayer

const PlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${props => props.aspectRatio.replace(":", " / ")};
  overflow: hidden;
  border-radius: var(--ant-border-radius);
  margin: 0 0 var(--ant-margin-xl) 0;

  /* Fallback for browsers that don't support aspect-ratio */
  @supports not (aspect-ratio: 16 / 9) {
    padding-bottom: ${props => {
      const [width, height] = props.aspectRatio.split(":")
      return `${(height / width) * 100}%`
    }};
    height: 0;
  }

  iframe,
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: var(--ant-border-radius);
  }
`
