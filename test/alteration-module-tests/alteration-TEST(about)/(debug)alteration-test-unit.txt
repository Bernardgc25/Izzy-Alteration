1. the alteration unit tests has been moved to the following location:
[
  /Izzy-Alteration/test/alteration-module-tests/unit:
]

2. reconfigure the test scripts in the root package.json to point to the new location of the alteration unit tests, 
   and make sure it will run on the command: 
[
  "npm run test:alteration"
]

3. here is the location of .mocharc.json file: test/alteration-module-tests/.mocharc.json
[
  {
    "extension": ["js"],
    "spec": "*.test.js",
    "reporter": "spec",
    "timeout": 5000,
    "node-option": [
      "experimental-vm-modules"
    ],
    "require": ["testdouble"]
  }
]


4. here is the location of package.json file: test/alteration-module-tests/package.json
[
  {
    "name": "alteration-module-tests",
    "type": "module",
    "scripts": {
      "test": "mocha",
      "test:watch": "mocha --watch"
    },
    "devDependencies": {
      "mocha": "^10.0.0",
      "testdouble": "^3.20.2"
    },
    "version": "1.0.0",
    "description": "",
    "main": "AlterationApp.test.js",
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
]

5. here is the location of root package.json file: /Izzy-Alteration/package.json:
[
    {
    "scripts": {
      "test": "mocha",
      "test:alteration": "cd test/alteration-module-tests && npm test",
      "test:measurement": "cd test/measurement-module-tests && npm test",
      "test:watch": "mocha --watch test/alteration-module-tests/*.test.js"
    },
    "type": "module",
    "devDependencies": {
      "mocha": "^10.0.0",
      "testdouble": "^3.20.2"
    }
  }
]

6. this is the folder structure of the project:
[

Izzy-Alteration
├─ about
│  ├─ deepseek
│  │  └─ alteration-female.txt
│  └─ measurements-about.txt
├─ package-lock.json
├─ package.json
├─ src
│  ├─ css
│  │  ├─ account-menu.css
│  │  ├─ add-service.css
│  │  ├─ alteration-female.css
│  │  ├─ alteration.css
│  │  ├─ index.css
│  │  ├─ login.css
│  │  ├─ measurements.css
│  │  ├─ order-history.css
│  │  ├─ services.css
│  │  └─ signup.css
│  ├─ images
│  │  ├─ female-(chart)-tablet-mobile.png
│  │  ├─ female-back-tablet-mobile.png
│  │  ├─ female-desktop.png
│  │  ├─ female-front-tablet-mobile.png
│  │  ├─ male-(chart)-tablet-mobile.png
│  │  ├─ male-back-tablet-mobile.png
│  │  ├─ male-desktop.png
│  │  └─ male-front-tablet-mobile.png
│  ├─ js
│  │  ├─ account.js
│  │  ├─ add-service.js
│  │  ├─ alteration-female.js
│  │  ├─ alteration-price-calculator.js
│  │  ├─ index.js
│  │  ├─ login.js
│  │  ├─ order-history.js
│  │  ├─ services.js
│  │  └─ signup.js
│  └─ pages
│     ├─ account-menu.html
│     ├─ add-service.html
│     ├─ alteration-pages
│     │  ├─ alteration-about
│     │  │  ├─ (debug)alteration-modules.txt
│     │  │  ├─ alteration(how-the-program-works).txt
│     │  │  ├─ alteration-functionality-prompt.txt
│     │  │  ├─ alteration-modules.txt
│     │  │  └─ alteration-responsive-page.txt
│     │  ├─ alteration-female-bottom.html
│     │  ├─ alteration-female-dress.html
│     │  ├─ alteration-female-jacket.html
│     │  ├─ alteration-female-top.html
│     │  ├─ alteration-male-bottom.html
│     │  ├─ alteration-male-suits.html
│     │  ├─ alteration-male-top.html
│     │  ├─ alteration-modules
│     │  │  ├─ alteration-CartManager.js
│     │  │  ├─ alteration-DOMRenderer.js
│     │  │  ├─ alteration-DataMaps.js
│     │  │  ├─ alteration-EventManager.js
│     │  │  ├─ alteration-Main.js
│     │  │  ├─ alteration-PriceCalculator.js
│     │  │  └─ alteration-StateManager.js
│     │  └─ alteration-repair.html
│     ├─ index.html
│     ├─ login.html
│     ├─ measurement-pages
│     │  ├─ measurement-about
│     │  │  ├─ (debug)floating-window-measurement.txt
│     │  │  ├─ (debug)measurement-split-modules.txt
│     │  │  ├─ measurement(how-the-program-works).txt
│     │  │  ├─ measurement-functionality-prompt.txt
│     │  │  └─ measurement-modules.txt
│     │  ├─ measurement-modules
│     │  │  ├─ measurement-DataMaps.js
│     │  │  ├─ measurement-Main.js
│     │  │  ├─ measurement-Manager.js
│     │  │  ├─ measurement-Validator.js
│     │  │  └─ measurement-ViewHandler.js
│     │  ├─ measurements-female.html
│     │  ├─ measurements-male.html
│     │  └─ sample.html
│     ├─ order-history.html
│     ├─ services.html
│     └─ signup.html
└─ test
   ├─ alteration-module-tests
   │  ├─ .mocharc.json
   │  ├─ alteration-TEST(about)
   │  │  ├─ (debug)alteration-test-unit.txt
   │  │  ├─ (how to use)alteration-unit-test.txt
   │  │  └─ alteration-unit-tests-prompt.txt
   │  ├─ package-lock.json
   │  ├─ package.json
   │  └─ unit
   │     ├─ AlterationApp.test.js
   │     ├─ CartManager.test.js
   │     ├─ DOMRenderer.test.js
   │     ├─ EventManager.test.js
   │     ├─ PriceCalculator.test.js
   │     └─ StateManager.test.js
   └─ measurement-module-tests
      ├─ .mocharc.json
      ├─ measurement-TEST(about)
      │  ├─ (debug)measurement-test-unit.txt
      │  ├─ (how to use)measurement-unit-test.txt
      │  └─ measurement-unit-tests-prompt.txt
      ├─ package-lock.json
      ├─ package.json
      └─ unit
         ├─ measurement-DataMaps.test.js
         ├─ measurement-Manager.test.js
         ├─ measurement-Validator.test.js
         └─ measurement-ViewHandler.test.js
]
