import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import styles from './Cards.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return 'Loading...'
  }
  const active = confirmed.value - recovered.value - deaths.value
  const cardDetails = [
    {
      styles: styles.infected,
      Text: 'Infected',
      value: confirmed.value,
      Body: 'Number of confimred cases of COVID-19',
    },
    {
      styles: styles.recovered,
      Text: 'Recovered',
      value: recovered.value,
      Body: 'Number of Recovered cases of COVID-19',
    },
    {
      styles: styles.deaths,
      Text: 'Deaths',
      value: deaths.value,
      Body: 'Number of reported deaths of COVID-19',
    },
    {
      styles: styles.active,
      Text: 'Active',
      value: active,
      Body: 'Number of Active cases of COVID-19',
    },
  ]
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {cardDetails.map((details, index) => (
          <Grid
            item
            component={Card}
            xs={12}
            md={2}
            key={index}
            className={cx(styles.card, details.styles)}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {details.Text}
              </Typography>
              <Typography variant="h5">
                <CountUp
                  start={0}
                  end={details.value}
                  duration={1}
                  separator=","
                />
              </Typography>
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant="body2">{details.Body}</Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Cards
