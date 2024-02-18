[![Merge Develop into Main](https://github.com/W9968/design-develop-assessment-process/actions/workflows/merge-develop-into-main.yml/badge.svg)](https://github.com/W9968/design-develop-assessment-process/actions/workflows/merge-develop-into-main.yml)

# git flow

up to this moment or per last commit we have 3 branches
* main (master) will be blocked for direct commits
* develop (dev) will be the main branch for development

## feature branches

* crawler (branch) will be the branch for the data scrapping
* pipe (branch) will be the branch for the broker using kafka
* learner (branch) will be the branch for the building the machine learning model
* client (branch) will be the branch for the client side project

## ports

```yml
learner = 6008
crawler = 6006
client  = 3000
api     = 8080
kafka   = 8699
manager = 9968 
```
