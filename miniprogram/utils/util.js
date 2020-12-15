
// function formatDate(month,day){
const formatDate = (month,day) =>{
    let monthformat;
    let dayformat;
    let dateformat;
    if (month < 10) {
      monthformat = "0" + month;
    }
    else {
      monthformat = "" + month;
    }
    if (day < 10) {
      dayformat = "0" + day;
    }
    else {
      dayformat = "" + day;
    }
    dateformat = monthformat + dayformat
    console.log(dateformat)
    return dateformat;
  }

  module.exports = {
    formatDate: formatDate,
  }