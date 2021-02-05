import { environment } from "../../environments/environment"

const base_url = environment.base_url;

export class User {    

    constructor(
        public usuario: string,
        public name: string,
        public password?: string,
        public role?: string,
        public img?: string,
        public uid?: string,
        public status?: boolean,
    ){}

    /** ================================================================
    *   GET IMAGE http://localhost:3000/api/uploads/user/
    ==================================================================== */    
    get getImage(){        
        
        if (this.img) {            
            return `${base_url}/uploads/user/${this.img}`;
        }else{
            return `${base_url}/uploads/user/no-image`;
        }
    }

};