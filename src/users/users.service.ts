import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [{
            id: 1,
            username: 'ann',
            password: '12345678',
        }, {
            id: 2,
            username: 'john',
            password: 'qwerty',
        }];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
