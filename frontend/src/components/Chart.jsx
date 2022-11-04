import { Box } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

// const data = [
//     {quarter: 1, earnings: 13000},
//     {quarter: 2, earnings: 16500},
//     {quarter: 3, earnings: 14250},
//     {quarter: 4, earnings: 19000}
// ];

export default function Chart() {
    const invoices = useSelector((state) => state.invoice.invoiceList);

    const groups = invoices.reduce((groups, invoice) => {
      const date = invoice.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(invoice.paid);
      return groups;
    }, {});
    
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        income: groups[date]
      };
    });

    const data = groupArrays.map((ga) => {
      const total = ga.income.reduce((sum, inv) => sum+inv, 0);
      ga.income = total;
      return ga;
    })

    return (
      <Box sx={{height: '60vh', display: 'flex'}}>
        <Box sx={{ margin: 'auto'}}>
          <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickValues={data.map((d, index) => index+1)}
              tickFormat={data.map(d => d.date)}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar
              data={data}
              x="date"
              y="income"
            />
          </VictoryChart>
        </Box>
      </Box>
    );
}