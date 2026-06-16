# Padel Club Frontend

React deo MERN aplikacije za Padel Club.

## Funkcionalnosti

- pregled ponude i detalja svake stavke
- izbor slobodnog termina i dodatnog iznajmljivanja reketa
- registracija, prijava i odjava korisnika
- korpa rezervacija i potvrda termina
- admin panel za termine i rezervacije

## Pokretanje Samo Frontenda

```powershell
npm install
npm start
```

Frontend ocekuje backend na `http://localhost:5000`, definisano kroz `proxy`
u `package.json`.

## Provera

```powershell
npm test -- --watchAll=false
npm run build
```
