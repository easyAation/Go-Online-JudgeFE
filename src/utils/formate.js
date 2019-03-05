import moment from 'moment'

function formate (value) {
  let num = value * 100
  return num.toFixed(2) + '%'
}

function timePretty (time) {
//   return moment(parseInt(time)).format('YYYY-MM-DD HH:mm:ss')
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

function timePercent (time,start_time,end_time) {
  return  parseInt( (moment(time).diff(start_time, Number, false)) / (moment(end_time).diff(start_time, Number, false)) * 100 )
}

function timeagoPretty (time) {
  return moment(parseInt(time)).fromNow()
}

function timeContest (time) {
  let h = Math.floor(time / (1000 * 60 * 60))
  let m = Math.floor((time - h * 1000 * 60 * 60) / (1000 * 60))
  let s = Math.floor((time - h * 1000 * 60 * 60 - m * 1000 * 60) / 1000)
  let ss = ('0' + s).split('').reverse().join('').substr(0, 2).split('').reverse().join('')
  let mm = ('0' + m).split('').reverse().join('').substr(0, 2).split('').reverse().join('')
  return h + ':' + mm + ':' + ss
}

export {
  formate,
  timePretty,
  timeContest,
  timeagoPretty,
  timePercent
}