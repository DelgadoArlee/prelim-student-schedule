import React, { useState,  useReducer, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { 
    Stack, 
    FormControl, 
    FormLabel,
    Select,
    MenuItem,
    Typography,
} from "@mui/material"




export default function TimeSelect( props: {label?:string, onChange?:any } ){
    const [hour, setHour] = useState(12);
    const [minute, setMinutes] = useState(0);

    const hours = () => {
        const options: JSX.Element[] = [];

        for (let i = 1; i < 13; i++){
            options.push( <MenuItem value={i}>{i}</MenuItem>)
        }

        return options
    }

    const minutes = () => {
        const options: JSX.Element[] = [];

        for (let i = 0; i < 60; i++){
            options.push( <MenuItem value={i}>{(i<10)? `0${i}`: i}</MenuItem>)
        }

        return options
    }


    return(
        <FormControl sx={{mt:2, minWidth: 90}}>
        <FormLabel>{props.label}</FormLabel>
        <Stack sx={{gap: 2, mt:2, minWidth: 90}}direction="row" >
            <Select
            sx={{width: 60,textAlign: "center"}}
            labelId="hour-select-label"
            id="hour-select"
            size="small"
            variant="standard"
            onChange={e => setHour(Number(e.target.value))}
            >
                {hours()}
            </Select>
            <Typography component="div" sx={{fontWeight: "bolder"}} >
            :
            </Typography>
            <Select
            sx={{ width: 90, textAlign:"center"}}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            size="small"
            variant="standard"
            onChange={e => setMinutes(Number(e.target.value))}
            >
                {minutes()}
            </Select>
            <Select
            sx={{width:50}}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            size="small"
            variant="standard"
            label="HH"
            onChange={e => {
                let result: string;

                switch (e.target.value) {
                    case "AM":
                        console.log(`${hour}:${minute}`);
                        break;
                    case "PM":
                        console.log(`${12 + hour}:${minute}`);
                        break;
                    
                }

               
            }}
            >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
            </Select>

            </Stack>

        </FormControl>
    )
}