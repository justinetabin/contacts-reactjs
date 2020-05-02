import React from 'react';
import styles from './ContactCard.module.css';
import {
  Card,
  Avatar,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';

export default class ContactCard extends React.Component {

  state = {
    contact: null,
    error: null,
    redirect: null
  }
  worker = null
  contactId = null

  constructor({ location: { contact }, match: { params: { id } }, factory }) {
    super();
    this.state = {
      contact,
      error: null
    }
    this.contactId = id;
    this.worker = factory.makeContactsWorker();
  }

  async componentDidMount() {
    try {
      const contact = await this.worker.getContact(this.contactId);
      this.setState({ contact, error: null });
    } catch (error) {
      this.setState({ contact: null, error });
    }
  }

  didTapEdit(e) {
    var state = this.state
    state.redirect = (
      <Redirect to={{
        pathname: `/${this.contactId}/edit`,
        contact: state.contact
      }} />
    )
    this.setState(state);
  }

  async didTapDelete(e) {
    var state = this.state
    try {
      this.setState({ deleteMessage: 'Deleting...', contactToDelete: this.contactId });
      await this.worker.deleteContact(this.contactId);
      state.redirect = (
        <Redirect to={{
          pathname: `/`
        }} />
      )
      this.setState(state);
    } catch (error) {
      this.setState({ deleteMessage: 'Failed to delete.', contactToDelete: null });
    }
  }

  render() {
    const { contact, error, redirect, deleteMessage, contactToDelete } = this.state;

    if (redirect) return redirect;

    const emptyView = (contact && error) ? (
      <Typography>Contact not found.</Typography>
    ) : null

    const errorView = error ? (
      <Typography>Something went wrong...</Typography>
    ) : null

    const loadingView = (contact || error) ? null : (
      <Typography>Loading...</Typography>
    )

    const cardView = contact ? (
      <Card>
        <CardContent className={styles.header} >
          <Avatar className={styles.avatar}>
            {contact.firstName[0].toUpperCase()}{contact.lastName[0].toUpperCase()}
          </Avatar>
          <div className={styles.spacer} />
          <Typography className={styles.fullname}>
            {`${contact.firstName} ${contact.lastName}`}
          </Typography>
        </CardContent>

        <CardContent>
          <div className={styles.row}>
            <div className={styles.field}>
              <Typography className={styles.placeholder}>email</Typography>
            </div>
            <div className={styles.value}>
              <Typography>{contact.email}</Typography>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <Typography className={styles.placeholder}>mobile</Typography>
            </div>
            <div className={styles.value}>
              <Typography>{contact.phoneNumber}</Typography>
            </div>
          </div>
        </CardContent>

        <CardActions className={styles.actions} >
          <Typography>
            {deleteMessage}
          </Typography>
          <IconButton onClick={this.didTapEdit.bind(this)} disabled={contactToDelete ? true : false}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={this.didTapDelete.bind(this)} disabled={contactToDelete ? true : false}>
            <DeleteIcon />
          </IconButton>
        </CardActions>

      </Card>
    ) : null

    const backButton = (
      <div className={styles.backBtn}>
        <IconButton component={Link} to="/">
          <ArrowBackRoundedIcon />
        </IconButton>
      </div>
    )

    return (
      <div className={styles.root}>
        {backButton}
        {errorView}
        {loadingView}
        {emptyView}
        {cardView}
      </div>
    )
  }
}