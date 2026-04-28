# Verify if routes are working
# How to test all routes on Measurement-male.test.js
# Step 1: 
# from root, go to backend folder: 
cd Izzy-Alteration/backend

# Step 2:  
# run measurement-male.test.js: 
npm test


# Seeding a database
# How to test if data populates a database(measurement-male-test.sqlite) 
# Step 1: 
# from root, go to backend folder: 
cd Izzy-Alteration/backend

# Step 2:  
# run test/measurement-male-seed.js: 
node test/measurement-male-seed.js

# Step 3: 
go to DB browser for SQlite and open the file: measurement-male-test.sqlite