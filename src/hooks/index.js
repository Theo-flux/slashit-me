import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ping, SaveLoginCredentials } from '../api/userAPI';
import {
  setAnyTab,
  setExtraTab as setextratab,
  setAnyAction as setanyaction,
  setAnySuccess as setanysuccess,
} from '../store/reducers/helper';

export const useLocalStorage = () => {
  const [session, newSession] = useState(false);
  const [sessionInfo, newSessionInfo] = useState('');

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

  useEffect(() => {
    let storage = localStorage.getItem('userAuth');
    if (storage) {
      newSessionInfo(JSON.parse(storage));
    }
  }, []);

  return { session, setSession, sessionInfo, ping };
};

export const useToast = () => {
  const [options, setOptions] = useState({
    backgroundColor: 'red',
    textColor: '#fff',
    showToast: false,
    showIcon: false,
    text: 'Invalid request',
    duration: 10000,
  });

  function toast(option) {
    setOptions({ ...options, ...option, showToast: true });
  }

  function fadeOut() {
    setTimeout(() => {
      setOptions({ ...options, showToast: false });
    }, options.duration);
  }

  fadeOut();

  return [options, toast];
};

export const useTabs = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.helper.anyTab);
  const extraTab = useSelector((state) => state.helper.extraTab);
  const anyAction = useSelector((state) => state.helper.anyAction);
  const anySuccess = useSelector((state) => state.helper.anySuccess);
  const setActiveTab = (tab) => dispatch(setAnyTab(tab));
  const setExtraTab = (tab) => dispatch(setextratab(tab));
  const setAnyAction = (action) => dispatch(setanyaction(action));
  const setAnySuccess = (success) => dispatch(setanysuccess(success));

  return {
    activeTab,
    extraTab,
    anyAction,
    anySuccess,
    setActiveTab,
    setExtraTab,
    setAnyAction,
    setAnySuccess,
  };
};
