import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './ContactGroups.module.css';
import ContactCards from '../ContactCards/ContactCards';
import { Redirect } from 'react-router-dom';

export default class ContactGroups extends React.Component {

  state = {
    contacts: [],
    redirect: null
  }

  constructor({ factory }) {
    super();
    this.worker = factory.makeContactsWorker();
  }

  async componentDidMount() {
    const contacts = await this.worker.fetchContacts();
    this.setState({ contacts });
  }

  didSelectContact(contact) {
    this.setState({
      contacts: this.state.contacts,
      redirect: <Redirect to={{
        pathname: `/${contact._id}`,
        contact
      }} />
    })
  }

  render() {
    const { contacts, redirect } = this.state;
    const contactGroups = this.worker.groupContacts(contacts);
    
    const tableView = contactGroups.map(contactGroup => {
      return (
        <div key={contactGroup.title}>
          <div className={styles.header}>
            <Typography>{contactGroup.title}</Typography>
          </div>
          <div className={styles.content}>
            <ContactCards className={styles.content} contacts={contactGroup.contacts} didSelectContact={this.didSelectContact.bind(this)}/>
          </div>
        </div>
      )
    })

    const loadingView = (
      <Typography>Loading...</Typography>
    )

    return (
      redirect ? redirect : (
        <div className={styles.root}>
          {contactGroups.length ? tableView : loadingView}
        </div>
      )
    )
  }
}
