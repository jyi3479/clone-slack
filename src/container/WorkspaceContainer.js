import React from "react";
import { Box } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  AddButton,
  Header,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from "../shared/style";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/store";
import { actionsCreators as dmActions } from "../redux/modules/dmReducer";
import { actionsCreators as workSpaceActions } from "../redux/modules/workSpaceReducer";
import ButtonList from "../component/WorkspaceContainer/ButtonList";

const WorkspaceContainer = (props) => {
  // toggle list
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.loginReducer);
  const workSpaceList = useSelector(
    (state) => state.workSpaceReducer.workspaceList
  );
  console.log(workSpaceList);

  const addWorkSpace = () => {
    dispatch(
      workSpaceActions.addSpace({
        workID: 5,
        workName: "53", // 백엔드에서 받아올때 앞에 두글자만 가져와서 state에 저장하기
        isNew: false, // 해당 workspace에 새로운 메세지가 들어왔는지 (T/F로만 할지, 숫자로 할지)
      })
    );
    console.log("워크스페이스 개설");
  };

  return (
    // <Box sx={{ flexGrow: 1, height: 1, backgroundColor: "#3F0E40" }}>

    <WorkspaceWrapper>
      <Workspaces>
        {workSpaceList.map((p, idx) => {
          return (
            <WorkspaceButton
              key={p.workID + "" + p.workName + idx}
              id={p.workID}
              onClick={() => {
                history.push(`/${userinfo.token.split(" ")[1]}/${p.workID}/0`);
                console.log(p.workID, p.workName);
                dispatch(dmActions.setDM(p.workID));
              }}
            >
              {p.workName}
            </WorkspaceButton>
          );
        })}

        <Button aria-describedby={id} onClick={handleClick}>
          <AddButton>+</AddButton>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2, cursor: "pointer" }} onClick={addWorkSpace}>
            새 워크스페이스 개설
          </Typography>
        </Popover>
      </Workspaces>
    </WorkspaceWrapper>

    // </Box>
  );
};

export default WorkspaceContainer;
