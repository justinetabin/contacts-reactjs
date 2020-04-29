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

export default class ContactCard extends React.Component {

  state = {
    contact: null,
    error: null
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

  render() {
    const { contact, error } = this.state;

    const emptyView = (
      <Typography>Contact not found.</Typography>
    )

    const loadingView = (
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

        <CardContent className={styles.contentGrid}>
          <div className={`${styles.col} ${styles.row}`}>
            <Typography className={styles.placeholder}>email</Typography>
            <Typography className={styles.placeholder}>mobile</Typography>
          </div>
          <div className={`${styles.col} ${styles.row2}`}>
            <Typography>{contact.email}</Typography>
            <Typography>{contact.phoneNumber}</Typography>
          </div>
        </CardContent>

        <CardActions className={styles.actions} >
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
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
        {contact ? cardView : (
          error ? emptyView : loadingView
        )}
      </div>
    )
  }
}