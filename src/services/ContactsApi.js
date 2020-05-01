import axios from 'axios';

export default class ContactsApi {

  constructor() {
    this.baseUrl = 'https://contacts-service.herokuapp.com';
  }

  fetchContacts() {
    return axios.get(this.baseUrl + '/contacts');
  }

  getContact(contactId) {
    return axios.get(this.baseUrl + '/contacts/' + contactId);
  }

  updateContact(contactId, contact) {
    return axios.put(this.baseUrl + '/contacts/' + contactId, contact);
  }

  createContact(contact) {
    return axios.post(this.baseUrl + '/contacts', contact);
  }
}
