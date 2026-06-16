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

  return `${dayNames[date.getDay()]}, ${date.getDate()}. ${
    monthNames[date.getMonth()]
  }`;
};

const buildSlots = (products) => {
  const [court, individual, group] = products;
  const slotTemplates = [
    {
      product: court._id,
      slots: [
        ['14:00', '60 min', 'Teren 1', 2400],
        ['17:00', '60 min', 'Teren 2', 2400],
        ['20:00', '90 min', 'Teren 1', 3300],
      ],
    },
    {
      product: individual._id,
      slots: [
        ['11:00', '60 min', 'Teren 1', 3000],
        ['18:00', '60 min', 'Teren 2', 3000],
      ],
    },
    {
      product: group._id,
      slots: [
        ['10:00', '75 min', 'Teren 2', 1800],
        ['19:00', '75 min', 'Teren 1', 1800],
      ],
    },
  ];

  return Array.from({ length: 7 }).flatMap((_, dayIndex) =>
    slotTemplates.flatMap((template) =>
      template.slots.map(([time, duration, courtName, price]) => ({
        product: template.product,
        dateLabel: getDateLabel(dayIndex),
        time,
        duration,
        court: courtName,
        price,
      }))
    )
  );
};

export default buildSlots;
