import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter, Redirect } from "react-router-dom";
import { Button } from "../../views/design/Button";
//import {registration} from './registration'

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;
const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Password = styled.div`
  font-weight: bold;
  color: #06c4ff;
  margin-bottom: 10px;
`;
const Birthday = styled.div`
  font-weight: bold;
  color: #06c4ff;
  margin-bottom: 10px;
`;
const CreationDate = styled.div`
  font-weight: bold;
  color: #06c4ff;
  margin-bottom: 10px;
`;
const Username = styled.div`
  font-weight: bold;
  color: #06c4ff;
  margin-bottom: 10px;
`;
export class Profile extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            id: null,
            username: null,
            status: null,
            birthday: null,
            creationDate: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        //const {handle} = this.props.match.params;
        //const values = queryString.parse(this.props.location.search);
        // alert(this.props.location.data.id);
        //this.setState({ id: handle });
        //fetch(`${getDomain()}/users/${localStorage.getItem("theUserId")}`, {
        fetch(`${getDomain()}/users/${this.props.match.params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(returnedUser => {
                const user = new User(returnedUser);
                this.setState({'username' : user.username});
                this.setState({'status' : user.status});
                this.setState({'birthday' : user.birthday});
                this.setState({'creationDate' : user.creationDate});
                // store the token into the local storage
                // user login successfully worked --> navigate to the route /game in the GameRouter
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the login: ${err.message}`);
                }
            });
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <h2> Welcome to this profile! </h2>
                        <Label>Username</Label>
                        <Container>
                            <div>
                                <Username>{this.state.username}</Username>
                            </div>
                        </Container>
                        <Label>Birthday</Label>
                        <Container>
                            <div>
                                <Birthday>{this.state.birthday}</Birthday>
                            </div>
                        </Container>
                        <Label>Creation date</Label>
                        <Container>
                            <div>
                                <CreationDate>{this.state.creationDate}</CreationDate>
                            </div>
                        </Container>
                        <Label>Online Status</Label>
                        <Container>
                            <div>
                                <CreationDate>{this.state.status}</CreationDate>
                            </div>
                        </Container>
                        <div>
                            <ButtonContainer>
                                <Button
                                    width="50%"
                                    onClick={() => {
                                        return  this.props.history.push('/game');
                                    }}
                                >
                                    Back
                                </Button>
                            </ButtonContainer>
                            <ButtonContainer>
                                <Button
                                    width="50%"
                                    onClick={() => {
                                        if (this.props.match.params.id === localStorage.getItem("theUserId")) {
                                            return this.props.history.push(`/edit/${this.props.match.params.id}`);
                                        } else {
                                            return alert("You cant edit other's profile!");
                                        }
                                    }}

                                >
                                    Edit profile
                                </Button>
                            </ButtonContainer>
                        </div>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
        //});
    }
}

export default withRouter(Profile)



















