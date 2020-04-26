import { Contact } from '../models';

export default class ContactsWorker {

  constructor(contactsApi) {
    this.contactsApi = contactsApi
  }

  async fetchContacts() {
    const { data } = await this.contactsApi.fetchContacts();
    const contacts = data.map(datum => (new Contact(datum)));
    return contacts;
  }

  groupContacts(contacts) {
    const sortedContacts = contacts.sort((a, b) => ((a.firstName > b.firstName) ? 1 : -1));
    var contactGroups = []
    var index = ''
    sortedContacts.forEach(contact => {
      const firstLetter = contact.firstName[0].toUpperCase()
      if (index === firstLetter) {
        const index = contactGroups.findIndex(contactGroup => (contactGroup.title === firstLetter))
        contactGroups[index].contacts.push(contact);
      } else {
        index = firstLetter;
        contactGroups.push({
          title: firstLetter,
          contacts: [contact]
        });
      }
    })
    return contactGroups;
  }
}