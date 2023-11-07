import * as React from 'react';
import imgErro from '../images/NotFoundPage.jpg';

export default function Erro404() {
    return (
        <img
            src={imgErro}
            alt="Imagem de erro 404"
            style={{
                width: '100%',
                height: '100vh',
                objectFit: 'cover',
            }}
        />
    );
}
