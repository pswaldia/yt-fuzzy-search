# Elastic Search Powered Fuzzy Searching 

### List of contents

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Installation](#installation)
- [Improvements](#improvements)


## Introduction
---
[(Back to top)](#list-of-contents)

- This service is developed in [Nestjs](https://www.google.com/search?client=safari&rls=en&q=nestjs&ie=UTF-8&oe=UTF-8) which implements a cron polling [youtubev3data](https://developers.google.com/youtube/v3) API and saving the results in postgres database and a search service which implements two kind of search facilities : one returning **paginated video data** response and one which supports **fuzzy searching**. 
- [Pgsync](https://pgsync.com) is used to sync data between [postgres](https://www.google.com/search?client=safari&rls=en&q=postgres&ie=UTF-8&oe=UTF-8) and [elasticsearch](https://www.elastic.co).
- **Pgsync** : is a change data capture tool which is a middleware for syncing data from postgres to elasticsearch. It allows you to keep postgres as your source of truth and expose structured denormalized documents in elasticsearch.
- Searching on postgres is not efficient and fuzzy searching is not supported out of the box. For implementing search capabilities, elasticsearch has been used (which is based on [apache lucene](https://lucene.apache.org).
- [Kibana](https://www.elastic.co/kibana/) is used to visualize elasticsearch indexes and to filter,sort and visualize the data.
- Application is dockerized. 


## Architecture
---
[(Back to top)](#list-of-contents)

![img](https://i.imgur.com/ALDZaqc.png)

## Installation
---
[(Back to top)](#list-of-contents)

These instructions assume you have *git* installed on your system. 

1. Clone the repository (using *git clone*) and open it in your favorite text editor. 
2. From your project directory, start up your application by running **docker-compose up**.
3. After application run is started, we can interact with the search service through localhost and port 8080. 

    - **health check** : http://localhost:8080/yt-fuzzy-search/health
    - **paginated response api** : http://localhost:8080/yt-fuzzy-search/v1/search
    - **fuzzy search api** : http://localhost:8080/yt-fuzzy-search/v2/search?q=%22how%20to%20learn%20spring%20boot%22&count=2 
4. Interact with postgres database (assuming you have psql command line implemented. ) using : *psql postgres://user:password@localhost:3500/db*
5. Interact with elastic search through kibana (dev tools & discover) at http://localhost:5601

**Note** : Depending on the degree of [fuzziness](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness) specified in elastic search query, it returns the results. This field is configurable and can be set accordingly to cater to our needs. In the v2 search api if you specify query terms like : *spirng booot* or *javaa* , it will return the result. 

## Improvements
---
[(Back to top)](#list-of-contents)

The following are the TODOs / scope of improvement. 

1. Proper error handling mechanism by implementing exception filters.
2. Proper logging
3. Implementing idempotency to avoid duplication of data in the database either by modifying the params of youtube api or some out of the box method by tracking etag of the videos.  
4. Limiting the logs being published on console due to kibana and pgsync. 
