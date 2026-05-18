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
    (male)
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

    (female)
    # POST:     [
                    curl -X POST http://localhost:3000/api/measurements/female \
                    -H "Content-Type: application/json" \
                    -d '{
                        "neck": 35.0,
                        "shoulder_length": 14.5,
                        "arm_length": 56.0,
                        "chest_circumference": 92.0,
                        "under_bust": 82.0,
                        "waist": 72.0,
                        "hipbone_circumference": 96.0,
                        "hip_circumference": 102.0,
                        "thigh": 59.0,
                        "knee": 36.5,
                        "calf": 34.5,
                        "ankle": 22.5,
                        "bicep": 29.0,
                        "elbow": 24.5,
                        "wrist": 16.5,
                        "inseam_ankle": 73.0,
                        "inseam_floor": 75.0,
                        "neck_waist": 41.0,
                        "neck_floor": 132.0,
                        "waist_floor": 101.0,
                        "height": 167.0,
                        "client_name": "Jane Smith",
                        "size_number": "M",
                        "measurement_date": "2026-05-17"
                    }'
                ]

    # PUT:      [
                    curl -X PUT http://localhost:3000/api/measurements/female/1 \
                    -H "Content-Type: application/json" \
                    -d '{
                        "neck": 36.0,
                        "shoulder_length": 15.0,
                        "arm_length": 57.0,
                        "chest_circumference": 94.0,
                        "under_bust": 84.0,
                        "waist": 74.0,
                        "hipbone_circumference": 98.0,
                        "hip_circumference": 104.0,
                        "thigh": 60.0,
                        "knee": 37.0,
                        "calf": 35.0,
                        "ankle": 23.0,
                        "bicep": 30.0,
                        "elbow": 25.0,
                        "wrist": 17.0,
                        "inseam_ankle": 74.0,
                        "inseam_floor": 76.0,
                        "neck_waist": 42.0,
                        "neck_floor": 134.0,
                        "waist_floor": 103.0,
                        "height": 169.0,
                        "client_name": "Jane Smith Updated",
                        "size_number": "L",
                        "measurement_date": "2026-05-17"
                    }'
                ]

# test routes via HTTP url (postman) 
# Step 1: open POSTMAN app and import .json file:
    male-measurements-crud-tests.postman_collection
# Step 2: run each endpoint, example: New -> HTTP -> GET
# Step 3: paste in the url window
    # GET:      http://localhost:3000/api/measurements/male
    # GET/ID:   http://localhost:3000/api/measurements/male{id-number}
    # DELETE:   http://localhost:3000/api/measurements/male{id-number}

    # POST:
        step 1. Create New Request
                Click "+" or "New" → "HTTP Request"
                Set method to POST
                Enter URL: http://localhost:3000/api/measurements/female

        step 2. Set Headers
                In the "Headers" tab                
                Key= Content-Type	Value = application/json

        step 3: Set Request Body
                Click "Body" tab → Select "raw" → Choose "JSON"
        
        step 4: Paste the test data: 
                {
                    "neck": 35.0,
                    "shoulder_length": 14.5,
                    "arm_length": 56.0,
                    "chest_circumference": 92.0,
                    "under_bust": 82.0,
                    "waist": 72.0,
                    "hipbone_circumference": 96.0,
                    "hip_circumference": 102.0,
                    "thigh": 59.0,
                    "knee": 36.5,
                    "calf": 34.5,
                    "ankle": 22.5,
                    "bicep": 29.0,
                    "elbow": 24.5,
                    "wrist": 16.5,
                    "inseam_ankle": 73.0,
                    "inseam_floor": 75.0,
                    "neck_waist": 41.0,
                    "neck_floor": 132.0,
                    "waist_floor": 101.0,
                    "height": 167.0,
                    "client_name": "Test Female User",
                    "size_number": "M",
                    "measurement_date": "2026-05-17"
                }

    # PUT:
        step 1. Create New Request
                Click "+" → "HTTP Request"
                Set method to PUT
                Enter URL: http://localhost:3000/api/measurements/female/{{female_id}}
                (Replace {{female_id}} with an actual ID, or use the variable if set)

       step 2. Set Headers
                In the "Headers" tab                
                Key= Content-Type	Value = application/json

        step 3: Set Body      
        step 4: Paste the test data: 
                {
                    "neck": 36.0,
                    "shoulder_length": 15.0,
                    "arm_length": 57.0,
                    "chest_circumference": 94.0,
                    "under_bust": 84.0,
                    "waist": 74.0,
                    "hipbone_circumference": 98.0,
                    "hip_circumference": 104.0,
                    "thigh": 60.0,
                    "knee": 37.0,
                    "calf": 35.0,
                    "ankle": 23.0,
                    "bicep": 30.0,
                    "elbow": 25.0,
                    "wrist": 17.0,
                    "inseam_ankle": 74.0,
                    "inseam_floor": 76.0,
                    "neck_waist": 42.0,
                    "neck_floor": 134.0,
                    "waist_floor": 103.0,
                    "height": 169.0,
                    "client_name": "Updated Female User",
                    "size_number": "L",
                    "measurement_date": "2026-05-17"
                }




# How to test if data populates a database(measurement-male-test.sqlite)
# Step 1: from root, go to backend folder: 
    cd Izzy-Alteration/backend
# Step 2:  run test/measurement-male-seed.js: 
    node test/measurement/male/measurement-male-seed.js
# Step 3: go to DB browser for SQlite and open the file: measurement-male-test.sqlite the database should be filled out with data 