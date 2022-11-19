import { Controller, Post, Body, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("event")
export class EventController {
    constructor(){}

    @Post()
    async event(@Body() body: any, @Res() res: Response) {
        console.log(body);

        return res.status(200).json({
            success: true,
            data: body
        })
    }
}