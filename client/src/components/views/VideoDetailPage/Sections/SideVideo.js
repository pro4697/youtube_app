import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config.js';
import '../VideoDetailPage.css';

function SideVideo() {
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios.get(`${USER_SERVER}/api/video/getVideos`).then((response) => {
      if (response.data.success) {
        setSideVideos(response.data.videos);
      } else {
        alert('비디오 가져오기를 실패 했습니다.');
      }
    });
  }, []);

  const renderSideVideo = SideVideos.map((video, idx) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return (
      <div className='sideVideo' key={idx}>
        <div className='sideVideo__card'>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: '100%' }}
              src={`${USER_SERVER}/${video.thumbnail}`}
              alt='thumbnail'
            />
          </a>
        </div>
        <div style={{ width: '50%' }}>
          <a href={`/video/${video._id}`} style={{ color: 'grey' }}>
            <span style={{ fontSize: '1rem', color: 'black' }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views </span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: '3rem' }} />
      {renderSideVideo}
    </React.Fragment>
  );
}

export default SideVideo;
