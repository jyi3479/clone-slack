import React, { useEffect, useRef, useState } from "react";
import { over, VERSIONS } from "stompjs";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicNoneIcon from "@mui/icons-material/MicNone";
import MoodIcon from "@mui/icons-material/Mood";
import { styled } from "@mui/material/styles";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { actionCreators as loginActions } from "../../redux/modules/loginReducer";
import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { actionsCreators as chatActions } from "../../redux/modules/chatReducer";
import EmojiList from "./Emojilist";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
var stompClient = null;
const ChatRoom = () => {
  //** */ 나중에 넣으면 될 것 로그인 정보임
  // const userinfo = useSelector((state) => state.loginReducer);
  // const loginNickname = userinfo.userinfo.nickname;
  //** */
  const [userData, setUserData] = useState({
    username: "회원정보",
    receivername: "받는 사람 정보",
    // imageUrl: "",
    connected: false,
    message: "",
  });
  const [viewMessage, setViewMessage] = React.useState("");
  // const [messages, setMessages] = React.useState([]);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatReducer.messageList);
  console.log(messages);
  const inputRef = React.useRef();

  //** submit 시 항상 아래로 고정시키기 위해, div scroll to 하기 위해 */
  const scrollRef = React.useRef();
  const scollToMyRef = () => {
    const scroll =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    scrollRef.current.scrollTo(0, scroll);
  };

  //** submit 시 항상 아래로 고정시키기 위해, div scroll to 하기 위해 */

  //** onChange message handling */
  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
    setViewMessage(value);
  };
  //** submit handling */
  const handleSubmit = (event) => {
    event.preventDefault();
    let message = inputRef.current.value;
    setUserData({ ...userData, message: message });
    const messageData = {
      senderName: userData.username,
      message: userData.message,
      receiverName: userData.receivername,
    };
    dispatch(chatActions.addMessage(messageData));
    // setMessages([...messages, userData]);
    console.log(userData);
    setUserData({ ...userData, message: "" });
    setViewMessage("");
  };
  //** 엔터 시 제출용  */
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return handleSubmit(e);
    }
  };
  //** 엔터 시 제출용  */

  //** 채팅창 스크롤 기능 구현을 위한 공간 */

  //** 채팅창 스크롤 기능 구현을 위한 공간 */

  //** 채팅창 박스*/

  //** 채팅창 박스*/

  //** 프로필 팝오버*/
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //** 프로필 팝오버*/

  //** 이모지 팝오버 */
  const [emojiEl, setEmojiEl] = React.useState(null);
  const emojiOpen = Boolean(emojiEl);
  const emojiId = emojiOpen ? "simple-popover" : undefined;
  const handleEmojiClick = (event) => {
    setEmojiEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setEmojiEl(null);
  };
  const addEmoji = (emoji) => {
    setUserData({ ...userData, message: userData.message + emoji });
    setViewMessage(viewMessage + emoji);
  };
  //** 이모지 팝오버 */
  //** 글씨 굵기 추가 */
  const boldText = () => {
    const start = inputRef.current.selectionStart; // 드래그 부분 시작인덱스
    const end = inputRef.current.selectionEnd; // 드래그 부분 종료 인덱스
    const startText = inputRef.current.value.substring(0, start); // 드래그 영역 앞부분
    const targetText = inputRef.current.value.substring(start, end); // 드래그 영역
    const endText = inputRef.current.value.substring(end); // 드래그 영역 뒷부분
    const result = startText + "<b>" + targetText + "</b>" + endText;
    // 드래그 영역 앞뒤로 <br> 추가
    setUserData({ ...userData, message: result });
    setViewMessage(result);
  };
  //** 글씨 굵기 추가 */

  //** 글씨 기울기 추가 */
  const italicText = () => {
    const start = inputRef.current.selectionStart; // 드래그 부분 시작인덱스
    const end = inputRef.current.selectionEnd; // 드래그 부분 종료 인덱스
    const startText = inputRef.current.value.substring(0, start); // 드래그 영역 앞부분
    const targetText = inputRef.current.value.substring(start, end); // 드래그 영역
    const endText = inputRef.current.value.substring(end); // 드래그 영역 뒷부분
    const result = startText + "<i>" + targetText + "</i>" + endText;
    // 드래그 영역 앞뒤로 <br> 추가
    setUserData({ ...userData, message: result });
    setViewMessage(result);
  };
  //** 글씨 기울기 추가 */

  //** 코드 스니펫 */
  // const setCode = () => {}
  //** 코드 스니펫 */
  // ** html 코드를 입력하기 위한...
  const changeHtml = (item) => {
    return <div dangerouslySetInnerHTML={{ __html: item }}></div>;
  };
  // ** html 코드를 입력하기 위한...

  React.useEffect(() => {
    scollToMyRef();
  }, [messages]);
  return (
    <Box sx={{ px: 3 }}>
      <Box
        ref={scrollRef}
        sx={{ height: 600, backgroundColor: "#ffffff", overflow: "auto" }}
      >
        {messages.map((item, index) => {
          return (
            <>
              <Box
                key={index + item.message}
                sx={{
                  mt: 1,
                }}
              >
                <Grid
                  container
                  sx={{
                    backgroundColor: "#ffffff",
                  }}
                >
                  <Grid item xs={0.6}>
                    <IconButton
                      sx={{ margin: "auto" }}
                      onClick={handleProfileClick}
                    >
                      <PersonIcon
                        sx={{
                          color: "white",
                          backgroundColor: "#44bedf",
                          border: "solid 0px",
                          borderRadius: "5px",
                          ml: 1,
                          mr: 1,
                          fontSize: "40px",
                          mb: 0,
                        }}
                        aria-describedby={id}
                      />
                    </IconButton>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      sx={{ width: 400 }}
                    >
                      <PersonIcon
                        sx={{
                          color: "white",
                          backgroundColor: "#44bedf",
                          border: "solid 0px",
                          borderRadius: "5px",
                          fontSize: "300px",
                        }}
                        aria-describedby={id}
                      />
                      <Typography
                        sx={{ p: 2, fontWeight: "bold", fontSize: "20px" }}
                      >
                        리덕스 사용자
                      </Typography>
                    </Popover>
                  </Grid>
                  <Grid item xs={11.4}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "17px" }}>
                      {item.senderName}
                    </Typography>
                    <Typography sx={{ fontSize: "15px" }}>
                      {changeHtml(item.message)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </>
          );
        })}
      </Box>
      <Box
        sx={{ border: "solid 1px #e2e2e2", borderRadius: "10px", marginTop: 2 }}
      >
        <Box
          sx={{
            backgroundColor: "#e2e2e2",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // borderBottomLeftRadius: 10,
            // borderBottomRightRadius: 10,
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
            <IconButton onClick={boldText}>
              <FormatBoldIcon />
            </IconButton>
            <IconButton onClick={italicText}>
              <FormatItalicIcon />
            </IconButton>
            <IconButton onClick={() => console.log("링크 버튼")}>
              <LinkIcon />
            </IconButton>
            <IconButton onClick={() => console.log("코드 스니펫 버튼")}>
              <CodeIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
        <form onSubmit={handleSubmit} onKeyDown={onEnterPress}>
          <textarea
            placeholder="이주영님에게 메시지 보내기"
            value={viewMessage}
            onChange={handleMessage}
            size="small"
            ref={inputRef}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                inputRef.current.value = inputRef.current.value + "<br/>";
              }
            }}
            style={{
              border: "solid 0px",
              padding: "10px",
              width: "95%",
              resize: "none",
              outlineColor: "#ffffff",
              backgroundColor: "#ffffff",
              // outline-color: #FE6B8B;
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ButtonGroup>
              <IconButton onClick={() => console.log("추가버튼")}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => console.log("비디오 버튼")}>
                <VideocamIcon />
              </IconButton>
              <IconButton onClick={() => console.log("녹음 버튼")}>
                <MicNoneIcon />
              </IconButton>
              <IconButton onClick={handleEmojiClick}>
                <MoodIcon />
              </IconButton>
              <Popover
                id={emojiId}
                open={emojiOpen}
                anchorEl={emojiEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ width: 400 }}
              >
                <Typography sx={{ p: 2, fontWeight: "bold", fontSize: "20px" }}>
                  이모티콘 선택
                </Typography>
                <hr style={{ borderBottom: "" }} />
                <ButtonGroup variant="text">
                  {EmojiList.emojiList1.map((item, index) => {
                    return (
                      <Button
                        onClick={() => {
                          addEmoji(item);
                        }}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </ButtonGroup>
                <ButtonGroup variant="text">
                  {EmojiList.emojiList2.map((item, index) => {
                    return (
                      <Button
                        onClick={() => {
                          addEmoji(item);
                        }}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </ButtonGroup>
                <ButtonGroup variant="text">
                  {EmojiList.emojiList3.map((item, index) => {
                    return (
                      <Button
                        onClick={() => {
                          addEmoji(item);
                        }}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </ButtonGroup>
                <ButtonGroup variant="text">
                  {EmojiList.emojiList4.map((item, index) => {
                    return (
                      <Button
                        onClick={() => {
                          addEmoji(item);
                        }}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </ButtonGroup>
                <ButtonGroup variant="text">
                  {EmojiList.emojiList5.map((item, index) => {
                    return (
                      <Button
                        onClick={() => {
                          addEmoji(item);
                        }}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Popover>
            </ButtonGroup>

            <IconButton type="submit" className="send-button">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "green",
                  px: 1,
                  py: 0.7,
                  justifyContent: "center",
                  justifyItems: "center",
                  border: "solid 0px",
                  borderRadius: "10px",
                }}
              >
                <SendIcon sx={{ color: "white" }} />
                <Typography
                  sx={{
                    mx: 1,
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  |
                </Typography>
                <ExpandMoreIcon sx={{ color: "white" }} />
              </Box>
            </IconButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ChatRoom;
