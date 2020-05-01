import React from 'react';
import styles from './ContactCard.module.css';
import {
  Card,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  TextField,
  CardActions
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import SaveIcon from '@material-ui/icons/Save';

export default class ContactCard extends React.Component {

  state = {
    contact: null,
    error: null,
    redirect: null,
    contactToUpdate: null
  }
  contactId = null
  worker = null

  constructor({ location: { contact }, match: { params: { id } }, factory }) {
    super()
    this.state = {
      contact
    }
    this.contactId = id;
    this.worker = factory.makeContactsWorker();
  }

  async componentDidMount() {
    try {
      const contact = await this.worker.getContact(this.contactId);
      this.setState({ contact });
    } catch (error) {
      this.setState({ contact: null, error });
    }
  }

  async didTapSave() {
    const { contact } = this.state;
    try {
      const contactToUpdate = contact;
      this.setState({
        contact,
        contactToUpdate,
        updateMessage: 'Saving...'
      })
      const updatedContact = await this.worker.updateContact(contactToUpdate)
      this.setState({ 
        ...this.state,
        redirect: (
          <Redirect to={{
            pathname: `/${this.contactId}`,
            contact: updatedContact
          }} />
        )
      })
    } catch (error) {
      this.setState({ contactToUpdate: null, updateMessage: 'Failed to save.' });
    }
  }

  firstNameChanged(e) {
    const { contact } = this.state;
    contact.firstName = e.target.value;
    this.setState({ contact });
  }

  lastNameChanged(e) {
    const { contact } = this.state;
    contact.lastName = e.target.value;
    this.setState({ contact });
  }

  emailChanged(e) {
    const { contact } = this.state;
    contact.email = e.target.value;
    this.setState({ contact });
  }

  phoneNumberChanged(e) {
    const { contact } = this.state;
    contact.phoneNumber = e.target.value;
    this.setState({ contact });
  }

  render() {
    const { contact, error, redirect, contactToUpdate, updateMessage } = this.state;

    if (redirect) return redirect;

    const errorView = error ? (
      <Typography>
        Something went wrong...
      </Typography>
    ) : null

    const loadingView = (contact || error) ? null : (
      <Typography>
        Loading...
      </Typography>
    )

    const cardView = contact ? (
      <Card>
        <CardContent className={styles.header}>
          <Avatar style={{ width: "80px", height: "80px" }}>
          </Avatar>
        </CardContent>
        <CardContent className={styles.body}>
          <form noValidate autoComplete="off">
            <div className={styles.row}>
              <Typography className={`${styles.field} ${styles.placeholder}`}>First Name</Typography>
              <TextField className={styles.value} id="standard-basic" defaultValue={contact.firstName} onChange={this.firstNameChanged.bind(this)} />
            </div>
            <div className={styles.row}>
              <Typography className={`${styles.field} ${styles.placeholder}`}>Last Name</Typography>
              <TextField className={styles.value} id="standard-basic" defaultValue={contact.lastName} onChange={this.lastNameChanged.bind(this)} />
            </div>
            <div className={styles.row}>
              <Typography className={`${styles.field} ${styles.placeholder}`}>email</Typography>
              <TextField className={styles.value} id="standard-basic" defaultValue={contact.email} onChange={this.emailChanged.bind(this)} />
            </div>
            <div className={styles.row}>
              <Typography className={`${styles.field} ${styles.placeholder}`}>mobile</Typography>
              <TextField className={styles.value} id="standard-basic" defaultValue={contact.phoneNumber} onChange={this.phoneNumberChanged.bind(this)} />
            </div>
          </form>
        </CardContent>
        <CardActions className={styles.actions}>
          {updateMessage ? (<Typography className={styles.placeholder}>
            {updateMessage}
          </Typography>) : null}
          <IconButton onClick={this.didTapSave.bind(this)} disabled={contactToUpdate ? true : false}>
            <SaveIcon />
          </IconButton>
        </CardActions>
      </Card>
    ) : null

    const backButton = (
      <div className={styles.backBtn}>
        <IconButton component={Link} to={{
          pathname: `/${this.contactId}`,
          contact
        }}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </div>
    )

    return (
      <div className={styles.root}>
        {backButton}
        {loadingView}
        {errorView}
        {cardView}
      </div>
    )
  }
}