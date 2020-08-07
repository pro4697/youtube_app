import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip, Icon } from 'antd';
import { USER_SERVER } from '../../../Config.js';

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);

  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    axios
      .post(`${USER_SERVER}/api/like/getLikes`, variable)
      .then((response) => {
        if (response.data.success) {
          setLikes(response.data.likes.length);
          response.data.likes.forEach((like) => {
            if (like.userId === props.userId) setLikeAction('liked');
          });
        } else {
          alert('좋아요 정보 가져오기 실패.');
        }
      });
    axios
      .post(`${USER_SERVER}/api/like/getDislikes`, variable)
      .then((response) => {
        if (response.data.success) {
          setDislikes(response.data.dislikes.length);
          response.data.dislikes.forEach((dislike) => {
            if (dislike.userId === props.userId) setDisLikeAction('disliked');
          });
        } else {
          alert('싫어요 정보 가져오기 실패.');
        }
      });
  }, [props.userId, variable]);

  const onLike = () => {
    if (LikeAction === null) {
      axios
        .post(`${USER_SERVER}/api/like/upLike`, variable)
        .then((response) => {
          if (response.data.success) {
            setLikes(Likes + 1);
            setLikeAction('liked');

            if (DisLikeAction !== null) {
              setDislikes(Dislikes - 1);
              setDisLikeAction(null);
            }
          } else {
            alert('좋아요 실패.');
          }
        });
    } else {
      axios
        .post(`${USER_SERVER}/api/like/unLike`, variable)
        .then((response) => {
          if (response.data.success) {
            setLikes(Likes - 1);
            setLikeAction(null);
          } else {
            alert('좋아요 취소 실패.');
          }
        });
    }
  };

  const onDisLike = () => {
    if (DisLikeAction === null) {
      axios
        .post(`${USER_SERVER}/api/like/upDislike`, variable)
        .then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes + 1);
            setDisLikeAction('disliked');

            if (LikeAction !== null) {
              setLikes(Likes - 1);
              setLikeAction(null);
            }
          } else {
            alert('싫어요 실패.');
          }
        });
    } else {
      axios
        .post(`${USER_SERVER}/api/like/unDislike`, variable)
        .then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes - 1);
            setDisLikeAction(null);
          } else {
            alert('싫어요 취소 실패.');
          }
        });
    }
  };

  return (
    <div>
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          <Icon
            type='like'
            theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
            onClick={onLike}
          />
        </Tooltip>
        <span
          style={{ paddingLeft: '8px', marginRight: '10px', cursor: 'auto' }}
        >
          {Likes}
        </span>
      </span>
      <span key='comment-basic-dislike'>
        <Tooltip title='Disike'>
          <Icon
            type='dislike'
            theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
            onClick={onDisLike}
          />
        </Tooltip>
        <span
          style={{ paddingLeft: '8px', marginRight: '10px', cursor: 'auto' }}
        >
          {Dislikes}
        </span>
      </span>
    </div>
  );
}

export default LikeDislikes;
