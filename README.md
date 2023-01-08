# Elastic Search Powered Fuzzy Searching 

### List of contents

- [Introduction](#introduction)
- [Architecture Diagram](#working)
- [Installation](#installation)


## Introduction
---
[(Back to top)](#list-of-contents)

- This service is developed in [Nestjs](https://www.google.com/search?client=safari&rls=en&q=nestjs&ie=UTF-8&oe=UTF-8) which implements a cron polling [youtubev3data](https://developers.google.com/youtube/v3) API and saving the results in postgres database and a search service which implements two kind of search facilities : one returning **paginated video data** response and one which supports **fuzzy searching**. 
- [Pgsync](https://pgsync.com) is used to sync data between [postgres](https://www.google.com/search?client=safari&rls=en&q=postgres&ie=UTF-8&oe=UTF-8) and [elasticsearch](https://www.elastic.co).
- **Pgsync** : is a change data capture tool which is a middleware for syncing data from postgres to elasticsearch. It allows you to keep postgres as your source of truth and expose structured denormalized documents in elasticsearch.
- Searching on postgres is not efficient and fuzzy searching is not supported out of the box. For implementing search capabilities, elasticsearch has been used (which is based on [apache lucene](https://lucene.apache.org).
- [Kibana](https://www.elastic.co/kibana/) is used to visualize elasticsearch indexes and to filter,sort and visualize the data.  
- Application is dockerized. 


## Architecture Diagram
---
[(Back to top)](#list-of-contents)

![img](https://i.imgur.com/ALDZaqc.png)

## Installation
---
[(Back to top)](#list-of-contents)

These instructions assume you have *git* installed on your system. 

1. Clone the repository (using *git clone*) and open it in your favorite text editor. 
2. From your project directory, start up your application by running **docker-compose up**.

