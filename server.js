const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const TelegramApi = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const {User, Admin, IgnUser} = require('./classes');
require('dotenv').config();
const jwt = require('jsonwebtoken');


//инициализация node-telegram-bot-api
const token = '5246682851:AAFkeEKZB83VqHEfk0FTGuQjtsHrD75BI6c';
const bot = new TelegramApi(token, {polling:true});


let allUsers = [
  {
  name: 'admin',
  password: 'admin',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE2NTM0NDI4MzR9.5OOOo14OELe1tQxx1K9K0V9aHj288ofb1rN2d9kLuDA'
}
];

bot.setMyCommands([
    {command: '/login', description: 'Войти'},
    {command: '/signup', description: 'Зарегистрироваться '} 
 
]);
 
 
 
bot.on(('message'), async msg => {
   
     
     
    const text = msg.text;
    const substring = text.split('_')[0]
     

    const chatId = msg.chat.id;
    if (text === '/login') {
      await  bot.sendMessage(chatId, 'Для входа отправьте свой токен в формате /token_вашТокен');
    
    } else if (text === '/signup') {
        await  bot.sendMessage( chatId, "Гость, придумайте и введите свой логин и пароль в формате /newaccount_name_password");
           
      } else if ( substring  === '/newaccount') {
           let newUser = new User(text, jwt);
           for (let i = 0 ; i<= allUsers.length ;i++) {
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
        await  bot.sendMessage( chatId, "Здравствуйте, гость, используйте команду /login для входа , команду /signup для регистрации")
      } 
      else if (substring === '/token') { 
        let token = text.substring(7);
        console.log(token);
        let accountExist = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) { return false;} else { return true }
          req.user = user;
           
      });

      if (accountExist == false) {
       bot.sendMessage(chatId, 'Такого аккаунта не существует!')
      } else { 
        return bot.sendMessage(chatId, 'Добро пожаловать!');
      }
         
          
        } else {
        await  bot.sendMessage(chatId, "Здравствуйте, гость, используйте команду /login для входа , команду /signup для регистрации" );
      }    
         
    
     
    
     
     
     
})
