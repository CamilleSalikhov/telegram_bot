const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const TelegramApi = require('node-telegram-bot-api');
const { MessageHandler, HandlerFactory} = require('./classes');
require('dotenv').config();
const {connectDB} = require('./database');
const express = require('express');
const { Options } = require('selenium-webdriver/chrome');




//для heroku
const app = express();
app.get('/', (req, res) => {
res.send('<p>Бот начал работу</p>')

});
const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0", console.log('running'));

//mongo db соединение
connectDB();







//инициализация node-telegram-bot-api
const token = '5246682851:AAFkeEKZB83VqHEfk0FTGuQjtsHrD75BI6c';
global.bot = new TelegramApi(token, {polling:true});
//токен админа приложения
global.adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE2NTM0NDI4MzR9.5OOOo14OELe1tQxx1K9K0V9aHj288ofb1rN2d9kLuDA';

//вспомогательный объект для условия IgnUser
let ignoredChat = {
  prevMessage: '  ',
  id: '  ',
  date: 'first'
}

global.allUsers = [
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
  //локальные переменные
  global.text = msg.text;
  global.substringg = text.split('_')
  global.chatId = msg.chat.id;

  console.log(`${new Date()} новая дата` )


  //времени с последнего сообщения
  if(ignoredChat.date == 'first') {
    console.log('Первое сообщение!');
    ignoredChat.date = new Date();

  } else {
    let sicnceLastMessage = new Date() - ignoredChat.date; // in ms
    sicnceLastMessage /= 1000;
    
    let seconds = Math.round(sicnceLastMessage);
    console.log(`С отправки последнего сообщения прошло ${seconds} секунд`)
  }




  
  //проверка игнюзер
  if (ignoredChat.prevMessage == '?' && text == '?' || ignoredChat.id ==chatId  ) {
    console.log('начинаем игнор!');
    ignoredChat.id = chatId;
    console.log(ignoredChat);
    await bot.sendMessage(chatId, 'Ваш статус = IgnUser! Обратитесь к администратору! (для продолжения работы с ботом перезагрузите приложение или зайдите с другой учетной записи telegram)')
    return
    
  } else {
    ignoredChat.prevMessage = text;
    console.log('не игнорируем!');
    console.log(ignoredChat)
  }


    //if (substring[0] == '/login')

    //основная часть

    let messageHandler = new MessageHandler();
    let handlerObject = new HandlerFactory(substringg[0]).handlerProducer();
    console.log(` получили объект` );
    messageHandler.setHandler(handlerObject);
    console.log(messageHandler.handler)
    messageHandler.handleMessage();
    
                        
     
})



