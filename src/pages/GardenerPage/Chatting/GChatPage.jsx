import React, { useEffect, useState } from "react";
import "@sendbird/uikit-react/dist/index.css";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import "./GChatPage.css";

function GChatPage() {
  const [user, setUser] = useState({
    id: localStorage.getItem("account_id"),
    name: localStorage.getItem("account_name"),
    imageUrl: localStorage.getItem("account_avatar"),
  });
  const [channelUrl, setChannelUrl] = useState();

  return (
    <div className="gchat-chat-container">
      <SendbirdProvider
        appId={"296C6AE3-686D-44BF-8FDA-7DDFF64921C3"}
        userId={user.id}
        nickname={user.name}
        profileUrl={user?.imageUrl}
        allowProfileEdit={true}
      >
        <div className="gchat-chat-layout">
          {/* Channel List */}
          <div className="gchat-chat-sidebar">
            <GroupChannelList
              onChannelSelect={(channel) => {
                if (channel && channel.url) {
                  setChannelUrl(channel.url);
                } else {
                  // The channel might be null if it was deleted
                  setChannelUrl(null);
                }
              }}
              channelListQueryParams={{
                includeEmpty: true,
              }}
            />
          </div>
          {/* Channel Message Area */}
          <div className="gchat-chat-main">
            <GroupChannel channelUrl={channelUrl} />
          </div>
        </div>
      </SendbirdProvider>
    </div>
  );
}

export default GChatPage;
