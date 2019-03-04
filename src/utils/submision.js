import axios from 'axios'

function solved (pid,uid) {
    axios
    .get('http://localhost:4040/api/v1/submission/solved',{
        params: {
            "pid":pid,
            "uid":uid
        }
    })
    .then(function(response) {
        if(response.data.data.flag === true) {
            return true
        } else {
            return false
        }
    })
}

function unsolved () {

}

function submission () {

}

export {
    solved,
    unsolved,
}