import React, { Component } from "react";
import { Container, Input, Icon, Button } from "semantic-ui-react";
import './HandleDomains.css'
import PostData from '../../services/PostData'
import { Redirect } from 'react-router-dom'
const isValidDomain = require('is-valid-domain')

class HandleDomains extends Component {

    constructor(props){
        super(props);
        this.state = {
            listOfDomains: [],
            listOfDomainsResultSuccess: [],
            listOfDomainsResultFail: [],
            newDomain: "",
            errorMessage: "",
            redirect: false
        } 
        this.onChangeDomain = this.onChangeDomain.bind(this);
        this.onAddDomain = this.onAddDomain.bind(this);
        this.onDeleteDomain = this.onDeleteDomain.bind(this);
        this.submit = this.submit.bind(this);
        this.logout = this.logout.bind(this);
    }

    onChangeDomain(e){
        this.setState({[e.target.name] : e.target.value})
    }

    onAddDomain(){
        let currentDomainArray = this.state.listOfDomains;
        let currentDomainName = this.state.newDomain;

        if(!isValidDomain(currentDomainName)){
            this.setState({
                errorMessage: "Incorrect domain name format"
            })
        }else{
            currentDomainArray.push(currentDomainName);
            this.setState({
                listOfDomains: currentDomainArray,
                newDomain: "",
                errorMessage: ""
            })
        }
    }

    onDeleteDomain(index){
        let currentDomainArray = this.state.listOfDomains;
        currentDomainArray.splice(index, 1);
        this.setState({
            listOfDomains: currentDomainArray,
        })
    }

    async submit(){
        console.log(this.state)
        let listOfDomainsPostData = this.state.listOfDomains;
        await PostData.addDomains({"domains": listOfDomainsPostData}).then((result) => {
            if(result.data.status !== "error"){
                console.log("todo bien", result)
                let newDomainsSuccess = result.data.output.success;
                let newDomainsFail = result.data.output.fail;
                this.setState({
                    listOfDomainsResultSuccess: newDomainsSuccess,
                    listOfDomainsResultFail: newDomainsFail,
                    listOfDomains: []
                })
            }else{
                console.log("toto mal")
            }
        }).catch(function (error) {
            console.log(error);
        })
        
    }

    logout(){
        sessionStorage.setItem('user_credentials', '');
        sessionStorage.clear();
        this.setState({redirect: true});
    }

    componentWillMount(){
        if(sessionStorage.getItem("user_credentials")){
            console.log("Call user feed")
        }else{
            this.setState({redirect: true});
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/login'} />)
        }

        return (
            <Container className="main_container">
                <Container className="domains_form_container">
                    <div className="header_container">
                        <Button className="logout_button" type='submit' onClick={this.logout}>Logout</Button>
                    </div>
                    <h3 className="label_domain_add"> Enter the domain that you want to add: </h3>
                    <div className="container_add_domain">
                        <Input 
                            className="add_domain_input"
                            type="text" 
                            name="newDomain" 
                            placeholder='www.example.com' 
                            value={this.state.newDomain}
                            onChange={this.onChangeDomain}
                        />
                        <Icon size='large' name='plus circle' onClick={this.onAddDomain}/>
                    </div>
                    {
                        this.state.errorMessage !== "" ? (
                            <span className="error_message_add">{this.state.errorMessage}</span>
                        ):(
                            null
                        )
                    }
                    <hr className="section_line"/>
                    <h3 className="label_domain_list"> List of domain names to add: </h3>
                    <div className="list_domains">
                        {
                            this.state.listOfDomains.map((domain, index) => {
                                return (
                                    <div className="section_domain">
                                        <Input 
                                            className="added_domain_input"
                                            type="text"  
                                            value={domain} 
                                            disabled
                                        />
                                        <Icon size='large' name='minus circle' onClick={() => this.onDeleteDomain(index)}/>
                                    </div>
                                )
                            })
                        }
                        {
                            this.state.listOfDomains.length > 0 ? (
                                <Button className="add_domains_button" type='submit' onClick={this.submit}>Submit</Button>
                            ):(
                                null
                            )
                        }
                    </div>
                    {
                        this.state.listOfDomainsResultSuccess.length > 0 ? (
                            <div>
                                <hr className="section_line"/>
                                <h3>List of added domains </h3>
                                <div className="list_domains_result">
                                    {
                                        this.state.listOfDomainsResultSuccess.map((domain, index) => {
                                            return (
                                                <div className="section_domain">
                                                    <Input 
                                                        className="added_domain_input"
                                                        type="text"  
                                                        value={domain.domain} 
                                                        disabled
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ): (
                            null
                        )
                    }
                    {
                        this.state.listOfDomainsResultFail.length > 0 ? (
                            <div>
                                <hr className="section_line"/>
                                <h4>The following domain names could not be added as they already exist in the database</h4>
                                <div className="list_domains_result failed">
                                    {
                                        this.state.listOfDomainsResultFail.map((domain, index) => {
                                            return (
                                                <div className="section_domain">
                                                    <Input 
                                                        className="added_domain_input failed"
                                                        type="text"  
                                                        value={domain} 
                                                        disabled
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ): (
                            null
                        )
                    }
                </Container>
            </Container>
        )
    }
}

export default HandleDomains;