
import { collection, setDoc, getDocs, doc } from 'firebase/firestore';
import { firestore } from '../firebase.utils';


// export const generateRegNumber = () =>{

// }

async function generateRegNumber(course, cohort) {
    const collectionName = 'students'; // Replace with your collection name
    const regNumberFormat = 'YYYYFE###'; // Replace with your desired format

    // Reference the collection using the course and cohort
    const studentsCollection = collection(firestore, `students/${course}/${cohort}`);
  
    // Query the collection to get existing registration numbers
    const querySnapshot = await getDocs(studentsCollection);
  
    let maxNumber = 0;
    querySnapshot.forEach((doc) => {
      const regNumber = doc.id;
      if (regNumber.startsWith(new Date().getFullYear().toString() + 'FE')) {
        const numberPart = parseInt(regNumber.substr(6), 10);
        if (!isNaN(numberPart) && numberPart > maxNumber) {
          maxNumber = numberPart;
        }
      }
    });
  
    // Increment the highest registration number
    const nextNumber = (maxNumber + 1).toString().padStart(3, '0');
  
    // Generate the new registration number
    const year = new Date().getFullYear();
    const newRegNumber = regNumberFormat.replace('YYYY', year).replace('###', nextNumber);
  
    return newRegNumber;
  }

export const addStudentToCohort = async (studentDetails) =>{
    console.log(studentDetails);
    const {course,cohort } = studentDetails
    const newRegNumber = await generateRegNumber(course,cohort );
    console.log(newRegNumber);
    // const cohortCollectionRef = doc(firestore, `students/${course}/${cohort}/`);
    const studentDocumentRef = doc(firestore, `students/${course}/${cohort}/${newRegNumber}`)

    setDoc(studentDocumentRef, studentDetails)
    .then(() => {
      console.log("Document successfully added to subcollection!");
    })
    .catch((error) => {
      console.error("Error adding document to subcollection: ", error);
    });

}