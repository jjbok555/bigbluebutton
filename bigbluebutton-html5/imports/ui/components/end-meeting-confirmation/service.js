import axios, { post } from 'axios';

const deleteRoomDir = () => {

  const myStorage = window.sessionStorage;
  let item = myStorage.getItem("BBB_logoutURL").split("/");
  if(item.length>2){
    item = item[item.length-2];
  } else {
    item = null
  }

  axios.get('/bigbluebutton/delRoomDir?dir='+item).then((res) => {
    console.log("삭제");
  });

}
export default {
  deleteRoomDir,
};
