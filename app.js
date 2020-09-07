const express = require('express');
const appServer = express();

let users = [];

appServer.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000');
});

appServer.get('/', 
        (req, res)=> {
            res.send('HELLO WORLD WITH EXPRESS!!!');
        }
);

appServer.get('/mybasicinfo',
        (req,res)=> {
            res.send ('THIS MY BASIC INFORMATION - My name is Jhon Ballen!!!');
        }
);

appServer.get('/myexperience',
        (req,res)=>{
            res.send('THIS IS MY EXPERIENCE');
        }
);

appServer.get('/getrequest',
        (req,res)=> {
            res.send('THIS IS A GET REQUEST');
        }
);

appServer.post('/postrequest',
        (req,res) => {
            res.send('THIS A POST REQUEST');
        }
);

appServer.delete('/deleterequest',
        (req,res) => {
            res.send('THIS A DELETE REQUEST');
        }
);

appServer.put('/putrequest',
        (req,res) => {
            res.send('THIS IS A PUT REQUEST');
        }
);

appServer.use(express.json());
const myUser = require ('./user');

appServer.get ('/user',
        (req,res) => {
            res.json(myUser);
        }
);


//añade un usuario
appServer.post ('/adduser',
        (req, res) =>{
        
            const newUser =req.body;
            let añadir = users.push(newUser);
            res.send('POST USER ADDED');
        }
);


//actualiza el id del usuario que coincida con el nombre
appServer.post('/updateuser/:nombre/:idUser',
        (req,res) => {
           var nombre = req.params.nombre;
           users.forEach(function(elemento,indice,users){
            if(nombre == users[indice]["nombre"]) {
                users[indice]["idUser"] = req.params.idUser;  
            }
        })
            res.send('USER UPDATED');
        }
);

//borra el usuario que coincida con el id ingresada por parametro
appServer.delete('/deleteUser/:idUser',
        (req,res)=>{
            var idUser = req.params.idUser;
            users.forEach(function(elemento,indice,users){
                if(parseInt(idUser,10) == users[indice]["idUser"]) {
                    users.splice(indice,1); 
                    console.log("elemento eliminado");
                }
        })
        res.send('Usuario eliminado');
    }
);    

//muestra todos los usuarios
appServer.get ('/getUsers',
        (req,res) =>{
        
            res.json(users);
           users.forEach(function(elemento, indice,users) {
                console.log(elemento, indice);
            })
        }
);

//muestra el usuario que coincida con el id ingresada
appServer.get ('/getuserid/:idUser',
        (req,res) => {

            var idUser = req.params.idUser;
            users.forEach(function(elemento,indice,users){
                if(parseInt(idUser,10) == users[indice]["idUser"]) {
                    console.log("El usuario con el id " + (indice+1) +" es:");
                    res.json(users[indice]);
                }
        })
});

//muestra los usuarios menores que el dato edad ingresado por parametro 
appServer.get('/getusersmenor/:edad',
        (req,res) => {
           let usersEdad = [];
            var edad = req.params.edad;
            users.forEach(function(elemento,indice,users){
                if(parseInt(edad,10) > users[indice]["edad"]) {
                    let añadir = usersEdad.push(users[indice])
                    console.log(elemento,indice);
                }
        })
        res.json(usersEdad);
    });