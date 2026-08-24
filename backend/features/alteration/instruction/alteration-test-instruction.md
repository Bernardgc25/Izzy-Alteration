#1. run migration(create table):
cd backend
npm run migrate:alteration

#expected output: 
#✅ AlterationItem table ready.
#✅ Index idx_alterationitem_category created.
#✅ Index idx_alterationitem_service_key created.
#✅ Trigger update_alterationitem_timestamp created.
#🔒 Database connection closed.

#2. seed data(populate table with data):
npm run seed:alteration

#expected output: 
#🌱 Seeding AlterationItem table...
#✅ Inserted: female-bottom-hem-skirt-straight-slim
#✅ Inserted: female-bottom-hem-full/circle-unlined-skirt
#...
#🎉 Seeding complete. 100 record(s) inserted.
#🔒 Database connection closed.

#3.Run Mocha Tests:
#Make sure dependencies are installed:
cd backend
npm install

#Then run:
npm run test:alteration

#4. Start Server:
npm start

#Server runs at:
http://localhost:3000


#Postman test method
#Use Postman Collection
1. Open Postman.

2. Import the collection:
    backend/postman/alteration-API-test/alteration-crud-tests.postman_collection.json

3. Ensure the server is running with npm start.

4. Run requests in order:
    Get All Alterations
    Get Alteration Map
    Get Alterations by Category
    Get Alteration by ID
    Create Alteration
    Update Alteration
    Delete Alteration

instruction link: https://chat.deepseek.com/share/z8hg57avoto3kyltut


#NOTE: 
Frontend Integration Note
The frontend currently uses static data from:

js
import { alterationMaps } from './alteration-DataMaps.js';
The new GET /api/alterations/map endpoint returns exactly the same nested shape. Therefore, the frontend can optionally replace or hydrate the static data with:

js
const response = await fetch('/api/alterations/map');
const alterationMaps = await response.json();
This makes the existing PriceCalculator, StateManager, and DOMRenderer modules work directly with the backend API without changing their internal logic.