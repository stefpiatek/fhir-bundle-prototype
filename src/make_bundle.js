import moment from 'moment';
import {v4 as uuidv4} from 'uuid';

const makeUUid = () => {
  return uuidv4();
};

const makeDob = (stringValue) => {
  const date = moment(stringValue, "DD/MM/YYYY");
  return date.toISOString().split("T")[0];
};

const makeGender = (stringValue) => {
  let outputValue = "unknown";
  if (stringValue === "m") {
    outputValue = "male"
  }
  if (stringValue === "f") {
    outputValue = "female"
  }
  return outputValue;
};

const makeBundle = (msg) => {
  const bundle = {resourceType: "Bundle"}
  bundle.type = "transaction"
  bundle.entry = [];
  const patientHash = {};


  msg.payload.forEach(function (row) {
    let id = patientHash[row.col3];
    // if this is a new patient (in the csv) then add it...
    if (!id) {
      id = "urn:uuid:" + makeUUid();
      patientHash[row.col3] = id;
      const patient = {resourceType: 'Patient'}
      patient.identifier = [{value: row.col3}]
      patient.name = [{family: row.col2, given: [row.col1]}];
      patient.birthDate = makeDob(row.col4)
      patient.gender = makeGender(row.col5)
      const entry = {fullUrl: id, resource: patient}
      // Assume the server supports conditional update
      entry.request = {method: 'PUT'}
      entry.request.url = "Patient?identifier=" + row.col3
      bundle.entry.push(entry)
    }
    // Now add the condition
    const condition = {resourceType: 'Condition'}
    condition.clinicalStatus = "active";
    condition.subject = {reference: id};
    condition.code = {coding: [{system: 'http://snomed.info/sct', code: row.col7.toString()}]}

    const entryCond = {resource: condition}
    entryCond.fullUrl = "urn:uuid:" + makeUUid();
    //assume the server support conditional update
    entryCond.request = {method: 'POST'}
    entryCond.request.url = "Condition";
    bundle.entry.push(entryCond)

  })

  msg.payload = bundle;

  return msg;
}

export default makeBundle;
