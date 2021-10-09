const moment = require('moment');

function formatMessage(username,text){
    return {
        username,
        text,
        time:moment().format('h:mm a')
    };

}
function formatJoin(text){
    return{
        text
    };
}
module.exports = {
    formatMessage,
    formatJoin
};