import {Request, Response} from 'express'
import { IntegerDataTypeConstructor } from 'sequelize/types';
import { idText } from 'typescript';
import {Link} from '../models/link';
import  linksRespository from '../models/linksRepository';



function generateCode(){
    let text='';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyz0123456789';
    for(let i=0; i<5;i++)
        text+= possible.charAt(Math.floor(Math.random()* possible.length));
    
    
    return text

}

 async function postLink(req:Request, res:Response){
        const link = req.body as Link;

        link.code=generateCode();
        link.hits=0;
        const result = await linksRespository.add(link);
        if(!result.id) return res.sendStatus(400);
        link.id = result.id!;


        res.status(201).json(link)
}

 async function getLink(req:Request, res:Response){
    const code = req.params.code as string;

    const link = await linksRespository.findByCode(code);
    if(!link)
    res.sendStatus(404);
    else{
        res.json(link)
    }

   


}

 async function hitLink(req:Request, res:Response){
    const code =req.params.code as string;
    const link = await linksRespository.hit(code);
    if(!link){
        res.sendStatus(404);

    }else{
        res.json(link);
    }

}

export default{
    postLink,
    getLink,
    hitLink
}