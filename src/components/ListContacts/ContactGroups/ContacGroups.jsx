import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './ContactGroups.module.css';
import ContactCards from '../ContactCards/ContactCards';

export default ({ data }) => {

  const tableView = data.map(contactGroup => {
    return (
      <div className={styles.root} key={contactGroup.title}>
        <Typography>{contactGroup.title}</Typography>
        <ContactCards data={contactGroup.contacts} />
      </div>
    )
  })

  const loadingView = (
    <Typography>Loading...</Typography>
  )

  return data.length ? tableView : loadingView;
}