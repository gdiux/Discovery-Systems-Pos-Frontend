import { environment } from "../../environments/environment"

// MODELS
import { Kit } from "./kits.model";
import { Department } from './department.model';

const base_url = environment.base_url;


export class Product {

    constructor(
        public code: string,
        public name: string,
        public type: string,
        public cost: number,
        public gain: number,
        public price: number,
        public wholesale: number,
        public kit?: Kit[],
        public department?: Department,
        public stock?: number,
        public min?: number,
        public max?: number,
        public bought?: number,
        public sold?: number,
        public returned?: number,
        public damaged?: number,
        public img?: string,
        public expiration?: Date,
        public status?: boolean,
        public pid?: string
    ){}

    /** ================================================================
    *   GET IMAGE
    ==================================================================== */    
    get getImage(){        
        
        if (this.img) {            
            return `${base_url}/uploads/products/${this.img}`;
        }else{
            return `${base_url}/uploads/products/no-image`;
        }
    }

};