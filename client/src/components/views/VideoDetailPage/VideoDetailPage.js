import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, List, Avatar } from 'antd';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';
import { USER_SERVER } from '../../Config.js';
import './VideoDetailPage.css';

function VideoDetailPage(props) {
  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .post(`${USER_SERVER}/api/video/getVideoDetail`, {
        videoId: props.match.params.videoId,
      })
      .then((response) => {
        if (response.data.success) {
          setVideoDetail(response.data.videoDetail);
        } else {
          alert('비디오 정보 가져오기 실패.');
        }
      });

    axios
      .post(`${USER_SERVER}/api/comment/getComments`, {
        videoId: props.match.params.videoId,
      })
      .then((response) => {
        if (response.data.success) {
          setComments(response.data.result);
        } else {
          alert('코멘트 정보를 가져오는 것을 실패 하였습니다.');
        }
      });
  }, [props.match.params.videoId]);

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  if (VideoDetail.writer) {
    const subscribeBtn = VideoDetail.writer._id !==
      localStorage.getItem('userId') && (
      <Subscribe
        className='detail__subBtn'
        userTo={VideoDetail.writer}
        userFrom={localStorage.getItem('userId')}
      />
    );

    return (
      <Row gutter={[16, 16]} className='detail__row'>
        <Col lg={18} xs={24} className='detail__col'>
          <div className='detail__videoContainer'>
            <video
              className='detail__video'
              src={`${USER_SERVER}/${VideoDetail.filePath}`}
              controls
              autoPlay
            />
          </div>
          <div className='detail__meta'>
            <List.Item
              actions={[
                <LikeDislikes
                  video
                  userId={localStorage.getItem('userId')}
                  videoId={props.match.params.videoId}
                />,
                subscribeBtn,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail.writer.name}
                description={`${VideoDetail.views + 1} views ㆍ ${
                  VideoDetail.description
                }`}
              />
            </List.Item>
            <Comment
              refreshFunction={refreshFunction}
              commentLists={Comments}
              postId={props.match.params.videoId}
            />
          </div>
        </Col>
        <Col lg={6} xs={24} className='detail__Side'>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return null;
  }
}

export default VideoDetailPage;
