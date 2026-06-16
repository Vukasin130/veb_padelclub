# Veb Padel Club

MERN aplikacija za pregled ponude padel kluba, registraciju korisnika i
rezervaciju slobodnih termina.

## Funkcionalnosti

- pregled ponude terena, treninga i clanarina
- prikaz slobodnih termina po danu i satu
- registracija, prijava i odjava korisnika
- korisnicki profil sa pregledom mojih rezervacija
- rezervacija termina samo za prijavljene korisnike
- unos kontakt podataka i pregled rezervacije pre potvrde
- detaljan prikaz pojedinacne rezervacije
- zastita od rezervisanja zauzetog ili uklonjenog termina
- admin liste za ponudu, termine i rezervacije
- admin dodavanje/uklanjanje termina
- admin pregled svih rezervacija i ponistavanje aktivnih rezervacija

## Preduslovi

- Node.js
- MongoDB pokrenut lokalno na `mongodb://127.0.0.1:27017/padelclub`

Ako MongoDB nije pokrenut, backend ce javiti gresku `ECONNREFUSED 127.0.0.1:27017`.

## Pokretanje

```powershell
npm install
copy .env.example .env
npm run data:import
npm run dev
```

Frontend se otvara na `http://localhost:3000`, a backend API radi na
`http://localhost:5000`.

## Demo Nalozi

- admin: `admin@padelclub.rs` / `123456`
- korisnik: `korisnik@padelclub.rs` / `123456`

## Provera

```powershell
npm test --prefix frontend -- --watchAll=false
npm run build
```

## Prikaz Baze Na Odbrani

Za vizuelni prikaz baze koristi se MongoDB Compass.

1. Otvori MongoDB Compass.
2. U polje za konekciju unesi:

```text
mongodb://127.0.0.1:27017
```

3. Izaberi bazu `padelclub`.
4. Pokazi kolekcije:

- `users` - admin i registrovani korisnik
- `products` - ponuda padel kluba
- `slots` - slobodni termini
- `reservations` - rezervacije koje nastaju kroz aplikaciju

Ako baza nije popunjena, pokreni:

```powershell
npm run data:import
```

## Struktura Projekta

- `backend/` - Express API, MongoDB modeli, rute, kontroleri i seed podaci
- `frontend/` - React aplikacija, Redux store, RTK Query API slice-ovi i ekrani
- `.env.example` - primer konfiguracije za lokalno pokretanje

## Glavne Rute U Aplikaciji

- `/` - pregled ponude
- `/product/:id` - detalj ponude i izbor termina
- `/cart` - izabrane stavke rezervacije
- `/shipping` - kontakt podaci
- `/payment` - nacin placanja
- `/placeorder` - potvrda rezervacije
- `/reservation/:id` - detalj rezervacije
- `/profile` - profil i moje rezervacije
- `/admin/reservationlist` - admin pregled rezervacija
- `/admin/slotlist` - admin pregled i dodavanje termina
- `/admin/productlist` - admin pregled ponude
