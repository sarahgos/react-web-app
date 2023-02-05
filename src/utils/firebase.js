import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, updateProfile} from 'firebase/auth';
import {getFirestore, doc, getDoc, where, setDoc, collection, getDocs, query, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "dev-at-deakin-8a26e.firebaseapp.com",
  projectId: "dev-at-deakin-8a26e",
  storageBucket: "dev-at-deakin-8a26e.appspot.com",
  messagingSenderId: "87173265947",
  appId: "1:87173265947:web:1e219ac235aebfdba5d6be"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialise google authorization.
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt:"select_account"
});

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Get document from db.
export const getQuestionDocs = async () => {

  var index = 0;
  const collectionRef = collection(db, 'questions');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const questionMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {...items} = docSnapshot.data();
    acc[index] = items
    index++;
    return acc;
  }, {})

  return questionMap;
}

// Get document from db.
export const getAnswerDocs = async (docId) => {

  var index = 0;
  const collectionRef = collection(db, `questions/${docId}/comments`);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const answerMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {...items} = docSnapshot.data();
    acc[index] = items
    index++;
    return acc;
  }, {})

  return answerMap;
}

// Get feedback document from db.
export const getFeedbackDocs = async (userId) => {

  var index = 0;
  const collectionRef = collection(db, `users/${userId}/feedback`);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const feedbackMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {...items} = docSnapshot.data();
    acc[index] = items
    index++;
    return acc;
  }, {})

  return feedbackMap;
}

// Get article document from db.
export const getArticleDocs = async () => {

  const collectionRef = collection(db, 'articles');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  var count = 0;

  const articleArray = []

  querySnapshot.forEach((doc) => {
    articleArray.push(doc.data());
  })

  articleArray.forEach((async(item) => {
    
    var url = await getImageFromStorage(item.imageId);
    item.imageId = url;
    count++;

    if (count === articleArray.length)
    {
  
      return articleArray;
    }
  }))

  return articleArray;
}

// Get tutorial document from db.
export const getTutorialDocs = async () => {

  const collectionRef = collection(db, 'tutorials');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  var count = 0;

  const tutorialArray = []

  querySnapshot.forEach((doc) => {
    tutorialArray.push(doc.data());
  })

  tutorialArray.forEach((async(item) => {

    var url = await getVideoFromStorage(item.videoId);
    var userName = await getUserFromId(item.userId);
    item.videoId = url;
    item.userId = userName;
    count++;

    if (count === tutorialArray.length)
    {
      return tutorialArray;
    }
  }))

  return tutorialArray;
}

// Get video from storage
export const getVideoFromStorage = async (videoId) => {

  const pathReference = ref(storage, videoId);
  const url = await getDownloadURL(pathReference)

  return url;
}

// Get image from storage
export const getImageFromStorage = async (imageID) => {

  const pathReference = ref(storage, imageID);
  const url = await getDownloadURL(pathReference)

  return url;
}

// Get user from ID
export const getUserFromId = async (userId) => {

  var name = '';
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(element => {
      if (element.id === userId)
      {
        name = element.data().firstName + " " + element.data().lastName;
      }
  });

  return name;
}

// Update video views
export const updateVideoViews = async (docId, currentViews) => {

  const ref = doc(db, "tutorials", docId);
  var views = currentViews + 1;

  await updateDoc(ref, {views: views})
  return views;
}

// Update rating
export const updateUserRating = async (collection, docId, rating) => {

  const ref = doc(db, collection, docId);
  const docSnap = await getDoc(ref);

  var ratingsAmount = docSnap.data().ratingsAmount;
  var newAmount = ratingsAmount + 1;

  var ratingScore = docSnap.data().ratingsScore;
  var newRatingScore = ratingScore + rating;

  rating = (ratingScore / newAmount);

  await updateDoc(ref, {
    ratingsAmount: newAmount,
    ratingsScore: newRatingScore,
    rating: rating
  })

  return rating;
}

// Find user confirmation code
export const findUserWithConfirmation = async (confirmationCode) => {

  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where("confirmationCode", "==", confirmationCode));
  const docs = await getDocs(q);

  const docId = docs.docs[0].id;
  const docRef = doc(db, 'users', docId);

  await updateDoc(docRef, {
    confirmed: true
  })
}

// Find user confirmation code
export const findUserWithEmail = async (email) => {

  const auth = getAuth()
  sendPasswordResetEmail(auth, email);
}

