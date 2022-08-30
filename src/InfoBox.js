import React from 'react';
import './InfoBox.css';
import{
 Card,
 CardContent,
 Typography,
} from "@mui/material";


function InfoBox({title, cases, total, ...props}) {
  return (
    <Card  className="infoBox">
       <CardContent>
         {/* title= coronavirus cases */}
         <Typography className="infoBox_title" color="textSecondary">{title}</Typography>
       
         {/* +120k number of cases */}
         <h2 className="infoBox_cases">+{cases}</h2>

         {/* 1.2M total */}
         <Typography className="infoBox_total" color="textSecondary">{total} Total</Typography>
       </CardContent>
    </Card>
  )
}

export default InfoBox
