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
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    },
    error: null,
    redirect: null,
    contactToCreate: null
  }
  contactId = null
  worker = null

  constructor({ factory }) {
    super()
    this.worker = factory.makeContactsWorker();
  }

  async didTapSave() {
    const { contact } = this.state;
    try {
      const contactToCreate = contact;
      this.setState({
        contact,
        contactToCreate,
        createMessage: 'Saving...'
      })
      await this.worker.createContact(contactToCreate)
      this.setState({ 
        ...this.state,
        redirect: (
          <Redirect to={{
            pathname: `/`
          }} />
        )
      })
    } catch (error) {
      this.setState({ contactToCreate: null, createMessage: 'Failed to save.' });
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
    const { error, redirect, contactToCreate, createMessage } = this.state;

    if (redirect) return redirect;

    const errorView = error ? (
      <Typography>
        Something went wrong...
      </Typography>
    ) : null

    const cardView = (
      <Card>
        <CardContent className={styles.header}>
          <Avatar style={{ width: "80px", height: "80px" }}>
          </Avatar>
        </CardContent>
        <CardContent className={styles.body}>
          <form noValidate autoComplete="off">
            <div className={styles.row}>
              <Typography className={`${styles.field} ${styles.placeholder}`}>First Name</Typography>
              <TextField className={styles.value} id="standard-basic" onChange={this.firstNameChanged.bind(this)} />
            </div>
            <div className={styles.row}>
              <Typography className={`${styles.field} ${styles.placeholder}`}>Last Name</Typography>
              <TextField className={styles.value} id="standard-basic" onChange={this.lastNameChanged.bind(this)} />
            </div>
            <div className={styles.row}>
              <Typography className={`${styles.field} ${styles.placeholder}`}>email</Typography>
              <TextField className={styles.value} id="standard-basic" onChange={this.emailChanged.bind(this)} />
            </div>
            <div className={styles.row}>
              <Typography className={`${styles.field} ${styles.placeholder}`}>mobile</Typography>
              <TextField className={styles.value} id="standard-basic" onChange={this.phoneNumberChanged.bind(this)} />
            </div>
          </form>
        </CardContent>
        <CardActions className={styles.actions}>
          {createMessage ? (<Typography className={styles.placeholder}>
            {createMessage}
          </Typography>) : null}
          <IconButton onClick={this.didTapSave.bind(this)} disabled={contactToCreate ? true : false}>
            <SaveIcon />
          </IconButton>
        </CardActions>
      </Card>
    )

    const backButton = (
      <div className={styles.backBtn}>
        <IconButton component={Link} to={{
          pathname: '/',
        }}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </div>
    )

    return (
      <div className={styles.root}>
        {backButton}
        {errorView}
        {cardView}
      </div>
    )
  }
}