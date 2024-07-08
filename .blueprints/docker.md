# Kafka Docker Setup and Verification

This guide provides instructions for setting up Apache Kafka using Docker Compose from a `.docker` directory and verifying its functionality. Make sure Docker is installed on your system. You can download and install Docker from [here](https://www.docker.com/products/docker-desktop).



## Notes

- By default, Kafka runs on port 9092, and Kafka management tools may run on different ports (e.g., 9000 for Kafka Manager, 8080 for Kafdrop). Make sure these ports are available and not occupied by other services. and we have overriden the default ports to the following:

```json
"spring-boot"               :6899,
"next-js"                   :1999,
"flask-python-scrapper"     :6006,
"flask-python-LLM"          :6008,
```

- Update the `docker-compose.yml` file to customize Kafka configuration or integrate other Kafka management tools.

- Refer to Kafka and Docker documentation for more advanced configuration options and troubleshooting.


###### This README file assumes that the `.docker` directory containing the Docker Compose file is located within your repository. Adjust the paths and commands as needed based on your actual directory structure.