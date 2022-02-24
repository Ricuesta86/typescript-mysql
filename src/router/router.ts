import { Router, Request, Response } from "express";
import Mysql from "../mysql/mysql";


const router=Router();


router.get('/heroes',(req:Request,res:Response)=>{

    const query=`Select * From heroes`;

    Mysql.ejecutarQuery(query,(err:any, heroes:Object[])=>{
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            });
        }else{
            res.json({
                ok:true,
                heroes
            });
        }
    });
});

router.get('/heroes/:id',(req:Request,res:Response)=>{
    const id=req.params.id;
    const escapeId= Mysql.instance.cnn.escape(id);

    const query=`
    Select * 
    From heroes
    where id=${escapeId}`;

    Mysql.ejecutarQuery(query,(err:any, heroe:Object[])=>{
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            });
        }else{
            res.json({
                ok:true,
                heroes:heroe[0]
            });
        }
    });
});

export default router;