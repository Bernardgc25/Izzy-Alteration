# Verify if routes are working via unit test (mocha)
# How to test all routes on Measurement-male.test.js
# Step 1: go to backend folder:     
    cd Izzy-Alteration/backend
# Step 2: run measurement-male.test.js:     
    npm test


# test routes via HTTP url 
# Step 1: create a table:   
    node features/measurement/male/measurement-male-migration.js
# Step 2: seed a database:  
    node features/measurement/male/measurement-male-seeding.js
# Step 3: open a terminal and start the server:     
    node server.js
# Step 4: open another terminal:     
    # GET:      curl http://localhost:3000/api/measurements/male
    # GET/ID:   curl http://localhost:3000/api/measurements/male/2
    # POST:     [
                    curl -X PUT http://localhost:3000/api/measurements/male/1 \
                    -H "Content-Type: application/json" \
                    -d '{
                        "neck": 40.0,
                        "shoulder_length": 17.5,
                        "arm_length": 62.0,
                        "across_front": 44.0,
                        "chest_circumference": 102.0,
                        "waist": 88.0,
                        "hip_circumference": 106.0,
                        "total_rise": 30.0,
                        "thigh": 61.0,
                        "knee": 39.0,
                        "calf": 38.0,
                        "ankle": 25.5,
                        "bicep": 34.0,
                        "elbow": 27.5,
                        "wrist": 19.0,
                        "inseam_ankle": 78.0,
                        "inseam_floor": 80.0,
                        "neck_waist": 46.0,
                        "neck_floor": 143.0,
                        "waist_floor": 111.0,
                        "height": 181.0,
                        "client_name": "John Smith Updated",
                        "size_number": "L",
                        "measurement_date": "2026-05-17"
                    }'
                ]

    # PUT:      [
                    curl -X PUT http://localhost:3000/api/measurements/male/1 \
                    -H "Content-Type: application/json" \
                    -d '{
                        "neck": 40.0,
                        "shoulder_length": 17.5,
                        "arm_length": 62.0,
                        "across_front": 44.0,
                        "chest_circumference": 102.0,
                        "waist": 88.0,
                        "hip_circumference": 106.0,
                        "total_rise": 30.0,
                        "thigh": 61.0,
                        "knee": 39.0,
                        "calf": 38.0,
                        "ankle": 25.5,
                        "bicep": 34.0,
                        "elbow": 27.5,
                        "wrist": 19.0,
                        "inseam_ankle": 78.0,
                        "inseam_floor": 80.0,
                        "neck_waist": 46.0,
                        "neck_floor": 143.0,
                        "waist_floor": 111.0,
                        "height": 181.0,
                        "client_name": "John Smith Updated",
                        "size_number": "L",
                        "measurement_date": "2026-05-17"
                    }'
                ]  
    
    # DELETE:   curl -X DELETE http://localhost:3000/api/measurements/male/1

# test routes via HTTP url (postman) 
# Step 1: open POSTMAN app and import .json file:
    male-measurements-crud-tests.postman_collection
# Step 2: run each endpoint, example: New -> HTTP -> GET
# Step 3: paste in the url window
    # GET:      http://localhost:3000/api/measurements/male
    # GET/ID:   http://localhost:3000/api/measurements/male{id-number}



# How to test if data populates a database(measurement-male-test.sqlite)
# Step 1: from root, go to backend folder: 
    cd Izzy-Alteration/backend
# Step 2:  run test/measurement-male-seed.js: 
    node test/measurement/male/measurement-male-seed.js
# Step 3: go to DB browser for SQlite and open the file: measurement-male-test.sqlite the database should be filled out with data 