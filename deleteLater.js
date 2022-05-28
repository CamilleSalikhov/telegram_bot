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

    
     
      
    // // }

    // for (let i = 0; i <= orders.length; i++) {
    //     let currentOrder = `${orders[i].name}`+ ' заказал' + `${orders[i].order}` + ` ${orders[i].date} `;
    //     ordersString = ordersString + currentOrder;
    //   }

    switch (substring[0]) {
      case '/login': {
          console.log(`${substring[0]} субстирнг`)
          await  bot.sendMessage(chatId, 'Для входа отправьте свой токен в формате \n /token_<вашТокен>, где <вашТокен> это токен, который вы получили при регистрации и записали.');
          break;
      }
  
      default : {
          
        await  bot.sendMessage(chatId, "Здравствуйте, гость, используйте команду /login для входа , команду /signup для регистрации. Для входа в систему от имени администратора использвуйте команду \n /loginadmin_<token>, где <token> - это токен администратора" );
        


        break
    }
  }

  //abstract factory
//нужно выдать правильный объект из правильного класса
   