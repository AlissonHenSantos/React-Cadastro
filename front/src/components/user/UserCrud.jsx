import React, {Component} from "react";
import Main from "../template/Main"
import Axios from "axios"



const headerProps = {
    icon: 'user',
    title: 'Usuários',
    subtitle: 'Cadastro de usuarios: Incluir, Listar, Alterar, Excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {
    state = {...initialState}

    componentWillMount() {
        Axios(baseUrl).then(res => {
            this.setState({list: res.data})
        })
    }

    clear(){
        this.setState({user: initialState.user})
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        Axios[method](url, user)
            .then(res => {
                const list = this.getUpdatedLits(res.data)
                this.setState({user: initialState.user, list})
            })
          
    }

    getUpdatedLits(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }

    updateField (event) {
        const user = { ...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }
    renderForm(){
        return(
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" 
                    value={this.state.user.name} onChange={e => this.updateField(e)} placeholder="Digite o nome"/>

                    </div>
                    
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email"
                     value={this.state.user.email} onChange={e => this.updateField(e)} placeholder="Digite o email"/>

                    </div>
                    
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button onClick={ e=> this.save(e)} className="btn btn-primary m-2">
                            Salvar
                        </button>
                        <button onClick={e => this.clear(e)} className="btn btn-secondary m-2">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
    load(user) {
        this.setState({user})
    }
    remove(user) {
        Axios.delete(`${baseUrl}/${user.id}`).then(res => {
            const list = this.state.list.filter(u => u !== user)
            this.setState({list})
        })
    }

        rendertable(){
            return(
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            )
        }

        renderRows(){
            return this.state.list.map(user => {
                return( <tr hey={user.id}>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.email}
                    </td>
                   
                    <td >
                        <button className="btn btn-success m-2 mt-0 mb-0" onClick={() => this.load(user)}><i className="fa fa-pencil"></i></button>
                    
                
                        <button className="btn btn-danger " onClick={() =>this.remove(user)}><i className="fa fa-trash"></i></button>
                    </td>
                 </tr>
            )
            })
        }
    render() {

    


        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.rendertable()}
                
            </Main>
        )
    }
}