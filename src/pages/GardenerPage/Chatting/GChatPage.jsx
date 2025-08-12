import React, { useEffect, useState } from "react";
import "@sendbird/uikit-react/dist/index.css";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import { useSendbirdStateContext } from "@sendbird/uikit-react";
import chatService from "../../services/apiServices/chatService";
import "./GChatPage.css";

// Helper to extract receiver ID for 1-on-1 chats
function extractReceiverId(members, currentUserId) {
  const otherMember = members.find((m) => m.userId !== currentUserId);
  return otherMember?.userId ?? null;
}

// Save message to backend
async function saveChatMessage({
  senderId,
  receiverId,
  messageText,
  sentAt,
  messageStatus,
}) {
  try {
    await chatService.saveChatMessage({
      senderId,
      receiverId,
      messageText,
      sentAt,
      messageStatus,
    });
  } catch (error) {
    console.error("Failed to save message:", error);
  }
}

// Component to sync messages
const ChatMessageSync = ({ currentUserId }) => {
  const sdk = useSendbirdStateContext()?.stores?.sdkStore?.sdk;

  useEffect(() => {
    if (!sdk || !sdk.ChannelHandler) return;

    const handler = new sdk.ChannelHandler();

    // Listen to received messages
    handler.onMessageReceived = async (channel, message) => {
      const receiverId = extractReceiverId(channel.members, currentUserId);
      await saveChatMessage({
        senderId: message.sender.userId,
        receiverId,
        messageText: message.message,
        sentAt: new Date(message.createdAt),
        messageStatus: "RECEIVED",
      });
    };

    // Listen to sent messages
    handler.onMessageSent = async (channel, message) => {
      const receiverId = extractReceiverId(channel.members, currentUserId);
      await saveChatMessage({
        senderId: message.sender.userId,
        receiverId,
        messageText: message.message,
        sentAt: new Date(message.createdAt),
        messageStatus: "SENT",
      });
    };

    sdk.addChannelHandler("chat-sync-handler", handler);

    return () => {
      sdk.removeChannelHandler("chat-sync-handler");
    };
  }, [sdk, currentUserId]);

  return null;
};

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
        appId={"76B840AB-32EE-4792-B6C7-98FC3101C9D7"}
        userId={user.id}
        nickname={user.name}
        profileUrl={user?.imageUrl}
        allowProfileEdit={true}
      >
        {/* Message sync component */}
        <ChatMessageSync currentUserId={user.id} />
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
