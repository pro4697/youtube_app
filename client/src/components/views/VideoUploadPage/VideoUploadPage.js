import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import { USER_SERVER } from '../../Config.js';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
  { value: 1, label: 'Public' },
  { value: 0, label: 'Private' },
];

const CategoryOptions = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' },
];

function VideoUploadPage(props) {
  const user = useSelector((state) => state.user);
  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('Film & Animation');
  const [FilePath, setFilePath] = useState('');
  const [Duration, setDuration] = useState('');
  const [ThumbnailPath, setThumbnailPath] = useState('');

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    if (files[0] === undefined) {
      alert('50MB 이하의 파일만 업로드 할 수 있습니다.');
      return;
    }

    axios
      .post(`${USER_SERVER}/api/video/uploadfiles`, formData, config)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);

          let variable = {
            url: response.data.url,
            fileName: response.data.fileName,
          };

          setFilePath(response.data.url);

          axios
            .post(`${USER_SERVER}/api/video/thumbnail`, variable)
            .then((response) => {
              if (response.data.success) {
                setDuration(response.data.fileDuration);
                setThumbnailPath(response.data.url);
              } else {
                alert('썸네일 생성에 실패 했습니다.');
              }
            });
        } else {
          alert('비디어 업로드를 실패했습니다.');
        }
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };

    axios
      .post(`${USER_SERVER}/api/video/uploadVideo`, variable)
      .then((response) => {
        if (response.data.success) {
          message.success('성공적으로 업로드를 했습니다.');
          setTimeout(() => {
            props.history.push('/');
          }, 3000);
        } else {
          alert('비디오 업로드에 실패 했습니다.');
        }
      });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Title</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={52428800}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '320px',
                  height: '180px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type='plus' style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>
          {ThumbnailPath && (
            <div
              style={{
                display: 'flex',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <img
                src={`${USER_SERVER}/${ThumbnailPath}`}
                alt='thumbnail'
                style={{
                  width: '320px',
                  height: '180px',
                }}
              ></img>
            </div>
          )}
        </div>
        <br />
        <br />
        <div style={{ display: 'block', margin: 'auto 2rem' }}>
          <label>Title</label>
          <Input onChange={onTitleChange} value={VideoTitle}></Input>
          <br />
          <br />

          <label>Description</label>
          <TextArea
            onChange={onDescriptionChange}
            value={Description}
          ></TextArea>
          <br />
          <br />

          <select onChange={onPrivateChange}>
            {PrivateOptions.map((item, idx) => (
              <option key={idx} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <br />
          <br />
          <select onChange={onCategoryChange}>
            {CategoryOptions.map((item, idx) => (
              <option key={idx} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <br />
          <br />
          <Button type='primary' size='large' onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
