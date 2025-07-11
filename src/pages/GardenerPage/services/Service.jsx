import axios from "axios";

const CreateSendBirdUser = (userId, nickName, profileUrl) => {
  return axios.post(
    "https://api-{296C6AE3-686D-44BF-8FDA-7DDFF64921C3}.sendbird.com/v3/users",
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "34dfea68112c4511bb18590c",
      },
    }
  );
};

const CreateSendBirdChannel = (users, title) => {
  return axios.post(
    "https://api-{296C6AE3-686D-44BF-8FDA-7DDFF64921C3}.sendbird.com/v3/open_channels",
    {
      user_id: users,
      is_distinct: true,
      name: title,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "34dfea68112c4511bb18590c",
      },
    }
  );
};
