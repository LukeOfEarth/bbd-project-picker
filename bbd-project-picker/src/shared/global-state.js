const { atom } = require('recoil');

export const session_id = atom({
    key:'session_id',
    default:''
  });