function formatTime(date)  {
  var date = new Date(date);  
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
   
  return [year, month, day].join('-')
  }

  module.exports = {
  formatTime: formatTime
  }