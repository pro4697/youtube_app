import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { USER_SERVER } from '../../../Config.js';

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState('');

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
    };

    axios
      .post(`${USER_SERVER}/api/comment/saveComment`, variables)
      .then((response) => {
        if (response.data.success) {
          props.refreshFunction(response.data.result);
          setCommentValue('');
        } else {
          alert('댓글 작성 실패');
        }
      });
  };

  return (
    <div>
      <br />
      <p>Comments</p>
      <hr />

      {props.commentLists &&
        props.commentLists.map(
          (comment, idx) =>
            !comment.responseTo && (
              <React.Fragment key={idx}>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  postId={props.postId}
                />
                <ReplyComment
                  parentCommentId={comment._id}
                  commentLists={props.commentLists}
                  postId={props.postId}
                />
              </React.Fragment>
            )
        )}

      <form style={{ display: 'flex', marginTop: '20px' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={onHandleChange}
          value={CommentValue}
          placeholder='댓글 작성...'
        >
          <br />
        </textarea>

        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          작성
        </button>
      </form>
    </div>
  );
}

export default Comment;
