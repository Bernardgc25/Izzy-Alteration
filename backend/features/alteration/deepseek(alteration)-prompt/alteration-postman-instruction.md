**CODE 1 - File:{alteration-crud-tests.postman_collection.json}**  
[
 {
  "info": {
    "name": "Alteration CRUD API Tests",
    "description": "CRUD tests for Izzy Alteration API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Alterations",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/alterations",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "alterations"]
        }
      }
    },
    {
      "name": "Get Alteration Map",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/alterations/map",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "alterations", "map"]
        }
      }
    },
    {
      "name": "Get Alterations by Category",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/alterations/category/female-dress",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "alterations", "category", "female-dress"]
        }
      }
    },
    {
      "name": "Get Alteration by ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/alterations/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "alterations", "1"]
        }
      }
    },
    {
      "name": "Create Alteration",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"category\": \"female-top\",\n  \"service_key\": \"postman-female-top\",\n  \"label\": \"Postman Test Top\",\n  \"description\": \"Created from Postman\",\n  \"simple_price\": 50,\n  \"intermediate_price\": 75,\n  \"difficult_price\": 95\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/alterations",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "alterations"]
        }
      }
    },
    {
      "name": "Update Alteration",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"category\": \"female-top\",\n  \"service_key\": \"postman-female-top\",\n  \"label\": \"Postman Updated Top\",\n  \"description\": \"Updated from Postman\",\n  \"simple_price\": 55,\n  \"intermediate_price\": 80,\n  \"difficult_price\": 100\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/alterations/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "alterations", "1"]
        }
      }
    },
    {
      "name": "Delete Alteration",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/alterations/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "alterations", "1"]
        }
      }
    }
  ]
}
]

