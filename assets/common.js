const common = {
  host: 'http://localhost',
  port: 8081
};

const timeManager = {
  /**
   * 月日时分秒补 0 函数
   * @returns {string} 返回补好 0 的时间格式
   */
  addZero (str) {
    return str - 0 < 10 ? `0${str}` : str;
  },

  getTime () {
    const time = new Date();
    const year = time.getFullYear();
    const month = timeManager.addZero(time.getMonth());
    const date = timeManager.addZero(time.getDate());
    const hours = timeManager.addZero(time.getHours());
    const minutes = timeManager.addZero(time.getMinutes());
    const seconds = timeManager.addZero(time.getSeconds());

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}: `;
  }

};

module.exports = {
  host: common.host,
  port: common.port,
  
  time: timeManager.getTime,
};