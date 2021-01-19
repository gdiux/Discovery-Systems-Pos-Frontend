export class User {

    constructor(
        public usuario: string,
        public name: string,
        public password?: string,
        public role?: string,
        public img?: string,
        public uid?: string,
    ){}

};