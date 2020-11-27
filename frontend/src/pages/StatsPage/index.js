import React from 'react';
import Header from '../../components/Header';
import { Container } from 'react-bootstrap';

import  ShortenerService from '../../services/shortenerService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {StatsContainer, StatsBox,StatsRow, StatsBoxTitle} from './styles'

import { parseISO, formatRelative }  from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


class StatsPage extends React.Component{
    constructor(props) {
        super(props);

        this.state ={
            isLoading: false,
            ShortenedURL:{},
            errorMessage: '',
        }
    }

    async componentDidMount(){
        const { code } = this.props.match.params;
        try{
            const services = new ShortenerService();
            const ShortenedURL = await services.getStats(code);
            const parsedDate = parseISO(ShortenedURL.updatedAt);
            const currentDate = new Date();

            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale: ptBR,
            });
            ShortenedURL.relativeDate = relativeDate;
            this.setState({isLoading: false, ShortenedURL });
        }catch(error){

            this.setState({isLoading: false, errorMessage: 'Ops, a url solicitada não existe'});

        }
    }

    render(){
        const {errorMessage, ShortenedURL} = this.state
        return(
            <Container>
                <Header>Estatísticas</Header>
                {errorMessage ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle"/>
                        <p className="m-3">{errorMessage}</p>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                ): (
                   <StatsContainer className="text-center">
                       <p><b>https://pitu.tk/{ShortenedURL.code}</b></p>
                       <p>Redireciona para:<br/>{ShortenedURL.url}</p>
                       <StatsRow>
                           <StatsBox>
                                    <b>{ShortenedURL.hits}</b>
                                    <StatsBoxTitle>Visitas</StatsBoxTitle>
                               </StatsBox>
                               <StatsBox>
                                   <b>{ShortenedURL.relativeDate}</b>
                                   <StatsBoxTitle>Última visita</StatsBoxTitle>
                               
                           </StatsBox>
                       </StatsRow>
                       <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                   </StatsContainer>
                )}
            </Container>
        )
    }
}

export default StatsPage;