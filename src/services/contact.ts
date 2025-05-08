import { isUtf8 } from "buffer";
import { error } from "console";
import express, {Request, response, Response} from "express";
import { readFile, writeFile } from "fs/promises";

const dataSource = "./data/list.txt";

export const getContacts = async () => {
    let list: string[] = [];
    try {
        const data = await readFile(dataSource, {encoding: "utf-8"});
        list = data.split('\n');
    } catch {error}

    return list;
}

export const creatContact = async (name: string) => {
    
    let list = await getContacts();
    list.push(name);
    await writeFile(dataSource, list.join('\n'));
}

export const deleteContact = async (name: string) => {
    let list = await getContacts();
    list = list.filter(item => item.toLocaleLowerCase() !== (name as string).toLocaleLowerCase());
    await writeFile(dataSource, list.join('\n'));
}