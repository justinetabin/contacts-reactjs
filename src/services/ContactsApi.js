import axios from 'axios';

export default class ContactsApi {

  constructor() {
    this.baseUrl = 'https://contacts-service.herokuapp.com';
  }

  async fetchContacts() {
    return await axios.get(this.baseUrl + '/contacts');
  }
}
