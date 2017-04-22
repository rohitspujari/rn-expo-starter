import * as types from './types'
import { AsyncStorage } from 'react-native';
import Expo, { facebook } from 'expo';

export const facebookLogout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('fb-token');
    dispatch({ type: types.FACEBOOK_LOGOUT, payload: false })
  }
}

export const facebookLogin = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('fb-token');
    if (token) {
      // Token Found, Dispatch the action
      dispatch({ type: types.FACEBOOK_LOGIN_SUCCESS, payload: token })
    } else {
      // Token not found, initialte fb login process
      doFacebookLogin(dispatch);
    }
  }
}

const doFacebookLogin = async (dispatch) => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1868176373449008', {
      permissions: ['public_profile'],
  });

  if (type === 'success') {
      //debugger
    await AsyncStorage.setItem('fb-token', token)
    dispatch({ type: types.FACEBOOK_LOGIN_SUCCESS, payload: token })
  }
  if (type === 'cancel')
  {
    //debugger
    dispatch({ type: types.FACEBOOK_LOGIN_FAIL })
  }
}
