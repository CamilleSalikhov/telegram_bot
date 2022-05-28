const { logging } = require("selenium-webdriver");
const jwt = require('jsonwebtoken');
var crypto = require("crypto");
const {connectDB, Order} = require('./database');



class User {
    constructor(text, jwt) { 
        this.name = text.split('_')[1];
        this.password = text.split('_')[2]; 
        this.jwt = jwt;
        this.text =text;
    }
    signUp() {
        let payload = {
            name:this.name,
            password:this.password
        }
        const accessToken = this.jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        payload.token = accessToken;
        return payload
    }

    
        } 


   



   

//--------------------------------------------------------------------------------------------------------
   

  // стратегия паттерн

  class MessageHandler {
    constructor() { 
        this.handler = {} 
    }

    setHandler(handlerObject) {
        this.handler = handlerObject;


    }
    handleMessage() {
        console.log(this.handler)
        console.log('  получилось')
          return this.handler.handleMessage()
          
        
    }


  }

  //--------------------------------------------------------------------------------------------------------
   

  // абстрактная фабрика

  class HandlerFactory {
    constructor(command) { 
        this.handlerType = command; 
    }
    handlerProducer() {

        let handlerObject = {};
      switch (this.handlerType) {
        case '/login': { 
            handlerObject = new LoginHandler();
        break
        }
    
        case '/signup': {
            handlerObject = new SignUpHandler();
        break;
         }
    
        case  '/newaccount': {
            handlerObject = new NewAccountHandler();
            console.log('сломались?')
        break;
         }
    
        case '/start': {
            console.log('привет из фабрики')
            handlerObject = new StartHandler();
             
        break;
        }
    
        case '/token': {
            handlerObject = new TokenHandler();
            break;
        }
    
    
        case '/neworder': {
            handlerObject = new NewOrderHandler();
        break;
         }
    
        case '/getorders': {
            handlerObject = new GetOrdersHandler();
        break;
         }
    
        case '/deleteorder': {
            handlerObject = new DeleteOrderHandler();
        break;
         }
    
    
        case '/loginadmin': { 
            handlerObject = new LoginAdminHandler();

        break;
        }
    
        default : {
            console.log('в дефолте')
            handlerObject = new DefaultHandler();
             
        break;
        }
    }
    console.log(`${handlerObject} после свитча`)
    return handlerObject
     
     
    }


  }

