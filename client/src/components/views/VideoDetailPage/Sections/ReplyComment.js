import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  const [S, setS] = useState('');

  useEffect(() => {
    let commentNumber = 0;
    props.commentLists.forEach((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
      setChildCommentNumber(commentNumber);
      if (commentNumber > 1) setS('s');
    });
  }, [props.parentCommentId, props.commentLists]);

  const renderReplyComment = (parentCommentId) =>
    props.commentLists.map(
      (comment, idx) =>
        comment.responseTo === props.parentCommentId && (
          <div style={{ width: '90%', marginLeft: '40px' }} key={idx}>
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
          </div>
        )
    );

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{
            userSelect: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'grey',
            margin: '0',
          }}
          onClick={onHandleChange}
        >
          View {ChildCommentNumber} more comment{S}
        </p>
      )}
      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
