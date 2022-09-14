import React from 'react'
import { Link } from 'react-router-dom'
import { NotFoundArea } from './styled'
import { PageContainer, PageTitle } from '../components/MainComponents'

const Page = () => {
    return (
        <NotFoundArea>
                <div className="conteudo">
                    <PageContainer>
                        <PageTitle>Página não encontrada</PageTitle>
                        <div className="botao">
                            <Link to="/">Voltar para a Home</Link>
                        </div>
                    </PageContainer>
                </div>
        </NotFoundArea>
    )
}

export default Page