//-----------------------------------------------------------------------------------
//классы хендлеров
  class StartHandler {
    constructor() {

    }
    
   async handleMessage() {
        
   await bot.sendMessage( chatId, "Здравствуйте, гость, используйте команду /login для входа , команду /signup для регистрации. Для входа в систему от имени администратора использвуйте команду \n  /loginadmin_<token>, где <token> - это токен администратора")
          
        return   
    }

  }


  class DeleteOrderHandler {
    constructor() {

    }
    
   async handleMessage() {
    // /deleteorder_id_token
     const token = text.substring(30);
     const deleteId = substringg[1];
     console.log(`${token} - это токен`)
     console.log(deleteId)

     if (token == adminToken) {
        

       try {
          await Order.deleteOne({
          id: deleteId 
         })
     
         await bot.sendMessage(chatId, 'Удалено!')
       } catch(err) {
         console.log(err)
         await bot.sendMessage(chatId, 'Ошибка! Возможно, ошибка формата запроса!')
     
       }






     } else {
       await bot.sendMessage(chatId, 'Ошибка доступа, удаление доступно только администратору!')
     }






return   
    }

  }

         

  class DefaultHandler {
    constructor() {

    }
    
    async handleMessage() {
        console.log('доходим почти до конца!')
    await bot.sendMessage(chatId, "Здравствуйте, гость, используйте команду /login для входа , команду /signup для регистрации. Для входа в систему от имени администратора использвуйте команду \n /loginadmin_<token>, где <token> - это токен администратора" );
            
        return  
    }

  }



  class NewOrderHandler {
    constructor() {

    }
    
    async handleMessage() {
        ///neworder_N_<token>
        let payload = {};
        console.log(substringg);
        let orderOption = substringg[1];
        let token = text.substring(12);
        console.log(token);
        
        let userExists = false;
        for (let i = 0 ; i<= allUsers.length -1 ;i++) {
          if (allUsers[i] && allUsers[i].token === token) {
            //Делаем заказ, обращаемся к базе данных
            payload = allUsers[i];
            console.log('нашли токен!');
            userExists = true;
            payload.order = orderOption;
            
         }    
       }  console.log(payload)
       if(userExists) {
        let today = new Date().toISOString().slice(0, 10);
         
        payload.date = today;
        payload.id = crypto.randomBytes(8).toString('hex');
        console.log(payload);
        const createdOrder = new Order(payload);
        createdOrder.save()
        



        await bot.sendMessage(chatId, 'Запись создана!' );




       } else {
         await bot.sendMessage(chatId, 'Ошибка! Неправильный формат запроса, или такого токена не существует!' );
        }







        
    }

  }



  class TokenHandler {
    constructor() {

    }
    
    async handleMessage() {
        let token = text.substring(7);
        console.log(token);
        let accountExist = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
           
          console.log(user)
          if (err) { return false;} else { return true }

           
      });

        if (accountExist == false) {
        await bot.sendMessage(chatId, 'Такого аккаунта не существует!')
        } else { 
        await bot.sendMessage(chatId, 'Добро пожаловать!');
        let loggedUser = '';
        allUsers.forEach( element => {
            if (element.token === token) loggedUser = element;
                });
            
        await bot.sendMessage(chatId, ' Напоминаем, что наш цветочный магазин предоставляет три варианта заказа: 1 - букет роз, 2 - букет лилий, 3 - букет тюльпанов. Вы можете Создать новый заказ с помощью команды /neworder_N_<token> , где N - Это число от 1 до 3, обозначающее вариант заказа. Запросить список ваших заказов можно с помощью /getorders_<token>.');
                }
        return  
    }

  }



  class LoginHandler {
    constructor() {

    }
    
    async handleMessage() {
          await bot.sendMessage(chatId, 'Для входа отправьте свой токен в формате \n /token_<вашТокен>, где <вашТокен> это токен, который вы получили при регистрации и записали.');
              
        return  
    }

  }



  class GetOrdersHandler {
    constructor() {

    }
    
    async handleMessage() {
        ///getorders_<token>

        let token = text.substring(11);
        let adminStatus = false;
        let userExists = false;
        let payload = {};
        let ordersString = '';
      
          for (let i = 0 ; i<= allUsers.length -1 ;i++) {
            if (allUsers[i] && allUsers[i].token === token) {
              
              payload = allUsers[i];
              console.log('нашли токен!');
              userExists = true;
           }    
         }

         if (token == adminToken ) {
           adminStatus = true;
         }

         if (userExists) {
           if(adminStatus) {
             const orders = await Order.find();
             for (let i =0; i <= orders.length -1; i++) {
               console.log(orders[i]);
               let currentOrder = `Пользователь "${orders[i].name}" ` + `заказал вариант "${orders[i].order}", ` + `дата: "${orders[i].date}", id "${orders[i].id}";\n`;
        ordersString = ordersString + currentOrder;
             }

             await bot.sendMessage(chatId, ordersString)


           } else {
             const orders = await Order.find({
               token: payload.token
             })

             for (let i =0; i <= orders.length -1; i++) {
              console.log(orders[i]);
              let currentOrder = `Пользователь "${orders[i].name}" ` + `заказал вариант "${orders[i].order}", ` + `дата: "${orders[i].date}";\n  `;
              ordersString = ordersString + currentOrder;
            }

            await bot.sendMessage(chatId, ordersString)

              
           }


         } else {
           await bot.sendMessage(chatId, 'Вы не зарегестрированы! Или ошибка формата запроса!')
         }





   
        return  
    }

  }




  class SignUpHandler {
    constructor() {

    }
    
    async handleMessage() {
    await bot.sendMessage( chatId, "Гость, придумайте и введите свой логин и пароль в формате /newaccount_name_password");
         return  
    }

  }




  class LoginAdminHandler {
    constructor() {

    }
    
    async handleMessage() {
  
        if(text.substring(12) == adminToken) {
          bot.sendMessage(chatId, 'Запросить список всех заказов можно с помощью запроса \n /getorders_<token>, где <token> - это токен администратора ; Удалить заказ по id можно с помощью запроса \n /deleteorder_id_<token>, где <token> - это токен администратора')

        } else {
          await bot.sendMessage(chatId, 'Ошибка! Неверный формат запроса или токен!')
        }


    
         return  
    }

  }



  class NewAccountHandler {
    constructor() {

    }
    
    async handleMessage() {
        
        let newUser = new User(text, jwt);
        for (let i = 0 ; i<= allUsers.length -1 ;i++) {
          if (allUsers[i] && allUsers[i].name === newUser.name) {
           return await  bot.sendMessage(chatId, 'Имя существует, придумайте другое!' );
     
        }
       }
        let signedUser = newUser.signUp(jwt);
        allUsers.push(signedUser);
        console.log(allUsers)
        await  bot.sendMessage(chatId, `Успешная регистрация,${signedUser.name}! Ваш токен "${signedUser.token}", запишите его и не потеряйте! ` );
        await  bot.sendMessage( chatId, "Здравствуйте, используйте команду /login для входа , команду /signup для регистрации");
       
        


           
         return  
    }

  }
 







  
  module.exports.MessageHandler = MessageHandler;
  module.exports.HandlerFactory = HandlerFactory;
  