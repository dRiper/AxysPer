export class Usuario{
    constructor(
        public id:number,
        public nombre:string,
        public email:string,
        public password:string,
        public idsocionegocio:string,
        public img?:string,
        public role:string = 'USER_ROLE'
    )
    {

    }
}