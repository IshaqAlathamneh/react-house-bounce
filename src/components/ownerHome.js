import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import cookie from 'react-cookies';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const [requests, setRequests] = useState([])
  const API_SERVER = 'https://info-graph-server.herokuapp.com';
  useEffect(() => {
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/api/my-requests`, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': API_SERVER,
        Authorization: `Bearer ${token}`
      },
    }).then(async (req) => {
      let data = await req.json();
      console.log('requests', data);
      setRequests(data);
    })

  }, [])

  return (<>
  {requests.map( req => {
      return (

    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Status
        </Typography>
        <Typography variant="h5" component="h2">
          {req.reqStatus}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Description
        </Typography>
        <Typography variant="body2" component="p">
          {req.description + ' '} it's location in {req.houseLocation}
        </Typography>
      </CardContent>
      <CardActions>
      <Typography className={classes.pos} color="textSecondary">
          Price is {req.price}
        </Typography>
      </CardActions>
    </Card>
      )
  })}
    </>
  );
}