const makeBundle = (msg) => {
  //var makeUUid = global.get('uuidv');

//var makeUUid = makeUUid();

  var mkfhir = fhir.js;

  var makeUUid = makeUUid;

  var bundle = {resourceType: "Bundle"}

  bundle.type = "transaction"

  bundle.entry = [];

  var patientHash = {};

  msg.payload.forEach(function (row) {

    var id = patientHash[row.col3];

// if this is a new patient (in the csv) then add it...

    if (!id) {

      id = "urn:uuid:" + makeUUid;

      patiendHash[row.col3] = id;

      var patient = {resourceType: 'Patient'}

      patient.identifier = [{value: row.col3}]

      patient.name = [{family: row.col2, given: [row.col1]}];

//patient.birthDate = makeDob(row.col4)

//patient.gender = makeGender(row.col5)

      patient.birthDate = mkfir.create.Patient(birthDate(row.col4))

      patient.gender = mkfir.create.Patient(gender(row.col5))

      var entry = {fullUrl: id, resource: patient}

//assume the server supports conditional update

      entry.request = {method: 'PUT'}

      entry.request.url = "Patient?identifier=" + row.col3

      bundle.entry.push(entry)

    }

    var condition = {resourceType: 'Condition'}

    condition.clinicalStatus = "active";

    condition.subject = {reference: id};

    condition.code = {coding: [{system: 'http://snomed.info/sct', code: row.col7.toString()}]}

    var entryCond = {resource: condition}

    entryCond.fullUrl = "urn:uuid:" + makeUUid;

//assume the server support conditional update

    entryCond.request = {method: 'POST'}

    entryCond.request.url = "Condition";

    bundle.entry.push(entryCond)

  })

  msg.payload = bundle;

  return msg;
}

export default makeBundle;
