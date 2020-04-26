import React from 'react';
import styles from './App.module.css';
import { ContactGroups } from './components';
import { ContactsApi } from './services'
import { ContactsWorker } from './workers';

export default class App extends React.Component {

  state = {
    contactGroups: []
  }

  constructor() {
    super();
    const contactsApi = new ContactsApi();
    this.worker = new ContactsWorker(contactsApi);
  }

  async componentDidMount() {
    const contacts = await this.worker.fetchContacts();
    const contactGroups = this.worker.groupContacts(contacts);
    this.setState({ contactGroups });
  }

  render() {
    const { contactGroups } = this.state;
    return (
      <div className={styles.root}>
        <ContactGroups data={contactGroups} />
      </div>
    )
  }
}