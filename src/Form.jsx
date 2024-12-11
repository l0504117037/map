
import { useState } from "react";  
// ייבוא ה-hook useState מ-React, המשמש לניהול מצב בתוך קומפוננטה (כמו ערכים של input או מערכים).

import './style.css';  
// ייבוא קובץ CSS שמכיל את העיצוב המותאם אישית של הקומפוננטה (כמו עיצוב של טופס או אלמנטים אחרים).

export default function Form({ setCoordinates }) {  
  // יצירת הפונקציה Form, שהיא קומפוננטת React המייצגת טופס. 
  // היא מקבלת את הפרופס setCoordinates, שהוא פונקציה שמעדכנת את הקואורדינטות במפה לאחר שהמשתמש בחר כתובת.

  const [input, setInput] = useState("");  
  // יצירת משתנה state בשם 'input' שמאחסן את הערך הנוכחי של שדה החיפוש.
  // 'setInput' היא הפונקציה שמשתמשים בה כדי לעדכן את הערך של 'input'.

  const [suggestions, setSuggestions] = useState([]);  
  // יצירת משתנה state בשם 'suggestions' לאחסון רשימת ההצעות המתקבלות מ-API של OpenStreetMap.
  // 'setSuggestions' היא הפונקציה שמשתמשים בה כדי לעדכן את הרשימה הזו.

  function inputChange(e) {  
    // פונקציה זו מפעילה עדכון בכל פעם שהמשתמש מקליד בשדה החיפוש (onChange).

    let value = e.target.value;  
    // השגת הערך שהמשתמש הקליד בשדה הטקסט (input).

    setInput(value);  
    // עדכון הערך של 'input' עם הערך החדש שהוזן בשדה החיפוש.

    fetch(  
      // ביצוע קריאת API ל-OpenStreetMap כדי לחפש כתובת על פי הטקסט שהוזן בשדה החיפוש.
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5`
    )
      .then((res) => {  
        // טיפול בתגובה מהשרת. אם התגובה אינה תקינה (סטטוס שגיאה), נזרוק שגיאה.
        if (!res.ok) throw new Error("res not ok");
        return res.json();  
        // החזרת התשובה כ-JSON.
      })
      .then((data) => {  
        // קבלת הנתונים המוחזרים מה-API (רשימת כתובות תואמות).
        setSuggestions(data);  
        // עדכון מצב 'suggestions' עם הנתונים שהתקבלו מה-API.
      })
      .catch((err) => console.log("error:", err));  
      // טיפול בשגיאות קריאה ל-API (אם יש בעיות בקישור או בשרת).
  }

  function addressSelect(address) {  
    // פונקציה שנקראת כאשר המשתמש בוחר כתובת מתוך רשימת ההצעות.

    setInput(address.display_name);  
    // עדכון הערך בשדה החיפוש עם שם הכתובת שנבחרה.

    setCoordinates({  
      // עדכון הקואורדינטות באמצעות הפונקציה setCoordinates שהתקבלה כפרופס.
      lat: parseFloat(address.lat),  
      // המרת ערך ה-latitude (קו רוחב) ל-number.
      lon: parseFloat(address.lon),  
      // המרת ערך ה-longitude (קו אורך) ל-number.
    });
  }

  return (  
    <form>  
      {/* יצירת אלמנט <form> שמכיל את כל השדות שהמשתמש ממלא */}
      
      <input type="text" placeholder="name" />  
      {/* שדה טקסט נוסף, כרטיסי למילוי שם (לא מחובר לשום state כרגע). */}
      
      <input  
        type="text"  
        placeholder="search address"  
        value={input}  
        onChange={inputChange}  
      />  
      {/* שדה חיפוש (input) שמחובר למשתנה state 'input'. ברגע שהמשתמש מקליד, 
      הפונקציה inputChange תופעל כדי לשלוח קריאת API ולמצוא הצעות כתובת */}
      
      <ul>  
        {/* רשימה (ul) להצגת הצעות הכתובת שנמצאו */}
        {suggestions.map((address) => (  
          // עבור כל כתובת מתוך רשימת ההצעות ('suggestions'), ייווצר אלמנט <li>.
          <li key={address.display_name} onClick={() => addressSelect(address)}>  
            {/* כאשר המשתמש לוחץ על כתובת, הפונקציה addressSelect תופעל עם כתובת זו */}
            {address.display_name}  
            {/* הצגת שם הכתובת מתוך הנתונים של ה-API */}
          </li>
        ))}
      </ul>

      <input type="text" placeholder="phone number" />  
      {/* שדה טקסט נוסף למילוי מספר טלפון (לא מחובר לשום state כרגע). */}
      
      <input type="email" placeholder="email" />  
      {/* שדה טקסט נוסף למילוי כתובת אימייל (לא מחובר לשום state כרגע). */}
      
      <input type="text" placeholder="name" />  
      {/* שדה טקסט נוסף למילוי שם (לא מחובר לשום state כרגע). */}
      
      <label htmlFor="">connect to internet:</label>  
      {/* תווית עבור שדה בחירה (checkbox) המאפשר למשתמש לבחור אם יש לו חיבור לאינטרנט */}
      <input type="checkbox" />  
      {/* שדה בחירה (checkbox) לחיבור לאינטרנט */}
      
      <label htmlFor="">kitchen:</label>  
      {/* תווית עבור שדה בחירה (checkbox) המאפשר למשתמש לבחור אם יש לו מטבח */}
      <input type="checkbox" />  
      {/* שדה בחירה (checkbox) למטבח */}
      
      <label htmlFor="">coffee:</label>  
      {/* תווית עבור שדה בחירה (checkbox) המאפשר למשתמש לבחור אם יש לו מכונת קפה */}
      <input type="checkbox" />  
      {/* שדה בחירה (checkbox) למכונת קפה */}
      
      <input type="number" placeholder="num of rooms" />  
      {/* שדה מספרי למילוי מספר חדרים (לא מחובר לשום state כרגע). */}
      
      <input type="number" placeholder="distance" />  
      {/* שדה מספרי למילוי מרחק (לא מחובר לשום state כרגע). */}
    </form>
  );
}
