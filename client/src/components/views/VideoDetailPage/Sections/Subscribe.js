import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config.js';
import '../VideoDetailPage.css';

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };

    axios
      .post(`${USER_SERVER}/api/subscribe/subscribeNumber`, variable)
      .then((response) => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert('구독자 수 정보 가져오기 실패');
        }
      });

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };

    axios
      .post(`${USER_SERVER}/api/subscribe/subscribed`, subscribedVariable)
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert('정보를 받아오지 못했습니다.');
        }
      });
  }, [props.userTo, props.userFrom]);

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    // 구독자
    if (Subscribed) {
      axios
        .post(`${USER_SERVER}/api/subscribe/unSubscribe`, subscribedVariable)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert('구독 취소에 실패하였습니다.');
          }
        });
    } else {
      // 구독자 아님
      axios
        .post(`${USER_SERVER}/api/subscribe/subscribe`, subscribedVariable)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert('구독에 실패하였습니다.');
          }
        });
    }
  };

  return (
    <div>
      <button
        className='subBtn'
        style={{
          backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscribe;
