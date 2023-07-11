import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';  // 存储库
import { InjectRepository } from '@nestjs/typeorm'; // 注入仓库，装饰器
import { User_info } from './entities/login.entity'; // 数据库实体
import { log_info } from './entities/log.entity';
import { pass_history } from './entities/pass_history.entity';
import { Md5 } from 'ts-md5/dist/md5'; // md5加密
import * as fs from 'fs-extra';//文件读写

@Injectable()
export class LoginService {
    constructor(@InjectRepository(User_info) private readonly user: Repository<User_info>,
        @InjectRepository(log_info) private readonly log: Repository<log_info>,
        @InjectRepository(pass_history) private readonly history: Repository<pass_history>) { }// 构造函数
    random: number = 0;
    static lteration: number = fs.readFileSync('C:\\Users\\te9uila\\Desktop\\study\\信息安全工程与管理\\课程设计正式版\\once-order\\src\\literation.txt', "utf8");
    static check_random: string = "qwer";
    public getNowDate(): string {
        const date = new Date();
        let month: string | number = date.getMonth() + 1;
        let strDate: string | number = date.getDate();
        let strSeconds: string | number = date.getSeconds();
        let strMinutes: string | number = date.getMinutes();
        if (month <= 9) {
            month = "0" + month;
        }
        if (strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (strSeconds < 10) {
            strSeconds = "0" + strSeconds;
        }
        if (strMinutes < 10) {
            strMinutes = "0" + strMinutes;
        }
        return date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + strMinutes + ":" + strSeconds;
    }
    public GetRandomNum(Min: number, Max: number): number {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    async Insertlog(username: string, operate: string) {
        let get_id;
        const sql = `select id from user_info where username ='${username}';`
        let tmp2 = this.user.query(sql);
        await tmp2.then((res) => {
            get_id = res[0].id;
        })
        const tmp = new log_info();
        tmp.date = this.getNowDate();
        tmp.userid = get_id;
        tmp.username = username;
        tmp.operate = operate;
        let res = this.log.save(tmp);
    }
    async register_1(username: string) {
        const sql = `SELECT 1 FROM user_info WHERE username = '${username}' LIMIT 1;`
        let tmp1 = this.user.query(sql)
        await tmp1.then((res) => {
            if (res[0]) {
                LoginService.lteration = -1;
            }
        })
        this.random = this.GetRandomNum(1000, 5000)
        let result = {
            lteration: LoginService.lteration,
            random: this.random,
            check_random: LoginService.check_random,
        }
        return result;
    }
    async register_2(username: string, pass: string, email: string, check_pass: string) {
        const tmp = new User_info();
        tmp.username = username;
        tmp.password = pass;
        tmp.e_mail = email;
        tmp.lteration = LoginService.lteration;
        tmp.frezz = false;
        tmp.admin = false;
        tmp.random = this.random;
        tmp.lastdate = this.getNowDate();
        let res = this.user.save(tmp);
        const tmp1 = new pass_history();
        tmp1.username = username;
        tmp1.password = check_pass;
        tmp1.date = this.getNowDate();
        let res1 = this.history.save(tmp1);
    }
    async login_1(username: string) {
        let tmp = 0;
        let frozen = 0;
        let random;
        const sql = `select frezz,random from user_info where username ='${username}';`
        let tmp2 = this.user.query(sql);
        await tmp2.then((res) => {
            if (!res[0]) {
                tmp = 0;
            }
            else {
                frozen = res[0].frezz;
                random = res[0].random;
            }
        })
        const sql_search = `select lteration from user_info where username ='${username}';`
        let tmp1 = this.user.query(sql_search);
        await tmp1.then((res) => {
            res = JSON.parse(JSON.stringify(res));
            // 没找到对应数据
            if (!res[0]) {
                tmp = 0;
            }
            // 被冻结
            else if (frozen) {
                tmp = -2;
            }
            // 剩余次数小于三
            else {
                tmp = res[0].lteration - 1;
                if (tmp <= 3) {
                    tmp = -1;
                }
            }
        })
        let result = {
            lteration: tmp,
            random: random
        }
        return result;
    }
    async login_2(username: string, pass: string) {
        let tmp = 0;
        let password = Md5.hashStr(pass);
        const sql_search = `select password from user_info where username ='${username}';`
        let tmp1 = this.user.query(sql_search);
        await tmp1.then((res) => {
            res = JSON.parse(JSON.stringify(res));
            const tmp2 = res[0].password;
            if (tmp2 === password) {
                tmp = 1;
                let sql = `update user_info set lteration = lteration-1 where username ='${username}';`
                let tmp3 = this.user.query(sql);
                sql = `update user_info set password = '${pass}' where username ='${username}';`
                tmp3 = this.user.query(sql);
                let date = this.getNowDate();
                sql = `update user_info set lastdate = '${date}' where username ='${username}';`
                tmp3 = this.user.query(sql);
            }
        })
        return tmp;
    }
    async login_3(username: string) {
        let admin = 0;
        const sql_admin = `select admin from user_info where username='${username}';`
        let tmp_admin = this.user.query(sql_admin);
        await tmp_admin.then((res) => {
            admin = res[0].admin;
        })
        return admin;
    }
    async reset_1(username: string) {
        this.random = this.GetRandomNum(1000, 5000)
        let lteration = LoginService.lteration;
        const sql = `SELECT 1 FROM user_info WHERE username = '${username}' LIMIT 1;`
        let tmp1 = this.user.query(sql)
        await tmp1.then((res) => {
            if (!res[0]) {
                lteration = -1;
            }
        })
        let result = {
            lteration: lteration,
            random: this.random,
            check_random: LoginService.check_random,
        }
        return result;
    }
    async reset_2(username: string, pass: string, check_pass: string) {
        let lteration = LoginService.lteration;
        let sql = `update user_info set password = '${pass}' where username ='${username}';`
        let tmp1 = this.user.query(sql);
        sql = `update user_info set random = '${this.random}' where username ='${username}';`
        tmp1 = this.user.query(sql);
        sql = `update user_info set lteration = '${lteration}' where username ='${username}';`
        tmp1 = this.user.query(sql);
        const tmp2 = new pass_history();
        tmp2.username = username;
        tmp2.password = check_pass;
        tmp2.date = this.getNowDate();
        let res1 = this.history.save(tmp2);
    }
    async check_pass(username: string, pass: string) {
        let sql = `select * from pass_history where password = '${pass}' and id in (select tmp.id from (select id from pass_history where username = '${username}' order by date desc limit 5)as tmp);`
        let tmp = this.history.query(sql);
        let result = 1;
        await tmp.then((res) => {
            if (res[0]) {
                result = -1;
            }
        })
        return result;
    }
    async get_user() {
        const sql = `select username, e_mail, lteration, if(frezz,'true','false') as frezz ,if(admin,'true','false') as admin from user_info order by username;`
        let tmp1 = this.user.query(sql);
        let result: any
        await tmp1.then((res) => {
            result = res;
        })
        console.log(result);

        return result;
    }
    async change(username: string) {
        const sql = `update user_info set frezz = if(frezz,0,1) where username ='${username}';`
        let tmp2 = this.user.query(sql);
    }
    async change_admin(username: string) {
        const sql = `update user_info set admin = if(admin,0,1) where username ='${username}';`
        let tmp2 = this.user.query(sql);
    }
    async delete(username: string) {
        const sql = `delete from user_info where username ='${username}';`
        let tmp2 = this.user.query(sql);
    }
    async frezz(username: string) {
        const sql = `update user_info set frezz = 1 where username ='${username}';`
        let tmp2 = this.user.query(sql);
    }
    async get_log() {
        const sql = `select id, date, username, operate from log_info order by date;`
        let tmp1 = this.user.query(sql);
        let result: any
        await tmp1.then((res) => {
            result = res;
        })
        return result;
    }
    async deleteLog(id: string) {
        const sql = `delete from log_info where id ='${id}';`
        let tmp2 = this.user.query(sql);
    }
}

