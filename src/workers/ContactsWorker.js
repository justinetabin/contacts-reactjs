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

  async getContact(contactId) {
    const { data } = await this.contactsApi.getContact(contactId);
    return new Contact(data);
  }

  async updateContact(contact) {
    const contactToUpdate = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber
    }
    const { data } = await this.contactsApi.updateContact(contact._id, contactToUpdate);
    return new Contact(data);
  }

  async createContact(contact) {
    const contactToCreate = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber
    }
    const { data } = await this.contactsApi.createContact(contactToCreate);
    return new Contact(data);
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