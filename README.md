# Basic csv to FHIR transformation

Aiming to recreate the FHIR bundle data example from  
[Hay on FHIR](https://fhirblog.com/2019/03/25/importing-csv-data-into-a-fhir-server/).
Early stage prototype to ensure that a full FHIR bundle can be created.

This started off using node-red, though ended up reverting to a node project. 

## Setup

- Node and docker-compose are prerequisites.
- Install the dependencies for the project
    ```shell
    npm install
    ```
- Spin up docker containers to create a fake FHIR server to interact with.
    ```shell
    docker-compose up -d
    ```
  
## Running of the script 

- Run the script in `src/index.js`. 
    ```shell
    npm run-script run
    ```
  - This converts the CSV file in `data/sample_data.csv` into an array of json object
  - Then creates a FHIR bundle using the example in [Hay on FHIR](https://fhirblog.com/2019/03/25/importing-csv-data-into-a-fhir-server/).
  - This bundle is then posted to the FHIR server
