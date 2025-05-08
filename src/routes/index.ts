import { isUtf8 } from "buffer";
import { error } from "console";
import express, {Request, response, Response} from "express";
import { readFile, writeFile } from "fs/promises";
import { creatContact, deleteContact, getContacts } from "../services/contact";

const dataSource = "./data/list.txt";

const router = express.Router();

router.post('/contato', async (req: Request, res: Response) => {
    const { name } = req.body as { name: string };

    if(!name || name.length < 2){
        res.json( {error: "Nome precisa ter pelo menos 2 caracteres."} );
        return;
    }

    await creatContact(name)

    res.status(201).json({contato:name});
});

router.get('/contatos', async(req: Request, res: Response) =>{

    let list = await getContacts();
    
    res.json( {contatos: list} );
})

router.delete('/contato', async(req:Request, res:Response) => {
    const { name } = req.query;

    if(!name){
        res.json({error: "Precisa escrever um nome para excluir"});
    }

    await deleteContact(name as string);

    res.json( {contato: name} );
})

export default router;