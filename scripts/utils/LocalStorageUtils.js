const isAvailable = function(){
  let test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
}();

const util = {
  get: function(key) {
    if(isAvailable) {
      return localStorage.getItem(key);
    }
  },
  set: function(key, value) {
    if(isAvailable) {
      return localStorage.setItem(key, value);
    }
  }
}

export default util;
