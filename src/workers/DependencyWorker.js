import { ContactsApi } from '../services';
import { ContactsWorker } from './';

export default class DependencyWorker {

  constructor() {
    this.contactsApi = new ContactsApi()
  }

  makeContactsWorker() {
    return new ContactsWorker(this.contactsApi);
  }
}