**CODE 2 - File:{README.md}**  
[

```
Izzy-Alteration
├─ Package-list.md
├─ backend
│  ├─ api.js
│  ├─ backend-deepseek-prompt
│  │  ├─ features-measurement-routes-migration.md
│  │  ├─ measurement-API-postman-test.md
│  │  ├─ measurement-male-routes-migration-test.md
│  │  └─ measurement-unit-test.md
│  ├─ features
│  │  ├─ alteration
│  │  │  ├─ alteration-database.sqlite
│  │  │  ├─ alteration-migration.js
│  │  │  ├─ alteration-routes.js
│  │  │  ├─ alteration-seeding.js
│  │  │  ├─ deepseek(alteration)-prompt
│  │  │  │  ├─ alteration-CRUD.md
│  │  │  │  ├─ alteration-debug.md
│  │  │  │  └─ alteration-postman-instruction.md
│  │  │  └─ instruction
│  │  │     └─ alteration-test-instruction.md
│  │  └─ measurement
│  │     ├─ Instruction(migration script).md
│  │     ├─ female
│  │     │  ├─ measurement-female-database.sqlite
│  │     │  ├─ measurement-female-migration.js
│  │     │  ├─ measurement-female-routes.js
│  │     │  └─ measurement-female-seeding.js
│  │     └─ male
│  │        ├─ measurement-male-database.sqlite
│  │        ├─ measurement-male-migration.js
│  │        ├─ measurement-male-routes.js
│  │        └─ measurement-male-seeding.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postman
│  │  ├─ alteration-API-test
│  │  │  └─ alteration-crud-tests.postman_collection.json
│  │  └─ measurment-API-test
│  │     ├─ female-measurements-crud-tests.postman_collection.json
│  │     └─ male-measurements-crud-tests.postman_collection.json
│  ├─ server.js
│  └─ test
│     ├─ alteration
│     │  └─ alteration.test.js
│     └─ measurement
│        ├─ Instruction-measurement-test.md
│        ├─ measurement-female.test.js
│        └─ measurement-male.test.js
├─ deepseek-template-prompt(utilize this)
├─ frontend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ pages
│  │  ├─ account-menu.html
│  │  ├─ add-service.html
│  │  ├─ alteration-pages
│  │  │  ├─ alteration-about
│  │  │  │  ├─ (debug)alteration-modules.md
│  │  │  │  ├─ alteration(how-the-program-works).md
│  │  │  │  ├─ alteration-female.txt
│  │  │  │  ├─ alteration-functionality-prompt.md
│  │  │  │  ├─ alteration-modules.md
│  │  │  │  └─ alteration-responsive-page.md
│  │  │  ├─ alteration-female-bottom.html
│  │  │  ├─ alteration-female-dress.html
│  │  │  ├─ alteration-female-jacket.html
│  │  │  ├─ alteration-female-top.html
│  │  │  ├─ alteration-male-bottom.html
│  │  │  ├─ alteration-male-suits.html
│  │  │  ├─ alteration-male-top.html
│  │  │  ├─ alteration-modules
│  │  │  │  ├─ alteration-CartManager.js
│  │  │  │  ├─ alteration-DOMRenderer.js
│  │  │  │  ├─ alteration-DataMaps.js
│  │  │  │  ├─ alteration-EventManager.js
│  │  │  │  ├─ alteration-Main.js
│  │  │  │  ├─ alteration-PriceCalculator.js
│  │  │  │  └─ alteration-StateManager.js
│  │  │  └─ alteration-repair.html
│  │  ├─ index.html
│  │  ├─ login.html
│  │  ├─ measurement-pages
│  │  │  ├─ measurement-about
│  │  │  │  ├─ (debug)floating-window-measurement.md
│  │  │  │  ├─ (debug)measurement-split-modules.md
│  │  │  │  ├─ (refactor)measurement-modules.md
│  │  │  │  ├─ measurement(how-the-program-works).md
│  │  │  │  ├─ measurement-functionality-prompt.md
│  │  │  │  ├─ measurement-modules.md
│  │  │  │  └─ measurements-about.txt
│  │  │  ├─ measurement-modules
│  │  │  │  ├─ measurement-DataMaps.js
│  │  │  │  ├─ measurement-Main.js
│  │  │  │  ├─ measurement-Manager.js
│  │  │  │  ├─ measurement-Validator.js
│  │  │  │  └─ measurement-ViewHandler.js
│  │  │  ├─ measurements-female.html
│  │  │  ├─ measurements-male.html
│  │  │  └─ sample.html
│  │  ├─ order-history.html
│  │  ├─ services.html
│  │  └─ signup.html
│  ├─ public
│  │  ├─ css
│  │  │  ├─ account-menu.css
│  │  │  ├─ add-service.css
│  │  │  ├─ alteration-female.css
│  │  │  ├─ alteration.css
│  │  │  ├─ index.css
│  │  │  ├─ login.css
│  │  │  ├─ measurements.css
│  │  │  ├─ order-history.css
│  │  │  ├─ services.css
│  │  │  └─ signup.css
│  │  ├─ images
│  │  │  ├─ female-(chart)-tablet-mobile.png
│  │  │  ├─ female-back-tablet-mobile.png
│  │  │  ├─ female-desktop.png
│  │  │  ├─ female-front-tablet-mobile.png
│  │  │  ├─ male-(chart)-tablet-mobile.png
│  │  │  ├─ male-back-tablet-mobile.png
│  │  │  ├─ male-desktop.png
│  │  │  └─ male-front-tablet-mobile.png
│  │  └─ js
│  │     ├─ account.js
│  │     ├─ add-service.js
│  │     ├─ alteration-female.js
│  │     ├─ alteration-price-calculator.js
│  │     ├─ index.js
│  │     ├─ login.js
│  │     ├─ order-history.js
│  │     ├─ services.js
│  │     └─ signup.js
│  └─ test
│     ├─ TEST(how to run).md
│     ├─ alteration-module-tests
│     │  ├─ alteration-TEST(about)
│     │  │  ├─ (debug)alteration-test-unit.md
│     │  │  ├─ (refactor)alteration-test-unit.md
│     │  │  └─ alteration-unit-tests-prompt.md
│     │  └─ unit
│     │     ├─ alteration-CartManager.test.js
│     │     ├─ alteration-DOMRenderer.test.js
│     │     ├─ alteration-DataMaps.test.js
│     │     ├─ alteration-EventManager.test.js
│     │     ├─ alteration-Main.test.js
│     │     ├─ alteration-PriceCalculator.test.js
│     │     └─ alteration-StateManager.test.js
│     └─ measurement-module-tests
│        ├─ measurement-TEST(about)
│        │  ├─ (debug)measurement-test-unit.md
│        │  ├─ (refactor)measurement-test-unit.md
│        │  └─ measurement-unit-tests-prompt.md
│        └─ unit
│           ├─ measurement-DataMaps.test.js
│           ├─ measurement-Main.test.js
│           ├─ measurement-Manager.test.js
│           ├─ measurement-Validator.test.js
│           └─ measurement-ViewHandler.test.js
├─ package-lock.json
└─ package.json

```
] 

**CODE 3 - File:{filename}**  
[

]

**CODE 4 - File:{filename}**  
[
  
]

**CODE 5 - File:{filename}**  
[
  
]

**CODE 6 - File:{filename}**
[

]

**CODE 7 - File:{filename}**
[
   

]

**CODE 8 - File:{filename}**
[
 
]



**ERROR/ISSUE:**
[
  none
]

**REQUEST:**
[
1. provide instruction on how to test each endpoints on CODE 1 on postman app 
]