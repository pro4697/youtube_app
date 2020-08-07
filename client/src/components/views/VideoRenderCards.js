import React from 'react';
import { Card, Avatar, Col } from 'antd';
import moment from 'moment';
import { USER_SERVER } from '../Config.js';

const { Meta } = Card;

export const VideoRenderCards = {
  render(props) {
    return props.map((video, idx) => {
      var minutes = Math.floor(video.duration / 60);
      var seconds = Math.floor(video.duration - minutes * 60);

      return (
        <Col lg={6} md={8} xs={24} key={idx}>
          <a href={`/video/${video._id}`}>
            <div style={{ position: 'relative' }}>
              <img
                style={{ width: '100%' }}
                src={`${USER_SERVER}/${video.thumbnail}`}
                alt='thumnnail'
              ></img>
              <div className='duration'>
                <span>
                  {minutes} : {seconds}
                </span>
              </div>
            </div>
          </a>
          <br />
          <Meta
            avatar={<Avatar src={video.writer.image} />}
            title={video.title}
            description=''
          />
          <span>{video.writer.name}</span>
          <br />
          <span style={{ marginLeft: '3rem' }}>
            {video.views} views
          </span> ㆍ <span>{moment(video.createdAt).format('MMM Do YY')}</span>
        </Col>
      );
    });
  },
};
