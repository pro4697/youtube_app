import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, Avatar } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config.js';
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    axios
      .post(`${USER_SERVER}/api/comment/saveComment`, variables)
      .then((response) => {
        if (response.data.success) {
          props.refreshFunction(response.data.result);
          setCommentValue('');
          setOpenReply(false);
        } else {
          alert('댓글 작성 실패');
        }
      });
  };

  const actions = [
    <LikeDislikes
      userId={localStorage.getItem('userId')}
      commentId={props.comment._id}
    />,
    <span onClick={onClickReplyOpen} key='comment-basic-reply-to'>
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt='image' />}
        content={<p>{props.comment.content}</p>}
      />
      {OpenReply && (
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder='코멘트를 작성해 주세요'
          />
          <br />
          <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
