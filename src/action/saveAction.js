import axios from 'axios';

const saveAction = (phoneNumbers) => {

  return axios.post('/save', phoneNumbers)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default saveAction;
