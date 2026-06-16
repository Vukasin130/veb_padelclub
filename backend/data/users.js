import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin Padel',
    email: 'admin@padelclub.rs',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Registrovani Korisnik',
    email: 'korisnik@padelclub.rs',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;
