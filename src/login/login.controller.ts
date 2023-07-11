import { Controller, Post, Get, Request } from '@nestjs/common';
import { throws } from 'assert';
import { LoginService } from './login.service';
import { Md5 } from 'ts-md5/dist/md5';
import { check } from 'prettier';

@Controller('login')
export class LoginController {
    constructor(private login_t: LoginService) { }
    @Get('/insert/:id')
    register_1(@Request() req1): any {
        let id: string = req1.params.id;
        return this.login_t.register_1(id);
    }
    @Get('/insert/:id/:pass/:email/:check_pass')
    register_2(@Request() req1): any {
        let id: string = req1.params.id;
        let pass: string = req1.params.pass;
        let email: string = req1.params.email;
        let check_pass: string = req1.params.check_pass;
        return this.login_t.register_2(id, pass, email, check_pass);
    }
    @Get('/login/:username')
    login_1(@Request() req1): any {
        let username: string = req1.params.username;
        return this.login_t.login_1(username);
    }
    @Get('/login/:username/:pass')
    login_2(@Request() req1): any {
        let username: string = req1.params.username;
        let pass: string = req1.params.pass;
        return this.login_t.login_2(username, pass);
    }
    @Get('/check_admin/:username')
    login_3(@Request() req1): any {
        let username: string = req1.params.username;
        return this.login_t.login_3(username);
    }
    @Get('/reset/:id')
    reset_1(@Request() req1): any {
        let id: string = req1.params.id;
        return this.login_t.reset_1(id);
    }
    @Get('/insert/:id/:pass/:check_pass')
    reset_2(@Request() req1): any {
        let id: string = req1.params.id;
        let pass: string = req1.params.pass;
        let check_pass: string = req1.params.check_pass;
        return this.login_t.reset_2(id, pass, check_pass);
    }
    @Get('/check_pass/:id/:pass')
    check_pass(@Request() req1): any {
        let id: string = req1.params.id;
        let pass: string = req1.params.pass;
        return this.login_t.check_pass(id, pass);
    }
    @Get('/get_user')
    get_user(): any {
        return this.login_t.get_user();
    }
    @Get('/change/:username')
    change(@Request() req1): any {
        let username: string = req1.params.username;
        return this.login_t.change(username);
    }
    @Get('/changeadmin/:username')
    change_admin(@Request() req1): any {
        let username: string = req1.params.username;
        return this.login_t.change_admin(username);
    }
    @Get('/delete/:username')
    delete(@Request() req1): any {
        let username: string = req1.params.username;
        return this.login_t.delete(username);
    }
    @Get('/frezz/:username')
    frezz(@Request() req1): any {
        let username: string = req1.params.username;
        return this.login_t.frezz(username);
    }
    @Get('/log/:username/:operate')
    Insertlog(@Request() req1): any {
        let username: string = req1.params.username;
        let operate: string = req1.params.operate;
        return this.login_t.Insertlog(username, operate)
    }
    @Get('/get_log')
    get_log(): any {
        return this.login_t.get_log();
    }
    @Get('/deleteLog/:id')
    deleteLog(@Request() req1): any {
        let id: string = req1.params.id;
        return this.login_t.deleteLog(id);
    }
}
