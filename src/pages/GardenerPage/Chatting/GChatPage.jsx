import React, { useEffect, useState } from "react";
import { App as SendbirdApp } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useUser } from "@clerk/clerk-react";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";

function GChatPage() {
  const { user } = useUser();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (user) {
      const id = (user.primaryEmailAddress?.emailAddress).split("@")[0];
      setUserId(id);
    }
  }, [user]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SendbirdProvider
        appId={"296C6AE3-686D-44BF-8FDA-7DDFF64921C3"}
        userId={userId}
        nickname={user.fullName}
        profileUrl={user?.imageUrl}
        allowProfileEdit={true}
      >
        {/* <SendbirdApp
          appId={"296C6AE3-686D-44BF-8FDA-7DDFF64921C3"}
          userId={"0000001"}
          accessToken={"ACCESS_TOKEN"} // Optional, but recommended
        /> */}
      </SendbirdProvider>
    </div>
  );
}

export default GChatPage;