export const addCommentDoc = async (email, comment, docId) => {

  const docRef = doc(collection(db, `questions/${docId}/comments`));
  const id = docRef.id;


  const data = {
    comment: comment,
    userEmail: email,
    createdAt: new Date(),
    docId:id
  }

  try {
    await setDoc(docRef, data)
  }
  catch (error)
  {
      console.log('error in creating ', error.message)
  }

  const docRefQuestion = doc(db, `questions/${docId}`);
  const docSnapQuestion = await getDoc(docRefQuestion);
  console.log(docSnapQuestion);
  console.log(docSnapQuestion.data().userId);
  const userId = docSnapQuestion.data().userId

  const feedbackDoc = doc(collection(db, `users/${userId}/feedback`))

  const feedbackData = {
    questionId: docId,
    questionTitle: docSnapQuestion.data().title,
    userEmail: email,
    createdAt: new Date(),
  }

  try {
    await setDoc(feedbackDoc, feedbackData)
  }
  catch (error)
  {
      console.log('error in creating ', error.message)
  }

  return docRef;
}

// Post a question to the db.
export const addQuestionDoc = async (userAuth, title, question, tags) => {

  const docRef = doc(collection(db, "questions"));
  const docId = docRef.id;

  const data = {
    title: title,
    question: question,
    tags: tags,
    userId: userAuth.uid,
    createdAt: new Date(),
    docId:docId
  }

  try {
    await setDoc(docRef, data)
  }
  catch (error)
  {
      console.log('error in creating ', error.message)
  }

  return docRef;
}

// Post an article to the db.
export const addArticleDoc = async (userAuth, title, abstract, article, tags, imageId) => {

  const docRef = doc(collection(db, "articles"));
  const docId = docRef.id;

  const data = {
      title: title,
      abstract: abstract,
      article: article, 
      tags: tags,
      userId: userAuth.uid,
      imageId: imageId,
      rating: 0, 
      ratingsScore:0,
      ratingsAmount: 0,
      createdAt: new Date(),
      docId:docId
    }

    try {
      await setDoc(docRef, data)
    }
    catch (error)
    {
        console.log('error in creating ', error.message)
    }

    return docRef;
}

// Post a tutorial to the db.
export const addTutorialDoc = async (userAuth, title, description, tags, videoId) => {

  const docRef = doc(collection(db, "tutorials"));
  const docId = docRef.id;

  const data = {
      title: title,
      description: description,
      tags: tags,
      userId: userAuth.uid,
      videoId: videoId,
      views: 0,
      rating: 0, 
      ratingsScore:0,
      ratingsAmount: 0,
      createdAt: new Date(),
      docId:docId
    }

    try {
      await setDoc(docRef, data)
    }
    catch (error)
    {
        console.log('error in creating ', error.message)
    }

    return docRef;
}

export const createUserDocFromGoogle = async (userAuth, additionalInformation = {}) => {

  if (!userAuth.email) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists())
  {
      const  {displayName, email} = userAuth;
      const createdAt = new Date();

  try {
      await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
      })
  }
  catch (error)
  {
      console.log('error in creating ', error.message)
  }
  }
}

// Create a user document in firebase.
export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {

  if (!userAuth.email) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists())
  {
      const  {firstName, lastName, confirmationCode, email} = userAuth;
      const createdAt = new Date();

  try {
      await setDoc(userDocRef, {
          firstName,
          lastName,
          email,
          confirmationCode: confirmationCode,
          confirmed: false,
          createdAt,
          ...additionalInformation
      })
  }
  catch (error)
  {
      console.log('error in creating ', error.message)
  }
  }
  logout();
  return userDocRef;
}

// Create a user upon sign up.
export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;

  const user = await createUserWithEmailAndPassword(auth, email, password);

  return user;
}

// Login a user.
export const loginUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;

  var result = await checkUserConfirmationStatus(email);
  console.log(result);

  if (result) {
    try
    {
      return await signInWithEmailAndPassword(auth, email, password)
    }
    catch(error)
    {
      const errorCode = error.code;
      return errorCode;
    } 
  }
  else return;
}

export const checkUserConfirmationStatus = async (email) => {

  try {
    const auth = getAuth();   
    console.log(auth.currentUser);

    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, where("email", "==", email));
    const docs = await getDocs(q);

    if (docs.docs[0].data().confirmed === false)  {
      return false;
    }
    else  {
      return true;
    }
  }
  catch (error) {
    return error;
  }
}

// Sign out a user.
export const logout = () => {
  signOut(auth);
};
