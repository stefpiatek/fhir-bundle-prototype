import readCsv from "./read_csv.js";
import makeBundle from "./make_bundle.js";
import fetch from "node-fetch";

const patientData = readCsv("./data/sample_data.csv");
const bundle = makeBundle({payload: patientData});

console.log("used bundle in post request:")
console.log(JSON.stringify(bundle.payload, null, 2));
console.log("-----\n")

const FHIR_URL = "http://localhost:8090/fhir/";
const result = await fetch(FHIR_URL,
  {
    method: "POST",
    body: JSON.stringify(bundle.payload),
    headers: {'Content-Type': 'application/fhir+json;charset=UTF-8'}
  }
)
const jsonResult = await result.json();
console.log("Response from post request:")
console.log(JSON.stringify(jsonResult, null, 2))

