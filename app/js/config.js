  // Initialize Firebase
var config = {
  apiKey: "AIzaSyCcCSoqaU3p1-9GJ9t5eLe-6xakgkmAyjc",
  authDomain: "juice-box-d8349.firebaseapp.com",
  databaseURL: "https://juice-box-d8349.firebaseio.com",
  projectId: "juice-box-d8349",
  storageBucket: "juice-box-d8349.appspot.com",
  messagingSenderId: "495155510368"
};
firebase.initializeApp(config);

// ref to db
var ref = firebase.database().ref("prompts/");
console.log("ref success!", ref);
console.log("trying...");
ref.orderByChild("name").on("child_added", function(snapshot) {
  console.log(snapshot.vla);
});
