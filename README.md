# LibreCompass 🧭

[![Live Demo](https://img.shields.io/badge/Live_Demo-librecompass.netlify.app-22c55e?style=for-the-badge)](https://librecompass.netlify.app/)
[![LibreHub](https://img.shields.io/badge/Search_Engine-librehub.netlify.app-16a34a?style=for-the-badge)](https://librehub.netlify.app/)

> **«Βρες το κατάλληλο εργαλείο σε 3 βήματα»**  
> Ο διαδραστικός οδηγός ανακάλυψης ελεύθερου και ανοικτού λογισμικού του οικοσυστήματος **LibreHub**.

**Live Demo:** [https://librecompass.netlify.app/](https://librecompass.netlify.app/) & [https://iosifidis.github.io/librecompass/](https://iosifidis.github.io/librecompass/)  
**Μηχανή Αναζήτησης:** [https://librehub.netlify.app/](https://librehub.netlify.app/) (ή [librehub.gr](https://iosifidis.github.io/librehub.gr/))

---

## Τι είναι το LibreCompass;

Το **LibreCompass** είναι μια σύγχρονη, διαδραστική διαδικτυακή εφαρμογή καθοδήγησης (decision guide / wizard). Βοηθά τους χρήστες (καθημερινούς χρήστες, επιχειρήσεις, φοιτητές/εκπαιδευτικούς, δημόσιους φορείς) να ανακαλύψουν αξιόπιστες εναλλακτικές λύσεις Ελεύθερου Λογισμικού / Λογισμικού Ανοικτού Κώδικα (FOSS) για τα εμπορικά προγράμματα που χρησιμοποιούν καθημερινά.

Συνδέεται άμεσα με το **LibreHub** (τη μηχανή αναζήτησης ανοικτού κώδικα), προσφέροντας την ιδανική «πυξίδα» για όσους θέλουν να εξερευνήσουν εργαλεία βήμα-βήμα χωρίς απαραίτητα να γνωρίζουν εκ των προτέρων ποιο λογισμικό αναζητούν.

## Χαρακτηριστικά

- 🧭 **Καθοδηγούμενη Ανακάλυψη σε 3 Βήματα:** Επιλογή Τομέα Χρήσης → Κατηγορία Εργαλείου → Προτεινόμενο Ανοικτό Λογισμικό.
- 🔄 **Εμπορικά Αντίστοιχα:** Κάθε κάρτα αναφέρει ρητά ποιο κλειστό/ιδιόκτητο πρόγραμμα αντικαθιστά (π.χ. *Office*, *Photoshop*, *Acrobat* κ.λπ.).
- ⚡ **Αστραπιαία Απόκριση:** Eager loading των κατηγοριών και άμεση πλοήγηση χωρίς καθυστερήσεις.
- 🎨 **Σύγχρονο UI/UX:** Σχεδιασμένο με Tailwind CSS, Framer Motion animations και dark aesthetic συμβατή με το LibreHub.
- 🔗 **Διασύνδεση με το LibreHub:** Άμεση πρόσβαση στη μηχανή αναζήτησης για απευθείας αναζητήσεις.

## Τεχνολογίες

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/) (Icons)

## Τοπική Εκτέλεση (Development)

**Προαπαιτούμενα:** [Node.js](https://nodejs.org/) (v18+)

1. Κλωνοποίηση του αποθετηρίου:
   ```bash
   git clone https://github.com/iosifidis/librecompass.git
   cd librecompass
   ```

2. Εγκατάσταση εξαρτήσεων:
   ```bash
   npm install
   ```

3. Εκκίνηση του development server:
   ```bash
   npm run dev
   ```

Η εφαρμογή θα είναι διαθέσιμη στο `http://localhost:3000`.

## Scripts

- `npm run dev`: Εκκίνηση τοπικού dev server.
- `npm run build`: Παραγωγή του production bundle στον φάκελο `dist`.
- `npm run preview`: Προεπισκόπηση του built project.
- `npm run lint`: Έλεγχος σφαλμάτων TypeScript (`tsc --noEmit`).

## Docker

Build και εκτέλεση με Docker:
```bash
docker build -t librecompass .
docker run -p 8080:80 librecompass
```

## Ταυτότητα

Μέρος του ανοικτού οικοσυστήματος **LibreHub**.

