import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { PageArea } from './styled';
import { 
    PageContainer, 
    PageTitle, 
    ErrorMessage } from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';


const Page = () => {

    const api = useApi();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [stateList, setStateList] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect(() => {
        const getStates = async () => {
            const sList = await api.getState();
            setStateList(sList);
        }
        getStates();
        const getUser = async () => {
            const user = await api.getUser();
            setName(user.name);
            setEmail(user.email);
            setStateLoc(user.state);
            setPassword(user.password);
            setConfirmPassword(user.password);
        }
        getUser();
        const getAds = async () => {
            const ads = await api.getAds();
            setAdList(ads);
        }
        getAds();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        if (password !== confirmPassword) {
            setError("Senhas não batem");
            setDisabled(false);
            return;
        }
        const json = await api.updateUser(
            name,
            stateLoc,
            email,
            password
        );
        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = '/';
        }
        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Alterar Cadastro</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">
                            Noma Completo
                        </div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled} 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Estado
                        </div>
                        <div className="area--input">
                            <select 
                                disabled={disabled} 
                                value={stateLoc}
                                onChange={e => setStateLoc(e.target.value)}
                                required
                            >
                                <option></option>
                                {stateList.map((i, k) =>
                                    <option
                                        key={k}
                                        value={i.id}
                                    >
                                        {i.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            E-mail
                        </div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                disabled={disabled} 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Senha
                        </div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled} 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Confirmar a Senha
                        </div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled} 
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Alterar Cadastro</button>
                        </div>
                    </label>
                </form>

                <PageTitle>Meus Recentes</PageTitle>
                <div className="list">
                    {
                        adList.map((i, k) =>
                            <div className="card-ad" key={k}>
                                <img 
                                    src={i.images[0]}
                                    alt="ad" width={200} height={200} 
                                />
                                <div className="area-ad">
                                    <label className="area--title-ad">
                                        {i.title}
                                    </label>
                                    <br />
                                    <label className="area--text-ad">
                                        {i.price}
                                    </label>
                                    <Link to={'/ad/update/'+1}>Atualizar</Link>
                                </div> 
                            </div>
                        )
                    }
                </div>
            </PageArea>
        </PageContainer>
    )
}

export default Page