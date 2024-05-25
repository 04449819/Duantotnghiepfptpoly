import { memo } from "react";
import "./style.scss";
const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <video
        className="video1"
        width={"650px"}
        height={"600px"}
        autoPlay
        muted
        loop
      >
        <source src="https://videos.pexels.com/video-files/8346468/8346468-uhd_2160_4096_25fps.mp4" />
      </video>
    </div>
  );
};
export default memo(Homepage);
