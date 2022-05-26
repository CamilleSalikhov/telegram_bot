const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const TelegramApi = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const {User, Admin, IgnUser, UserChat} = require('./classes');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {connectDB, Order} = require('./database');
const uniqid = require('uniqid');

 

connectDB();




//инициализация node-telegram-bot-api
const token = '5246682851:AAFkeEKZB83VqHEfk0FTGuQjtsHrD75BI6c';
const bot = new TelegramApi(token, {polling:true});
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE2NTM0NDI4MzR9.5OOOo14OELe1tQxx1K9K0V9aHj288ofb1rN2d9kLuDA';

let allUsers = [
  {
  name: 'admin',
  password: 'admin',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE2NTM0NDI4MzR9.5OOOo14OELe1tQxx1K9K0V9aHj288ofb1rN2d9kLuDA'
}
];

bot.setMyCommands([
    {command: '/login', description: 'Войти'},
    {command: '/signup', description: 'Зарегистрироваться '},
    {command: '/start', description: 'Старт'}
 
]);
 
 
 
bot.on(('message'), async msg => {
   
      
     
    const text = msg.text;
    const substring = text.split('_')
    //console.log(text.substring(9))

    const chatId = msg.chat.id;
    if (text === '/login') {
      await  bot.sendMessage(chatId, 'Для входа отправьте свой токен в формате \n /token_<вашТокен>, где <вашТокен> это токен, который вы получили при регистрации и записали.');
    
    } else if (text === '/signup') {
        await  bot.sendMessage( chatId, "Гость, придумайте и введите свой логин и пароль в формате /newaccount_name_password");
           
      } else if ( substring[0]  === '/newaccount') {
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
      }
       else if (text === '/start')  {
        await  bot.sendMessage( chatId, "Здравствуйте, гость, используйте команду /login для входа , команду /signup для регистрации. Для входа в систему от имени администратора использвуйте команду \n  /loginadmin_<token>, где <token> - это токен администратора")
      } 
      else if (substring[0] === '/token') { 
        let token = text.substring(7);
        console.log(token);
        let accountExist = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          console.log(user)
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
          
        } else if (substring[0] == '/neworder') {
          ///neworder_N_<token>
          let payload = {};
          console.log(substring);
          let orderOption = substring[1];
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
         } console.log(payload)
         if(userExists) {
          let today = new Date().toISOString().slice(0, 10);
          console.log(today);
          payload.date = today;
          payload.id = uniqid();
          const createdOrder = new Order(payload);
          createdOrder.save()
          



           await bot.sendMessage(chatId, 'Запись создана!' );




         } else {
           await bot.sendMessage(chatId, 'Ошибка! Неправильный формат запроса, или такого токена не существует!' );
          }







          
        } else if (substring[0] == '/getorders') {
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
                let currentOrder = `Пользователь "${orders[i].name}" ` + `заказал вариант "${orders[i].order}", ` + `дата: "${orders[i].date}";  `;
                ordersString = ordersString + currentOrder;
              }

              await bot.sendMessage(chatId, ordersString)

                
             }


           } else {
             await bot.sendMessage(chatId, 'Вы не зарегестрированы!')
           }






        } else if (substring[0] == '/deleteorder') {
         // /deleteorder_id_token
          const token = text.substring(30);
          const deleteId = substring[1];
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







        } else if(substring[0] == '/loginadmin') {

          if(text.substring(12) == adminToken) {
            bot.sendMessage(chatId, 'Запросить список всех заказов можно с помощью запроса \n /getorders_<token>, где <token> - это токен администратора ; Удалить заказ по id можно с помощью запроса \n /deleteorder_id_<token>, где <token> - это токен администратора')

          } else {
            await bot.sendMessage(chatId, 'Ошибка! Неверный формат запроса или токен!')
          }


      
      
        } else {
        await  bot.sendMessage(chatId, "Здравствуйте, гость, используйте команду /login для входа , команду /signup для регистрации. Для входа в систему от имени администратора использвуйте команду \n /loginadmin_<token>, где <token> - это токен администратора" );
        }    
         
    
     
    
     
     
     
})
