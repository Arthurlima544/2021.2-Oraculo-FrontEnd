# 2021.2-Oraculo-Frontend

[![License: GPL-3.0](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/mit)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.2-Oraculo-FrontEnd&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.2-Oraculo-FrontEnd)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.2-Oraculo-FrontEnd&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.2-Oraculo-FrontEnd)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.2-Oraculo-FrontEnd&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.2-Oraculo-FrontEnd)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.2-Oraculo-FrontEnd&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.2-Oraculo-FrontEnd)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.2-Oraculo-FrontEnd&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.2-Oraculo-FrontEnd)

Esse repositório tem o propósito de apresentar um interface web simples e intuitiva do projeto [`Oráculo`](https://github.com/fga-eps-mds/2021.1-Oraculo).

## Como contribuir?

Gostaria de contribuir com nosso projeto? Acesse o nosso [guia de contribuição](https://fga-eps-mds.github.io/2021.1-Oraculo/CONTRIBUTING/) onde são explicados todos os passos.
Caso reste duvidas você também pode entrar em contato conosco criando uma issue.

## Documentação

A documentação do projeto pode ser acessada pelo nosso site em https://fga-eps-mds.github.io/2021.1-Oraculo/.

## Como rodar?

Para rodar o Frontend é preciso usar o seguinte comando usando o docker.

```bash
docker-compose up
```

O frontend estará rodando na [porta 3000](http://localhost:3000).

Configure as variáveis de ambiente

- Deploy local

```bash
export REACT_APP_PROD=false
```

- Deploy em ambiente em nuvem

```bash
export REACT_APP_PROD=true
export REACT_APP_PROFILE_BASE_URL=""
export REACT_APP_RECORDS_BASE_URL=""
export REACT_APP_TAGS_BASE_URL="$REACT_APP_RECORDS_BASE_URL"
```

**Importante**: as variáveis `REACT_APP_PROFILE_BASE_URL` e `REACT_APP_RECORDS_BASE_URL` deverão possuir
a URL completa (host e porta) dos microsserviços de profile e de registros, respectivamente.

Esta aplicação faz conexão e é dependente das APIs para funcionar corretamente. As APIs correspondentes são:

- [API de Profile](https://github.com/fga-eps-mds/2021.2-Oraculo-Profile)
- [API de Registros](https://github.com/fga-eps-mds/2021.2-Oraculo-Registros)
