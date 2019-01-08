import axios from 'axios';
import alertify from 'alertify.js';

const saveAction = phoneNumbers => {
  return axios.post('/save', phoneNumbers)
  .then(function (response) {
    alertify.delay(900);
    alertify.logPosition('top right');
    alertify.success(response.data.message);
  })
  .catch(function (error) {
    alertify.delay(900);
    alertify.logPosition('top right');
    alertify.error('An unexpected error occurred!');
  });
}

export default saveAction;
