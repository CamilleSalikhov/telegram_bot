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

     
        } 

        


    //     let loginresult = this.jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //       console.log(user)
    //         if (err) { 
    //             return false
    //             console.log('error!!')
      
    //   } else return true
    //   });
 
       


    
    
     
        



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

  module.exports.User = User;
  module.exports.Admin = Admin;
  module.exports.IgnUser = IgnUser;