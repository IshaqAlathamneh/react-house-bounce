import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import cookie from 'react-cookies';
const API_SERVER = 'https://info-graph-server.herokuapp.com';
let myArr = [0,0,0];

class ChartsPage extends React.Component {
  state = {
    dataBar: {
      labels: ["Approved", "Pending", "Rejected"],
      datasets: [
        {
          label: "Percentage compared to all requests",
          data: this.myData(),
          backgroundColor: [
            "rgba(98,  182, 239,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(98,  182, 239,0.4)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(98,  182, 239, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(98,  182, 239, 1)"
          ]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    },
  }
   myData() {
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/api/all-requests`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-origin': API_SERVER,
            Authorization: `Bearer ${token}`
        },
    }).then(async (req) => {
        let data = await req.json();
        const percOne =  data.approved.length/data.allRequests.length;
        const percTwo =  data.pending.length/data.allRequests.length;
        const percThree =data.rejected.length/data.allRequests.length;
        console.log(percOne, percTwo, percThree);
        myArr = [percOne, percTwo, percThree];
    })
    return myArr
  }


  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Bar chart</h3>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} className="myChart"/>
      </MDBContainer>
    );
  }
}

export default ChartsPage;