import { useState } from "react"
import axios from 'axios'

// fetch all data
export const fetchitems = async ()=>{
    const res = await axios.get('http://localhost:3001/items');
    return res.data;
}

//fetch by id
export const fetchbyid = async (id:number)=>{
    const res = await axios.get(`http://localhost:3001/items/${id}`);
}