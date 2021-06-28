const { response } = require("express");

let db;
const request = indexedDB.open("budget", 1);
  
  request.onupgradeneeded = function(event){
      const db = event.target.result;
      db.createObjectStore("pending", {autoincrement: true});
  };

  request.onsuccess = event => {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
    console.log(request.result);
  };

  request.onerror = function(event) {
      console.log("Looks like something went wrong!" + event.target.errorCode);
  };

  function saveRecord (record) {
      const transaction = db.transaction(["pending"], "readwrite");
      const store = transaction.objectStore("pending");

      store.add(record);
  }

  function checkDatabase() {
      if (getAll.result.length > 0) {
          fetch("api/transaction/bulk", {
              method: "POST",
              body: JSON.stringify(getAll.result),
              headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json"
              }
          })
          .then(responst => response.json())
            .then(() => {
                const transaction = db.transaction(["pending"], "readwrite");
                const store = transaction.objectStore("pending");
                store.clear();
            });
      }
  }

  window.addEventListener("online", checkDatabase);
