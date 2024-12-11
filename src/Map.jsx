import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';  
// ייבוא רכיבי ספריית React-Leaflet שמסייעים בהצגת מפה אינטרקטיבית. 
// - MapContainer: רכיב שמציג את המפה.
 // - TileLayer: רכיב שמציב את שכבת המפה (כמו OpenStreetMap או Google Maps).
 // - Marker: הצבת נקודת סימון על המפה.
 // - Popup: הצגת חלון קופץ עם תוכן בעת לחיצה על Marker.
 // - useMap: הוק (hook) המאפשר גישה לאובייקט המפה לצורך עדכון דינמי.

import 'leaflet/dist/leaflet.css'; 
// ייבוא קובץ CSS שמספק את העיצוב הבסיסי של ספריית Leaflet (עיצוב המפה והסמלים שלה).

import './style.css'  
// ייבוא קובץ CSS מותאם אישית לעיצוב היישום (למשל, כדי לעצב את הרכיב MapContainer או את סביבתו).

export default function Map({ latitude, longitude }) {  
  // פונקציה שמייצרת את רכיב המפה, מקבלת פרופס latitude ו-longitude (קואורדינטות גיאוגרפיות).
  // הפרופס מאפשר להציג מיקום משתנה.

  const location = [latitude, longitude];  
  // יצירת משתנה 'location' שמכיל את המיקום על פי הקואורדינטות שנמסרו. מדובר במערך שבו הערך הראשון הוא latitude והשני longitude.

  // שימוש ב-useMap כדי לעדכן את המפה באופן דינמי
  function UpdateMapCenter() {  
    // פונקציה זו משמשת לעדכון מיקום המפה באופן דינמי.

    const map = useMap();  
    // השגת אובייקט המפה (השתמשנו ב-useMap כדי לקבל את אובייקט המפה המותאם אישית).

    map.setView(location, map.getZoom());  
    // עדכון המיקום של המפה למיקום החדש שנמסר (השתמשנו ב-setView כדי לשנות את המרכז של המפה).
    // המפה תישאר על אותה רמת זום (הזום לא משתנה, הוא נשאר כפי שהיה).

    return null;  
    // הפונקציה לא מחזירה כלום, מכיוון שהיא רק מבצעת את העדכון למפה.
  }

  return (  
    <div id='map-container'>  
      {/* יצירת אלמנט div שמכיל את המפה, עם id המאפשר שליטה בעיצוב שלה */}
      <MapContainer center={location} zoom={13} style={{ height: '500px', width: '100%' }}>  
        {/* רכיב MapContainer שמהווה את המיכל של המפה. */}
        {/* הפרופס center מקבל את המיקום שהתקבל (latitude ו-longitude) */}
        {/* הפרופס zoom מציין את רמת הזום (13 זו רמת זום סטנדרטית) */}
        {/* style מאפשר קביעת גובה ורוחב למפה בתוך ה-DIV (המפה תהיה בגובה של 500px ורוחב של 100%) */}

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />  
        {/* TileLayer מציב את שכבת המפה, כאן השתמשנו ב-OpenStreetMap כספק המפות */}
        
        <UpdateMapCenter />  
        {/* הכנסת רכיב UpdateMapCenter אשר יעדכן את מיקום המפה באופן דינמי כאשר הערכים של latitude או longitude משתנים */}

        <Marker position={location}>  
        {/* הצבת Marker (סמן) במיקום שנמסר (latitude, longitude). */}
        {/* position מכיל את המיקום בו יהיה הסמן */}
        
          <Popup>מיקום נבחר: {latitude}, {longitude}</Popup>  
          {/* Popup הוא חלון קופץ שמוצג כאשר לוחצים על ה-Marker. */}
          {/* כאן אנו מציגים את הקואורדינטות של המיקום שנבחר בפורמט עברי. */}
        </Marker>

      </MapContainer>
    </div>
  );
}
