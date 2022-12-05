import { useState } from "react";
import { Ping, SaveLoginCredentials } from "../api/userAPI";

export default function useLocalStorage() {
  const [session, newSession] = useState(false);

  const setSession = async (props) => {
    if (props?.userInfo && props?.token) {
      const { userInfo, token } = props;
      SaveLoginCredentials(JSON.stringify({ ...userInfo, token }));
      newSession(true);
    }
  };

  const ping = async () => {
    let req = await Ping();
    if (req.success) {
      newSession(req.success);
    } else {
      newSession(req.success);
    }
  };

  return [session, setSession, ping];
}