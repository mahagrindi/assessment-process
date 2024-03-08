# Kafka Docker Setup and Verification

This guide provides instructions for setting up Apache Kafka using Docker Compose from a `.docker` directory and verifying its functionality. Make sure Docker is installed on your system. You can download and install Docker from [here](https://www.docker.com/products/docker-desktop).

1. **Clone Repository**: If you haven't already, clone this repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   ```

2. **Navigate to Docker Directory**: Change directory to the `.docker` directory where the Docker Compose file is located.

   ```bash
   cd /.docker
   ```

3. **Start Kafka**: Use Docker Compose to start the Kafka environment defined in the `docker-compose.yml` file.

   ```bash
   docker-compose up -d
   ```

4. **Verify Kafka Setup**:
   
   - Check Docker containers to ensure Kafka and Zookeeper are running:
     
     ```bash
     docker ps
     ```

   - Access Kafka logs to check for any errors or warnings:

     ```bash
     docker-compose logs kafka
     ```

   - Produce and consume messages to verify Kafka functionality:
   
     ```bash
     # Start a producer
     docker-compose exec kafka kafka-console-producer --broker-list localhost:9092 --topic test-topic

     # Start a consumer
     docker-compose exec kafka kafka-console-consumer --bootstrap-server localhost:9092 --topic test-topic --from-beginning
     ```

   - Check Kafka topics:

     ```bash
     docker-compose exec kafka kafka-topics --list --bootstrap-server localhost:9092
     ```

   - Optionally, access Kafka management tool (e.g., Kafka Manager, Kafdrop) web interface to monitor Kafka cluster.

## Notes

- By default, Kafka runs on port 9092, and Kafka management tools may run on different ports (e.g., 9000 for Kafka Manager, 8080 for Kafdrop). Make sure these ports are available and not occupied by other services. and we have overriden the default ports to the following:

```json
"learner"     :6008,
"crawler"     :6006,
"client"      :3000,
"api"         :8080,
"kafka"       :6899,
"manager"     :9968,
"zookeeper"   :2181
```

- Update the `docker-compose.yml` file to customize Kafka configuration or integrate other Kafka management tools.

- Refer to Kafka and Docker documentation for more advanced configuration options and troubleshooting.


###### This README file assumes that the `.docker` directory containing the Docker Compose file is located within your repository. Adjust the paths and commands as needed based on your actual directory structure.