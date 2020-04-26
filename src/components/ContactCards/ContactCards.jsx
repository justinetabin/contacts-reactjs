import React from 'react';
import styles from './ContactCards.module.css';
import { Card, Avatar, CardHeader, CardActionArea } from '@material-ui/core';

export default ({ data }) => {
  const cardViews = data.map(contact => (
    <Card key={contact._id} className={styles.root} variant='outlined'>
      <CardActionArea>
        <CardHeader avatar={
          <Avatar>
            {contact.firstName[0].toUpperCase()}
          </Avatar>
        }
          title={`${contact.firstName} ${contact.lastName}`} />
      </CardActionArea>
    </Card>
  ));
  return cardViews;
}

