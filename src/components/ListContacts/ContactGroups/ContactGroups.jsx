import React from 'react';
import { Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import styles from './ContactGroups.module.css';
import ContactCards from '../ContactCards/ContactCards';
import { Redirect } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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

  didSelectAdd() {
    this.setState({
      redirect: <Redirect to={'/new'} />
    })
  }

  render() {
    const { contacts, redirect } = this.state;

    if (redirect) return redirect;

    const contactGroups = this.worker.groupContacts(contacts);

    const addButton = contactGroups.length ? (
      <Card variant="outlined">
        <CardActionArea onClick={this.didSelectAdd.bind(this)}>
          <CardContent className={styles.add}>
            <AddCircleIcon />
          </CardContent>
        </CardActionArea>
      </Card>
    ) : null

    const tableView = contactGroups.length ? contactGroups.map(contactGroup => {
      return (
        <div key={contactGroup.title}>
          <div className={styles.header}>
            <Typography>{contactGroup.title}</Typography>
          </div>
          <div className={styles.content}>
            <ContactCards className={styles.content} contacts={contactGroup.contacts} didSelectContact={this.didSelectContact.bind(this)} />
          </div>
        </div>
      )
    }) : null

    const loadingView = contactGroups.length ? null : (
      <Typography>Loading...</Typography>
    )

    return (
      <div className={styles.root}>
        {addButton}
        {loadingView}
        {tableView}
      </div>
    )
  }
}
