import React from 'react';
import styles from './ContactCards.module.css';
import { Card, Avatar, CardHeader, CardActionArea } from '@material-ui/core';

export default ({ contacts, didSelectContact }) => {

  const cardViews = contacts.map(contact => {
    return (
      <Card key={contact._id} className={styles.root}>
        <CardActionArea onClick={() => didSelectContact(contact)}>
          <CardHeader
            avatar={
              <Avatar>
                {contact.firstName[0].toUpperCase()}
              </Avatar>
            }
            title={`${contact.firstName} ${contact.lastName}`} />
        </CardActionArea>
      </Card>
    )
  });

  return cardViews;
}

