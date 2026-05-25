const dayNames = [
    'Nedelja',
    'Ponedeljak',
    'Utorak',
    'Sreda',
    'Cetvrtak',
    'Petak',
    'Subota',
];

const monthNames = [
    'januar',
    'februar',
    'mart',
    'april',
    'maj',
    'jun',
    'jul',
    'avgust',
    'septembar',
    'oktobar',
    'novembar',
    'decembar',
];

const getDateLabel = (daysFromToday) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);

    return `${dayNames[date.getDay()]}, ${date.getDate()}. ${monthNames[date.getMonth()]}`;
};

const buildWeeklySlots = (slotGroups) =>
    Array.from({ length: 7 }, (_, index) => ({
        date: getDateLabel(index),
        slots: index === 0
            ? slotGroups[index].filter((slot) => {
                const [hours, minutes] = slot.time.split(':').map(Number);
                const slotDate = new Date();
                slotDate.setHours(hours, minutes, 0, 0);

                return slotDate > new Date();
            })
            : slotGroups[index],
    }));

const products = [
    {
        _id: '1',
        name: 'Rezervacija padel terena',
        image: 'https://images.pexels.com/photos/31012869/pexels-photo-31012869.jpeg?auto=compress&cs=tinysrgb&w=900',
        description:
            'Izaberi slobodan dan i sat na profesionalnom padel terenu sa vestackom travom, staklenim zidovima, osvetljenjem i pripremljenom opremom za igru.',
        category: 'Tereni',
        price: 2400.00,
        countInStock: 12,
        rating: 4.9,
        numReviews: 33,
        allowRacketRental: true,
        availableSlots: buildWeeklySlots([
            [
                { id: 'court-d0-14', time: '14:00', duration: '60 min', court: 'Teren 1', price: 2400 },
                { id: 'court-d0-17', time: '17:00', duration: '60 min', court: 'Teren 2', price: 2400 },
                { id: 'court-d0-20', time: '20:00', duration: '90 min', court: 'Teren 1', price: 3300 },
            ],
            [
                { id: 'court-d1-10', time: '10:00', duration: '60 min', court: 'Teren 1', price: 2400 },
                { id: 'court-d1-18', time: '18:00', duration: '90 min', court: 'Teren 2', price: 3300 },
                { id: 'court-d1-21', time: '21:00', duration: '60 min', court: 'Teren 1', price: 2400 },
            ],
            [
                { id: 'court-d2-09', time: '09:00', duration: '60 min', court: 'Teren 2', price: 2400 },
                { id: 'court-d2-16', time: '16:00', duration: '60 min', court: 'Teren 1', price: 2400 },
                { id: 'court-d2-19', time: '19:00', duration: '90 min', court: 'Teren 2', price: 3300 },
            ],
            [
                { id: 'court-d3-11', time: '11:00', duration: '60 min', court: 'Teren 1', price: 2400 },
                { id: 'court-d3-15', time: '15:00', duration: '90 min', court: 'Teren 2', price: 3300 },
                { id: 'court-d3-20', time: '20:00', duration: '90 min', court: 'Teren 1', price: 3300 },
            ],
            [
                { id: 'court-d4-12', time: '12:00', duration: '60 min', court: 'Teren 2', price: 2400 },
                { id: 'court-d4-17', time: '17:00', duration: '60 min', court: 'Teren 1', price: 2400 },
                { id: 'court-d4-21', time: '21:00', duration: '90 min', court: 'Teren 2', price: 3300 },
            ],
            [
                { id: 'court-d5-10', time: '10:00', duration: '90 min', court: 'Teren 1', price: 3300 },
                { id: 'court-d5-14', time: '14:00', duration: '60 min', court: 'Teren 2', price: 2400 },
                { id: 'court-d5-19', time: '19:00', duration: '90 min', court: 'Teren 1', price: 3300 },
            ],
            [
                { id: 'court-d6-09', time: '09:00', duration: '60 min', court: 'Teren 1', price: 2400 },
                { id: 'court-d6-13', time: '13:00', duration: '60 min', court: 'Teren 2', price: 2400 },
                { id: 'court-d6-18', time: '18:00', duration: '90 min', court: 'Teren 2', price: 3300 },
            ],
        ]),
    },
    {
        _id: '2',
        name: 'Individualni trening sa trenerom',
        image: 'https://images.pexels.com/photos/36227712/pexels-photo-36227712.jpeg?auto=compress&cs=tinysrgb&w=900',
        description:
            'Trening jedan na jedan za tehniku udarca, kretanje po terenu, taktiku i pripremu za rekreativne turnire.',
        category: 'Treninzi',
        price: 3000.00,
        countInStock: 6,
        rating: 4.8,
        numReviews: 11,
        allowRacketRental: true,
        availableSlots: buildWeeklySlots([
            [
                { id: 'ind-d0-13', time: '13:00', duration: '60 min', court: 'Teren 1', price: 3000 },
                { id: 'ind-d0-18', time: '18:00', duration: '60 min', court: 'Teren 2', price: 3000 },
            ],
            [
                { id: 'ind-d1-11', time: '11:00', duration: '60 min', court: 'Teren 1', price: 3000 },
                { id: 'ind-d1-17', time: '17:00', duration: '60 min', court: 'Teren 2', price: 3000 },
            ],
            [
                { id: 'ind-d2-10', time: '10:00', duration: '60 min', court: 'Teren 1', price: 3000 },
                { id: 'ind-d2-19', time: '19:00', duration: '60 min', court: 'Teren 2', price: 3000 },
            ],
            [
                { id: 'ind-d3-12', time: '12:00', duration: '60 min', court: 'Teren 1', price: 3000 },
                { id: 'ind-d3-18', time: '18:00', duration: '60 min', court: 'Teren 2', price: 3000 },
            ],
            [
                { id: 'ind-d4-09', time: '09:00', duration: '60 min', court: 'Teren 1', price: 3000 },
                { id: 'ind-d4-16', time: '16:00', duration: '60 min', court: 'Teren 2', price: 3000 },
            ],
            [
                { id: 'ind-d5-11', time: '11:00', duration: '60 min', court: 'Teren 2', price: 3000 },
                { id: 'ind-d5-20', time: '20:00', duration: '60 min', court: 'Teren 1', price: 3000 },
            ],
            [
                { id: 'ind-d6-10', time: '10:00', duration: '60 min', court: 'Teren 1', price: 3000 },
                { id: 'ind-d6-15', time: '15:00', duration: '60 min', court: 'Teren 2', price: 3000 },
            ],
        ]),
    },
    {
        _id: '3',
        name: 'Grupni trening za pocetnike',
        image: 'https://images.pexels.com/photos/35261961/pexels-photo-35261961.jpeg?auto=compress&cs=tinysrgb&w=900',
        description:
            'Cas za manje grupe koji pokriva pravila igre, osnovne udarce, pozicioniranje i prve takticke situacije.',
        category: 'Treninzi',
        price: 1800.00,
        countInStock: 10,
        rating: 4.7,
        numReviews: 9,
        allowRacketRental: true,
        availableSlots: buildWeeklySlots([
            [
                { id: 'grp-d0-15', time: '15:00', duration: '75 min', court: 'Teren 1', price: 1800 },
                { id: 'grp-d0-20', time: '20:00', duration: '75 min', court: 'Teren 2', price: 1800 },
            ],
            [
                { id: 'grp-d1-16', time: '16:00', duration: '75 min', court: 'Teren 1', price: 1800 },
                { id: 'grp-d1-21', time: '21:00', duration: '75 min', court: 'Teren 2', price: 1800 },
            ],
            [
                { id: 'grp-d2-09', time: '09:00', duration: '75 min', court: 'Teren 2', price: 1800 },
                { id: 'grp-d2-17', time: '17:00', duration: '75 min', court: 'Teren 1', price: 1800 },
            ],
            [
                { id: 'grp-d3-13', time: '13:00', duration: '75 min', court: 'Teren 1', price: 1800 },
                { id: 'grp-d3-19', time: '19:00', duration: '75 min', court: 'Teren 2', price: 1800 },
            ],
            [
                { id: 'grp-d4-10', time: '10:00', duration: '75 min', court: 'Teren 2', price: 1800 },
                { id: 'grp-d4-18', time: '18:00', duration: '75 min', court: 'Teren 1', price: 1800 },
            ],
            [
                { id: 'grp-d5-12', time: '12:00', duration: '75 min', court: 'Teren 1', price: 1800 },
                { id: 'grp-d5-16', time: '16:00', duration: '75 min', court: 'Teren 2', price: 1800 },
            ],
            [
                { id: 'grp-d6-11', time: '11:00', duration: '75 min', court: 'Teren 2', price: 1800 },
                { id: 'grp-d6-18', time: '18:00', duration: '75 min', court: 'Teren 1', price: 1800 },
            ],
        ]),
    },
    {
        _id: '4',
        name: 'Mesecna clanarina Padel Club',
        image: 'https://images.pexels.com/photos/35248244/pexels-photo-35248244.jpeg?auto=compress&cs=tinysrgb&w=900',
        description:
            'Clanski paket sa prioritetnom rezervacijom termina, popustom na treninge i pozivima za klupske dogadjaje.',
        category: 'Clanarine',
        price: 6500.00,
        countInStock: 20,
        rating: 5.0,
        numReviews: 22,
    },
]

export default products
