const dayjs = require('dayjs');
// require('dayjs/locale/es')

// dayjs.locale('es')

const addMonths= (numMonth,date,format="YYYY-MM-DD")=>{
  try {
    return dayjs(date|| currentDate()).add(numMonth,"month").format(format)
  } catch (error) {
    return error;
  }
}

const currentDate = ()=>{
  return dayjs().toISOString()
}

const isExpired =(date)=>{
  try {
    return dayjs(currentDate()).isAfter(date);

  } catch (error) {
    return error;
  }

}

const remainingTimeByDays=(date)=>{
  return dayjs(date).diff(currentDate(), 'days') // 7 
}
const remainingTime=(date)=>{
  return dayjs(date).diff(currentDate(),"days",false) // 7 
}
const renewPoint =(date)=>{
  const current = isExpired(date) ? currentDate():date;
  return current;
}

const formatDate =(date,format="DD/MMMM/YYYY")=>{
  return dayjs(date).format(format);
}
module.exports={
  addMonths,
  currentDate,
  isExpired,
  renewPoint,
  remainingTime,
  remainingTimeByDays,
  formatDate
  
}