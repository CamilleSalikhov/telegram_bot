// else if (substring === '/token') {
//     const token = text.substring(7);
//     console.log(token);
//     let loggingresult = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       if (err) { 
//             return false
//             console.log('error!!')
  
//   } else return true
//   });

//   if (loggingresult == true) {
//     await bot.sendMessage(chatId, 'gotovo!')
//   } else {
//     await bot.sendMessage(chatId, 'try again!')
//   }

    
     
      
    // }

    for (let i = 0; i <= orders.length; i++) {
        let currentOrder = `${orders[i].name}`+ ' заказал' + `${orders[i].order}` + ` ${orders[i].date} `;
        ordersString = ordersString + currentOrder;
      }