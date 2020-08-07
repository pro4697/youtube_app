import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Row } from 'antd';
import { VideoRenderCards } from '../VideoRenderCards';
import { USER_SERVER } from '../../Config.js';

const { Title } = Typography;

function LandingPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    axios.get(`${USER_SERVER}/api/video/getVideos`).then((response) => {
      if (response.data.success) {
        setVideo(response.data.videos);
      } else {
        alert('비디오 가져오기를 실패 했습니다.');
      }
    });
  }, []);

  return (
    <div className='landing'>
      <Title level={3}>추천 영상</Title>
      <hr />
      <Row gutter={[32, 16]}>{VideoRenderCards.render(Video)}</Row>
    </div>
  );
}

export default LandingPage;
