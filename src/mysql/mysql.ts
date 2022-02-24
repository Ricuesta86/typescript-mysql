import mysql =require('mysql');


export default class Mysql{

    private static _intance:Mysql;

    cnn: mysql.Connection;
    conectado:boolean=false;

    constructor(){

        console.log('Clase inicializada');

        this.cnn=mysql.createConnection({
            host:'localhost',
            user:'node_user',
            password:'123456',
            database:'node-db'
        });
        this.conectarDB();
    }


    public static get instance(){
        return this._intance || (this._intance=new this())
    }

    static ejecutarQuery( query: string, callback: Function){
        this.instance.cnn.query(query,(err,results:Object[],fields)=>{
            if(err){
                console.log('Error en el query');
                console.log(err);
                return callback(err);
            }
            if(results.length ===0){
                callback('El registro solicitado no existe');
            }else{
                callback(err, results);
            }
        });
    }

    private conectarDB(){
        this.cnn.connect((err:mysql.MysqlError)=>{
            if(err){
                console.log(err.message);
                return;
            }
            this.conectado=true;
            console.log('Base de Datos online!');
        });
    }

}