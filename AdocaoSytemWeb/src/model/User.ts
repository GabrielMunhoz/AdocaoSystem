import { endereco } from './endereco';

export class User{
    public _id: string;
    public nome: String;
    public sobrenome: String;
    public cpf: String;
    public email: String;
    public fone: String;
    public senha: String;
    public endereco: endereco;
    public confirmarSenha: String;
    public usuario: String;
}