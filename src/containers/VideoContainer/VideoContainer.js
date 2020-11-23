import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as faceapi from 'face-api.js';

import Logo from '../../components/Logo/Logo';
import MenuBar from '../../components/MenuBar/MenuBar';
import SettingModal from '../../components/SettingModal/SettingModal';
import VideoConferenceRoom from '../../components/VideoConferenceRoom/VideoConferenceRoom';
import Video from '../../components/Video/Video';

import {
  createActionForUserData,
  createActionToAddRoom,
  createActionToDeleteRoom,
  createActionToAddGroup,
  createActionToDeleteGroups,
  createActionToAddMembers,
  createActionToDeleteMembers,
  createActionToJoinMembersInRoom,
  createActionToDeleteMembersInRoom
} from '../../actions';
import styles from './VideoContainer.module.css';

const VideoContainer = ({
  socket,
  location,
  currentUser,
  memberInRoom,
  joinMember
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);
  console.log("isJoinedRoom?", isJoinedRoom);

  return (
    !isJoinedRoom
      ? < SettingModal
        setIsJoinedRoom={setIsJoinedRoom} />
      : <VideoConferenceRoom
        location={location}
        currentUser={currentUser}
        memberInRoom={memberInRoom}
        joinMember={joinMember}
      />
  );
};



/*

{
  console.log('VIDEO!!!!!');
  //window.history.back(); -> 이거 누르면 뒤로 가지 않을까용??? 나중에 핵심기능 구현하구 고민해보기...
  const [socketOn, setSocketOn] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  const videoWidth = 1000;
  const videoHeight = 550;
  const roomLinkId = location.pathname.split('/').pop();//'/room/여기'

  console.log(process.env.PUBLIC_URL);// empty

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/faceApiModels'; //process.env.PUBLIC_URL +
      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(startVideo());
    };
    loadModels();
  }, []);

  const startVideo = async () => {
    try {
      const result = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      videoRef.current.srcObject = result;
    }
    catch (err) {
      console.log(err);
    }
  };

  const emojis = {
    default: '😎',
    neutral: '🙂',
    happy: '😀',
    sad: '😥',
    angry: '😠',
    fearful: '😨',
    disgusted: '🤢',
    surprised: '😳'
  };

  const handleVideoPlay = () => {
    console.log('handle video Play!!!!');

    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      //emojis.default;

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      const displaySize = {
        width: videoWidth,
        height: videoHeight
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      console.log("SIZE SIZE", resizedDetections);
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

      if (detections.length > 0) {
        detections.forEach(element => {
          console.log("HERE", element);
          let status = "";
          let valueStatus = 0.0;
          for (const [key, value] of Object.entries(element.expressions)) {
            // console.log(element.expressions, '##', key, value, status);

            if (value > valueStatus) {
              status = key;
              valueStatus = value;
            }
          }


          //canvasRef.current.fillTex = emojis.default;
          //anvasRef.current.innerHTML = emojis.default;


        });
        const context = canvasRef.current.getContext('2d');
        const { _x, _y, _width, _height } = resizedDetections[0].detection._box;
        console.log("RESIZED", resizedDetections);

        if (context) {
          context.font = "300px";
          context.fillText('😎', _x, _y, _width);
        }


      } else {
        console.log("No Faces");
        console.log("canvasRef", canvasRef);
        const context = canvasRef.current.getContext('2d');

        //const { _x, _y, _width, _height } = resizedDetections[0].detection._box;
      }
    }, 1000);
  };

  return (

    <div className={styles.Video}>
      <div className={styles.LogoWrapper}>
        <Logo />
      </div>
      <div className={styles.Content}>
        <div className={styles.LeftSide}>
          <div className={styles.CanvasOnVideo}>
            <video
              ref={videoRef}
              width={videoWidth}
              height={videoHeight}
              onPlay={handleVideoPlay}
              autoPlay
              muted />
            <canvas
              ref={canvasRef}
              className='canvas'
              width={videoWidth}
              height={videoHeight} />
          </div>
          <div className={styles.MenuBar}>
            <MenuBar />
          </div>
        </div>
        <div className={styles.RightSide}></div>

        { <button onClick={() => setSocketOn(true)}>
          Join
        </button> }
        </div>
        </div>
      );
    };
*/

const mapStateToProps = (state) => {
  const { userReducer, memberInRoomReducer } = state;

  return {
    currentUser: userReducer,
    isLoggedIn: userReducer.isLoggedIn,
    memberInRoom: memberInRoomReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (userData) => { dispatch(createActionForUserData(userData)); },
    addRooms: (addedRoomData) => { dispatch(createActionToAddRoom(addedRoomData)); },
    deleteRooms: (id) => { dispatch(createActionToDeleteRoom(id)); },
    addGroups: (addedGroupData) => { dispatch(createActionToAddGroup(addedGroupData)); },
    deleteGroups: (arrayOfId) => { dispatch(createActionToDeleteGroups(arrayOfId)); },
    addMembers: (groupId, allMemberData) => { dispatch(createActionToAddMembers(groupId, allMemberData)); },
    deleteMembers: (groupId, arrayOfEmail) => { dispatch(createActionToDeleteMembers(groupId, arrayOfEmail)); },
    joinMember: (socketId) => { dispatch(createActionToJoinMembersInRoom(socketId)); },
    deleteLeavingMember: (socketId) => { dispatch(createActionToDeleteMembersInRoom(socketId)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);