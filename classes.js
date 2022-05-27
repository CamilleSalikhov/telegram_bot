const { logging } = require("selenium-webdriver");

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

    // accountExist() {
    //     console.log('method пошел')
    //     const token = this.text.substring(7);
    //     console.log(token);

    //     function loginResult(token, secret) {
    //         try {
         
    //      return true }
    //          catch(err) {
    //              console.log(err)
    //              return false
    //          }
    //      }       

    //      return loginResult(token, process.env.ACCESS_TOKEN_SECRET)
    //         }
        } 

    


  class Admin {
    constructor(name) { 
        this.name = name; 
    }
    sayHi() {
         alert(this.name); 
        }
  }


  class IgnUser {
    constructor(name) { 
        this.name = name; 
    }
    sayHi() {
         alert(this.name); 
        }
  }



  class UserChat {
    constructor(loggedUser, chatId) { 
        this.name = loggedUser.name;
        this.password = loggedUser.password;
        this.token = loggedUser.token; 
        
        this.chatId = chatId;
    }
    start() {
        console.log(this.bot)
          
        }
    getOrderList() {

    }

    createOrder() {

    }
  }


   

  // абстрактная фабрика

  class UserFactory {
    constructor(usertype) { 
        this.usertype = usertype; 
    }
    userProducer() {
        switch (this.usertype) {
            case "user":
                return new User();
            case "admin":
                return new Admin();
            case "ignuser":
                return new IgnUser();
            default:
                return null;
        }
    }


  }


  

 







  module.exports.User = User;
  module.exports.Admin = Admin;
  module.exports.IgnUser = IgnUser;
  module.exports.UserChat = UserChat;