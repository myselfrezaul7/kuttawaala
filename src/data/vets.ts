export type VetClinicType = 'Private' | 'Government' | 'University' | 'NGO';

export type BangladeshDivision =
    | 'Dhaka'
    | 'Chattogram'
    | 'Sylhet'
    | 'Rajshahi'
    | 'Khulna'
    | 'Barishal'
    | 'Rangpur'
    | 'Mymensingh';

export const BANGLADESH_DIVISIONS: BangladeshDivision[] = [
    'Dhaka',
    'Chattogram',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barishal',
    'Rangpur',
    'Mymensingh',
];

export const DISTRICT_TO_DIVISION: Record<string, BangladeshDivision> = {
    // Dhaka Division (13 Districts)
    Dhaka: 'Dhaka',
    Gazipur: 'Dhaka',
    Narayanganj: 'Dhaka',
    Munshiganj: 'Dhaka',
    Tangail: 'Dhaka',
    Faridpur: 'Dhaka',
    Manikganj: 'Dhaka',
    Narsingdi: 'Dhaka',
    Kishoreganj: 'Dhaka',
    Gopalganj: 'Dhaka',
    Madaripur: 'Dhaka',
    Rajbari: 'Dhaka',
    Shariatpur: 'Dhaka',

    // Chattogram Division (11 Districts + common spelling aliases)
    Chattogram: 'Chattogram',
    Chittagong: 'Chattogram',
    Cumilla: 'Chattogram',
    Comilla: 'Chattogram',
    Chandpur: 'Chattogram',
    Brahmanbaria: 'Chattogram',
    Noakhali: 'Chattogram',
    Feni: 'Chattogram',
    Lakshmipur: 'Chattogram',
    "Cox's Bazar": 'Chattogram',
    Khagrachhari: 'Chattogram',
    Rangamati: 'Chattogram',
    Bandarban: 'Chattogram',

    // Rajshahi Division (8 Districts)
    Rajshahi: 'Rajshahi',
    Sirajganj: 'Rajshahi',
    Pabna: 'Rajshahi',
    Bogura: 'Rajshahi',
    Chapainawabganj: 'Rajshahi',
    Naogaon: 'Rajshahi',
    Natore: 'Rajshahi',
    Joypurhat: 'Rajshahi',

    // Khulna Division (10 Districts)
    Khulna: 'Khulna',
    Jashore: 'Khulna',
    Jessore: 'Khulna',
    Kushtia: 'Khulna',
    Jhenaidah: 'Khulna',
    Chuadanga: 'Khulna',
    Bagerhat: 'Khulna',
    Magura: 'Khulna',
    Meherpur: 'Khulna',
    Narail: 'Khulna',
    Satkhira: 'Khulna',

    // Barishal Division (6 Districts)
    Barishal: 'Barishal',
    Barisal: 'Barishal',
    Pirojpur: 'Barishal',
    Jhalokati: 'Barishal',
    Barguna: 'Barishal',
    Patuakhali: 'Barishal',
    Bhola: 'Barishal',

    // Sylhet Division (4 Districts)
    Sylhet: 'Sylhet',
    Moulvibazar: 'Sylhet',
    Habiganj: 'Sylhet',
    Sunamganj: 'Sylhet',

    // Rangpur Division (8 Districts)
    Rangpur: 'Rangpur',
    Dinajpur: 'Rangpur',
    Thakurgaon: 'Rangpur',
    Panchagarh: 'Rangpur',
    Nilphamari: 'Rangpur',
    Lalmonirhat: 'Rangpur',
    Kurigram: 'Rangpur',
    Gaibandha: 'Rangpur',

    // Mymensingh Division (4 Districts)
    Mymensingh: 'Mymensingh',
    Jamalpur: 'Mymensingh',
    Sherpur: 'Mymensingh',
    Netrokona: 'Mymensingh',
};

export type VetClinic = {
    id: number;
    name: string;
    address: string;
    phone: string;
    altPhone?: string;
    website?: string;
    mapUrl: string;
    hours: string;
    district: string;
    division?: BangladeshDivision;
    // Google Maps rating where known. Omitted for newly added clinics whose rating
    // could not be independently confirmed — the UI hides the rating when absent.
    rating?: number;
    reviewCount?: number;
    services: string[];
    type?: VetClinicType;
    emergency24h?: boolean;
    // true when the clinic's direct phone could not be confirmed and the DLS national helpline (16358) is used instead
    usesHelpline?: boolean;
};

export function normalizeDistrictName(district?: string): string {
    if (!district) return 'Dhaka';
    const trimmed = district.trim();
    if (trimmed.toLowerCase() === 'chittagong') return 'Chattogram';
    if (trimmed.toLowerCase() === 'comilla') return 'Cumilla';
    if (trimmed.toLowerCase() === 'jessore') return 'Jashore';
    if (trimmed.toLowerCase() === 'barisal') return 'Barishal';
    return trimmed;
}

export function getClinicDivision(district?: string, explicitDivision?: BangladeshDivision): BangladeshDivision {
    if (explicitDivision) return explicitDivision;
    const normalized = normalizeDistrictName(district);
    return DISTRICT_TO_DIVISION[normalized] || 'Dhaka';
}

export function getClinicType(vet: {
    name?: string;
    services?: string[];
    type?: VetClinicType;
}): VetClinicType {
    if (vet.type) return vet.type;
    const nameLower = (vet.name || '').toLowerCase();
    const servicesLower = (vet.services || []).map(s => (s || '').toLowerCase());

    if (
        nameLower.includes('cvasu') ||
        nameLower.includes('university') ||
        nameLower.includes('teaching hospital') ||
        nameLower.includes('sau ') ||
        nameLower.includes('bau ') ||
        servicesLower.some(s => s.includes('university'))
    ) {
        return 'University';
    }

    if (
        nameLower.includes('obhoyaronno') ||
        nameLower.includes('welfare') ||
        nameLower.includes('foundation') ||
        servicesLower.some(s => s === 'ngo' || s.includes('ngo'))
    ) {
        return 'NGO';
    }

    if (
        nameLower.includes('district veterinary') ||
        nameLower.includes('district livestock') ||
        nameLower.includes('upazila livestock') ||
        nameLower.includes('upazila veterinary') ||
        nameLower.includes('district animal') ||
        nameLower.includes('(govt)') ||
        nameLower.includes('zilla veterinary') ||
        servicesLower.some(s => s.includes('government'))
    ) {
        return 'Government';
    }

    return 'Private';
}

export function isClinicEmergency24h(vet: {
    hours?: string;
    services?: string[];
    emergency24h?: boolean;
}): boolean {
    if (typeof vet.emergency24h === 'boolean') return vet.emergency24h;
    const hoursLower = (vet.hours || '').toLowerCase();
    const servicesLower = (vet.services || []).map(s => (s || '').toLowerCase());
    return (
        hoursLower.includes('24') ||
        servicesLower.some(s => s.includes('24/7') || s.includes('24 hours'))
    );
}

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const MOCK_VET_CLINICS: VetClinic[] = [
    // ==========================================
    //           DHAKA DIVISION (13 Districts)
    // ==========================================
    {
        id: 101, name: 'Central Veterinary Hospital (Govt)',
        address: '48 Kazi Alauddin Road, Dhaka-1000',
        phone: '01745-137090',
        altPhone: '02-47117391',
        website: 'https://dls.gov.bd',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Central+Veterinary+Hospital+Dhaka',
        hours: '9 AM - 5 PM (Emergency Available)', district: 'Dhaka', type: 'Government',
        rating: 3.9, reviewCount: 787, services: ['Government', 'Low Cost', 'Surgery', 'X-Ray', 'Vaccination']
    },
    {
        id: 102, name: 'Gulshan Pet Clinic',
        address: '4-5 DCC Super Market, Gulshan-2, Dhaka-1212',
        phone: '01715-078434',
        altPhone: '01912-013615',
        website: 'https://gulshanpetclinic.com',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan+Pet-Animal+Clinic+Dhaka',
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        rating: 4.2, reviewCount: 154, services: ['General Checkup', 'Vaccination', 'Surgery', 'Dental']
    },
    {
        id: 103, name: 'LD Veterinary Hospital',
        address: 'House #15, Sonargaon Janapath, Sector-07, Uttara, Dhaka-1230',
        phone: '01733-339597',
        website: 'https://ldveterinaryhos.com',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=LD+Veterinary+Hospital+Uttara',
        hours: '24 Hours', district: 'Dhaka', type: 'Private', emergency24h: true,
        rating: 4.5, reviewCount: 312, services: ['24/7 Emergency', 'Diagnostics', 'Surgery', 'Grooming']
    },
    {
        id: 104, name: 'PAW Life Care (Lalmatia)',
        address: '1/12, Block-G, Lalmatia, Dhaka',
        phone: '01909-617994',
        altPhone: '01329-666437',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=PAW+Life+Care+Lalmatia',
        hours: '10 AM - 9 PM', district: 'Dhaka', type: 'Private',
        rating: 4.3, reviewCount: 189, services: ['General Checkup', 'Surgery', 'Vaccination', 'Rehabilitation']
    },
    {
        id: 105, name: "Dr. Sagir's Pet Clinic & Research Center",
        address: 'House 3/2, Block D, Lalmatia, Dhaka',
        phone: '01912-251312',
        altPhone: '01752-987436',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dr+Sagir+Pet+Clinic+Dhaka',
        hours: '24 Hours', district: 'Dhaka', type: 'Private', emergency24h: true,
        rating: 4.1, reviewCount: 145, services: ['24/7 Emergency', 'Research', 'Surgery', 'Vaccination']
    },
    {
        id: 106, name: 'MewMew Pet Care',
        address: 'House 34, Block F, Road 2, Banasree, Rampura, Dhaka-1219',
        phone: '01711-791249',
        website: 'https://mewmewshopbd.com',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=MewMew+Pet+Care+Banasree',
        hours: '10 AM - 9 PM', district: 'Dhaka', type: 'Private',
        rating: 4.4, reviewCount: 121, services: ['General Checkup', 'Oxygen Support', 'Surgery', 'Vaccination']
    },
    {
        id: 107, name: 'BioCare Pet Hospital',
        address: '404/A (1st Floor) Khilgaon Chowrasta, Dhaka-1219',
        phone: '01779-593933',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=BioCare+Pet+Hospital+Khilgaon',
        hours: '10 AM - 10 PM', district: 'Dhaka', type: 'Private',
        rating: 4.5, reviewCount: 88, services: ['General Checkup', 'Surgery', 'Pharmacy', 'Vaccination']
    },
    {
        id: 108, name: 'Care & Cure Veterinary Clinic',
        address: 'House 28, Road 7, Dhanmondi, Dhaka-1205',
        phone: '01551-807384',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Care+%26+Cure+Veterinary+Clinic+Dhanmondi',
        hours: '10 AM - 9 PM', district: 'Dhaka', type: 'Private',
        rating: 4.0, reviewCount: 167, services: ['General Checkup', 'Surgery', 'Vaccination', 'Emergency']
    },
    {
        id: 109, name: 'Obhoyaronno - Bangladesh Animal Welfare Foundation',
        address: 'DNCC Market, Shaheed Tajuddin Ahmed Ave, Mohakhali, Dhaka-1208',
        phone: '01718-643497',
        website: 'https://www.obhoyaronno.org',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Obhoyaronno+Bangladesh',
        hours: '9 AM - 5 PM', district: 'Dhaka', type: 'NGO',
        rating: 4.7, reviewCount: 450, services: ['NGO', 'Spay/Neuter', 'Rescue', 'Vaccination']
    },
    {
        id: 110, name: 'Furmillion Veterinary Clinic',
        address: '15/2, Block C, Tajmahal Road (1st Floor), Mohammadpur, Dhaka-1207',
        phone: '01600-011644',
        altPhone: '09666-811644',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Furmillion+Veterinary+Clinic',
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        rating: 4.3, reviewCount: 88, services: ['Diagnostics', 'General Checkup', 'Surgery', 'Vaccination']
    },
    {
        id: 115, name: 'Teaching & Training Pet Hospital and Research Centre (CVASU, Purbachal)',
        address: 'Plot 5B, Road 114, Sector-18, Purbachal New Town, Dhaka',
        phone: '01960-136749', altPhone: '01814-362649',
        website: 'https://cvasu.ac.bd',
        mapUrl: maps('Teaching and Training Pet Hospital and Research Centre Purbachal'),
        hours: '9 AM - 8 PM', district: 'Dhaka', type: 'University',
        rating: 4.9, reviewCount: 201,
        services: ['University Hospital', 'Surgery', 'Diagnostics', 'Vaccination', 'Emergency']
    },
    {
        id: 116, name: 'SAU Veterinary Teaching Hospital',
        address: 'Sher-e-Bangla Agricultural University, Sher-e-Bangla Nagar, Dhaka-1207',
        phone: '02-44814020',
        website: 'https://sau.edu.bd',
        mapUrl: maps('Sher-e-Bangla Agricultural University Veterinary Teaching Hospital'),
        hours: '9 AM - 5 PM', district: 'Dhaka', type: 'University',
        services: ['University Hospital', 'General Checkup', 'Surgery', 'Vaccination']
    },
    {
        id: 117, name: 'Veterinary Specialized Hospital & Diagnostic Center (Mirpur)',
        address: '428/1, Garden View Road, Mirpur-1, Dhaka',
        phone: '01305-843505',
        mapUrl: maps('Veterinary Specialized Hospital and Diagnostic Center Mirpur'),
        hours: '10 AM - 9 PM', district: 'Dhaka', type: 'Private',
        services: ['Surgery', 'Diagnostics', 'Emergency', 'Vaccination']
    },
    {
        id: 118, name: 'Veterinary Specialized Hospital & Diagnostic Center (Uttara)',
        address: 'House #47 (2nd Floor), Road 2, Sector 5, Uttara, Dhaka',
        phone: '01305-843505',
        mapUrl: maps('Veterinary Specialized Hospital Uttara Sector 5'),
        hours: '10 AM - 9 PM', district: 'Dhaka', type: 'Private',
        services: ['Surgery', 'Diagnostics', 'General Checkup']
    },
    {
        id: 119, name: 'PAW Life Care (Uttara)',
        address: 'Flat A1, House #16, Road 10B, Sector 11, Uttara, Dhaka',
        phone: '01327-418988',
        mapUrl: maps('PAW Life Care Uttara'),
        hours: '10 AM - 9 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Surgery', 'Vaccination']
    },
    {
        id: 120, name: 'PAW Life Care (Mirpur)',
        address: '2/7/D, Tolarbag, Gate No. 01, Water Tank Road, Mirpur, Dhaka',
        phone: '01310-336835',
        mapUrl: maps('PAW Life Care Mirpur Tolarbag'),
        hours: '10 AM - 9 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination', 'Deworming']
    },
    {
        id: 121, name: "Dr. Siamak's Pet Clinic",
        address: 'House #56, Road 9/B, Sector 5, Uttara, Dhaka',
        phone: '01711-561155',
        mapUrl: maps('Dr Siamak Pet Clinic Uttara'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination', 'Surgery']
    },
    {
        id: 122, name: 'Evergreen Pet Care',
        address: 'House #53, Road 12, Sector 13, Uttara, Dhaka',
        phone: '01716-535822',
        mapUrl: maps('Evergreen Pet Care Uttara'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination']
    },
    {
        id: 123, name: 'Mirpur Pet Animal Clinic',
        address: 'House #04 (Ground Floor), Road 01, Mirpur-12, Dhaka',
        phone: '01320-823299',
        mapUrl: maps('Mirpur Pet Animal Clinic Mirpur 12'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination', 'Deworming']
    },
    {
        id: 124, name: 'Bd Pet.Care (Bashundhara)',
        address: 'Ka-54/3, Bashundhara Road, near Bashundhara Gate, Dhaka',
        phone: '01713-267313', altPhone: '01713-267310',
        mapUrl: maps('Bd Pet Care Bashundhara Road'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination', 'Grooming']
    },
    {
        id: 125, name: 'Vet and Pet Care (VNPC)',
        address: '1/17 Humayun Road, Rashida Villa, Mohammadpur, Dhaka',
        phone: '01674-173844',
        mapUrl: maps('Vet and Pet Care Humayun Road Dhaka'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination']
    },
    {
        id: 126, name: 'Care for Paws (Dhanmondi)',
        address: 'House 68/3C, Europa School Lane, Zigatola, Dhanmondi, Dhaka',
        phone: '01635-817270', altPhone: '01750-578138',
        mapUrl: maps('Care for Paws Dhanmondi Zigatola'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination', 'Spay/Neuter']
    },
    {
        id: 127, name: 'Banani Pet Care',
        address: 'House 41, Road 7, Block G, Banani, Dhaka',
        phone: '01886-334434',
        mapUrl: maps('Banani Pet Care Road 7 Block G'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination']
    },
    {
        id: 128, name: 'Pet Doctor Robi',
        address: '5/15, Block C, Tajmahal Road, Mohammadpur, Dhaka-1207',
        phone: '01723-649754',
        mapUrl: maps('Pet Doctor Robi Tajmahal Road Mohammadpur'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination']
    },
    {
        id: 129, name: 'Pet Expert Dhaka',
        address: 'House 128, Road 4, Mohammadia Housing Society, Mohammadpur, Dhaka-1207',
        phone: '01751-427940',
        mapUrl: maps('Pet Expert Dhaka Mohammadia Housing'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        services: ['General Checkup', 'Vaccination']
    },
    {
        id: 139, name: 'Dhaka Pet Clinic',
        address: '11/2 Abhay Das Lane, Tikatuli, Dhaka-1203',
        phone: '01886-921867',
        mapUrl: maps('Dhaka Pet Clinic Abhay Das Lane Tikatuli'),
        hours: '10 AM - 8 PM', district: 'Dhaka', type: 'Private',
        rating: 4.5, reviewCount: 45,
        services: ['General Checkup', 'Vaccination', 'Treatment']
    },
    {
        id: 140, name: 'AniMedCare Baridhara',
        address: 'House 03, Road 08, Block J, Baridhara, Dhaka-1212',
        phone: '01894-947411',
        mapUrl: maps('AniMedCare Baridhara Dhaka'),
        hours: '10 AM - 9 PM', district: 'Dhaka', type: 'Private',
        rating: 4.8, reviewCount: 67,
        services: ['General Checkup', 'Vaccination', 'Grooming', 'Surgery']
    },

    // ---- Dhaka Division Districts (Outside Dhaka City) ----
    {
        id: 111, name: 'District Veterinary Hospital, Gazipur',
        address: 'Gazipur Sadar, Gazipur',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Gazipur',
        hours: '9 AM - 5 PM', district: 'Gazipur', type: 'Government',
        rating: 3.8, reviewCount: 45, services: ['Government', 'Livestock', 'General Checkup', 'Vaccination']
    },
    {
        id: 112, name: 'District Livestock Office & Veterinary Hospital, Narayanganj',
        address: 'Narayanganj Sadar, Narayanganj',
        phone: '01730-976669', altPhone: '16358',
        website: 'http://narayanganj.gov.bd',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Narayanganj',
        hours: '9 AM - 5 PM', district: 'Narayanganj', type: 'Government',
        rating: 4.1, reviewCount: 32, services: ['Government', 'Vaccination', 'General Checkup']
    },
    {
        id: 113, name: 'District Veterinary Hospital, Munshiganj',
        address: 'Munshiganj Sadar, Munshiganj',
        phone: '01324-290335', altPhone: '01711-167295',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Munshiganj',
        hours: '9 AM - 5 PM', district: 'Munshiganj', type: 'Government',
        rating: 3.8, reviewCount: 25, services: ['Government', 'Livestock', 'General Checkup']
    },
    {
        id: 114, name: 'Upazila Livestock Office & Veterinary Hospital, Sirajdikhan',
        address: 'Sirajdikhan, Munshiganj',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Sirajdikhan',
        hours: '9 AM - 5 PM', district: 'Munshiganj', type: 'Government',
        rating: 3.7, reviewCount: 15, services: ['Government', 'Animal Health', 'Vaccination']
    },
    {
        id: 130, name: 'District Livestock Office & Veterinary Hospital, Tangail',
        address: 'Tangail Sadar, Tangail',
        phone: '01716-365729', altPhone: '16358',
        website: 'http://tangail.gov.bd',
        mapUrl: maps('District Veterinary Hospital Tangail'),
        hours: '9 AM - 5 PM', district: 'Tangail', type: 'Government',
        rating: 4.1, reviewCount: 15, services: ['Government', 'Vaccination', 'General Checkup']
    },
    {
        id: 133, name: 'District Livestock Office & Veterinary Hospital, Narsingdi',
        address: 'Narsingdi Sadar, Narsingdi',
        phone: '01711-020662', altPhone: '16358',
        website: 'http://narsingdi.gov.bd',
        mapUrl: maps('District Veterinary Hospital Narsingdi'),
        hours: '9 AM - 5 PM', district: 'Narsingdi', type: 'Government',
        rating: 4.3, reviewCount: 18, services: ['Government', 'Vaccination', 'General Checkup']
    },
    ...([
        [131, 'Faridpur'],
        [132, 'Manikganj'],
        [134, 'Kishoreganj'],
        [135, 'Gopalganj'],
        [136, 'Madaripur'],
        [137, 'Rajbari'],
        [138, 'Shariatpur'],
    ] as const).map(([id, d]): VetClinic => ({
        id, name: `District Veterinary Hospital, ${d}`,
        address: `${d} Sadar, ${d}`,
        phone: '16358', usesHelpline: true,
        mapUrl: maps(`District Veterinary Hospital ${d}`),
        hours: '9 AM - 5 PM', district: d, type: 'Government',
        services: ['Government', 'Vaccination', 'General Checkup'],
    })),

    // ==========================================
    //         CHATTOGRAM DIVISION (11 Districts)
    // ==========================================
    {
        id: 201, name: 'CVASU Veterinary Hospital (Teaching Hospital)',
        address: 'Zakir Hossain Rd, Khulshi, Chattogram 4202',
        phone: '031-659492',
        altPhone: '01314-300655',
        website: 'https://cvasu.ac.bd',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=CVASU+Veterinary+Hospital+Chittagong',
        hours: '9 AM - 5 PM (Emergency Available)', district: 'Chattogram', type: 'University',
        rating: 4.6, reviewCount: 412, services: ['University Hospital', 'Surgery', 'X-Ray', 'Pathology', 'Emergency']
    },
    {
        id: 214, name: 'Chattogram Specialised Veterinary Care',
        address: 'Road No. 2, South Khulshi, Chattogram',
        phone: '01340-885533',
        mapUrl: maps('Chattogram Specialised Veterinary Care South Khulshi'),
        hours: '24 Hours', district: 'Chattogram', type: 'Private', emergency24h: true,
        services: ['24/7 Emergency', 'ICU', 'Surgery', 'Diagnostics']
    },
    {
        id: 901, name: 'Birds and Pet Animal Clinic (BPAC) - Khulshi',
        address: 'Wireless Moor, Khulshi, Chattogram',
        phone: '01620-211137',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Birds+and+Pet+Animal+Clinic+BPAC+Wireless+moor+Khulshi+Chattogram',
        hours: '10 AM - 10 PM', district: 'Chattogram', type: 'Private',
        rating: 4.8, reviewCount: 120, services: ['General Checkup', 'Emergency', 'Surgery', 'Vaccination']
    },
    {
        id: 904, name: 'Birds and Pet Animal Clinic (BPAC) - Halishahar',
        address: 'Halishahar, Chattogram',
        phone: '01620-211137',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Birds+and+Pet+Animal+Clinic+Halishahar+Sub+branch+Chattogram',
        hours: '10 AM - 10 PM', district: 'Chattogram', type: 'Private',
        rating: 4.8, reviewCount: 40, services: ['General Checkup', 'Emergency', 'Surgery', 'Vaccination']
    },
    {
        id: 215, name: 'Vet Aid Chattogram',
        address: 'Chattogram City, Chattogram',
        phone: '01886-377425', altPhone: '01920-461036',
        mapUrl: maps('Vet Aid Chattogram'),
        hours: '10 AM - 8 PM', district: 'Chattogram', type: 'Private',
        services: ['Vaccination', 'Spay/Neuter', 'Deworming', 'Grooming']
    },
    {
        id: 213, name: 'Dr. Bibek Chandra (Private Chamber)',
        address: 'Chattogram Sadar, Chattogram',
        phone: '01711-057533',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Veterinary+Chittagong',
        hours: 'Call for Appointment', district: 'Chattogram', type: 'Private',
        rating: 4.0, reviewCount: 45, services: ['General Checkup', 'Vaccination']
    },
    {
        id: 202, name: 'District Veterinary Hospital, Chattogram',
        address: 'Abdur Rahman Rd, Chattogram',
        phone: '02-333388524', altPhone: '02333-379147',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Animal+Hospital+Chittagong',
        hours: '9 AM - 5 PM', district: 'Chattogram', type: 'Government',
        rating: 3.9, reviewCount: 120, services: ['Government', 'Low Cost', 'Vaccination']
    },
    {
        id: 203, name: 'District Veterinary Hospital, Cumilla',
        address: 'Rammala Mor, Kotbari Rd, Cumilla 3500',
        phone: '01876-354898',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Zilla+Veterinary+Hospital+Comilla',
        hours: '9 AM - 5 PM', district: 'Cumilla', type: 'Government',
        rating: 3.9, reviewCount: 110, services: ['Government', 'Surgery', 'Vaccination']
    },
    {
        id: 216, name: 'Lil-PAW Vet Care Cumilla',
        address: 'Shop No# 39, Zilla Parishad Super Market, Opposite Diabetic Hospital, Bagichagaon, Cumilla',
        phone: '01725-750937',
        mapUrl: maps('Lil-PAW Vet Care Bagichagaon Cumilla'),
        hours: '10 AM - 8 PM', district: 'Cumilla', type: 'Private',
        rating: 4.8, reviewCount: 27, services: ['General Checkup', 'Vaccination', 'Nutrition']
    },
    {
        id: 217, name: 'Pet Care Point Cumilla',
        address: 'Police Lines Rd, Cumilla',
        phone: '01912-595738',
        mapUrl: maps('Pet Care Point Police Lines Rd Cumilla'),
        hours: '9 AM - 8 PM', district: 'Cumilla', type: 'Private',
        rating: 4.6, reviewCount: 31, services: ['General Checkup', 'Vaccination']
    },
    {
        id: 218, name: 'Vet Care Cumilla',
        address: 'Jafar Khan Rd, Cumilla',
        phone: '01797-516591',
        mapUrl: maps('Vet Care Jafar Khan Rd Cumilla'),
        hours: '10 AM - 8 PM', district: 'Cumilla', type: 'Private',
        rating: 4.5, reviewCount: 19, services: ['General Checkup', 'Vaccination']
    },
    {
        id: 204, name: 'District Livestock Office, Chandpur',
        address: 'Chandpur Sadar, Chandpur',
        phone: '0841-63110',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Chandpur',
        hours: '9 AM - 5 PM', district: 'Chandpur', type: 'Government',
        rating: 3.8, reviewCount: 35, services: ['Government', 'Vaccination']
    },
    {
        id: 205, name: 'District Livestock Office, Brahmanbaria',
        address: 'Brahmanbaria Sadar, Brahmanbaria',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Brahmanbaria',
        hours: '9 AM - 5 PM', district: 'Brahmanbaria', type: 'Government',
        rating: 3.7, reviewCount: 28, services: ['Government', 'General Checkup']
    },
    {
        id: 206, name: 'District Livestock Office, Noakhali',
        address: 'Maijdee Court, Noakhali',
        phone: '02-334493221',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Noakhali',
        hours: '9 AM - 5 PM', district: 'Noakhali', type: 'Government',
        rating: 3.8, reviewCount: 40, services: ['Government', 'Animal Health', 'Vaccination']
    },
    {
        id: 207, name: 'District Veterinary Hospital, Feni',
        address: 'Feni Road, Feni',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Feni+District+Veterinary+Hospital',
        hours: '9 AM - 5 PM', district: 'Feni', type: 'Government',
        rating: 4.0, reviewCount: 28, services: ['Government', 'General Checkup']
    },
    {
        id: 208, name: 'Upazila Livestock Office, Lakshmipur',
        address: 'Lakshmipur Sadar, Lakshmipur',
        phone: '01711-158922',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Lakshmipur',
        hours: '9 AM - 5 PM', district: 'Lakshmipur', type: 'Government',
        rating: 3.7, reviewCount: 20, services: ['Government', 'Vaccination']
    },
    {
        id: 209, name: "District Livestock Office, Cox's Bazar",
        address: "Cox's Bazar Sadar, Cox's Bazar",
        phone: '01850-494491',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Coxs+Bazar',
        hours: '9 AM - 5 PM', district: "Cox's Bazar", type: 'Government',
        rating: 3.8, reviewCount: 30, services: ['Government', 'Emergency', 'Vaccination']
    },
    {
        id: 210, name: 'District Livestock Office, Khagrachhari',
        address: 'Khagrachhari Sadar, Khagrachhari',
        phone: '0361-7171',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Khagrachhari',
        hours: '9 AM - 5 PM', district: 'Khagrachhari', type: 'Government',
        rating: 3.8, reviewCount: 15, services: ['Government', 'General Checkup']
    },
    {
        id: 211, name: 'District Veterinary Hospital, Rangamati',
        address: 'Rangamati Sadar, Rangamati',
        phone: '02-333304690',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Rangamati',
        hours: '9 AM - 5 PM', district: 'Rangamati', type: 'Government',
        rating: 3.9, reviewCount: 20, services: ['Government', 'General Checkup']
    },
    {
        id: 212, name: 'District Livestock Office, Bandarban',
        address: 'Bandarban Sadar, Bandarban',
        phone: '01711-967855', altPhone: '16358',
        website: 'http://bandarban.gov.bd',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Bandarban',
        hours: '9 AM - 5 PM', district: 'Bandarban', type: 'Government',
        rating: 4.2, reviewCount: 12, services: ['Government', 'General Checkup', 'Vaccination']
    },

    // ==========================================
    //           RAJSHAHI DIVISION (8 Districts)
    // ==========================================
    {
        id: 902, name: 'Birds and Pet Animal Clinic (BPAC) - Rajshahi',
        address: 'Uposhahar, Darikhorbona, Rajshahi',
        phone: '01780-790526', altPhone: '01620-211137',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Birds+and+Pet+Animal+Clinic+Uposohor+Darikhorbona+Rajshahi',
        hours: '10 AM - 10 PM', district: 'Rajshahi', type: 'Private',
        rating: 4.8, reviewCount: 85, services: ['General Checkup', 'Emergency', 'Surgery', 'Vaccination']
    },
    {
        id: 309, name: "Dr. Shazid's Pet Clinic",
        address: 'Vodra Mor, Rajshahi',
        phone: '01326-520709',
        website: 'https://shazidpetclinic.com',
        mapUrl: maps('Dr Shazid Pet Clinic Rajshahi'),
        hours: '10 AM - 8 PM', district: 'Rajshahi', type: 'Private',
        services: ['General Checkup', 'Vaccination', 'Surgery']
    },
    {
        id: 310, name: 'Pet Care Rajshahi',
        address: 'Beside Agrani Bank, Uttora Clinic Mor, Uposhahar Road, Rajshahi',
        phone: '01907-395718',
        mapUrl: maps('Pet Care Rajshahi Uposhahar'),
        hours: '10 AM - 8 PM', district: 'Rajshahi', type: 'Private',
        services: ['General Checkup', 'Vaccination']
    },
    {
        id: 301, name: 'District Veterinary Hospital, Rajshahi',
        address: 'Rajshahi Sadar, Rajshahi',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Rajshahi',
        hours: '9 AM - 5 PM', district: 'Rajshahi', type: 'Government',
        rating: 4.1, reviewCount: 88, services: ['Government', 'Surgery', 'Vaccination']
    },
    {
        id: 302, name: 'District Livestock Office, Sirajganj',
        address: 'Sirajganj Sadar, Sirajganj',
        phone: '01324-289482',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Sirajganj',
        hours: '9 AM - 5 PM', district: 'Sirajganj', type: 'Government',
        rating: 3.8, reviewCount: 45, services: ['Government', 'Livestock', 'Vaccination']
    },
    {
        id: 303, name: 'District Veterinary Hospital, Pabna',
        address: 'Pabna Sadar, Pabna',
        phone: '01718-061051',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Pabna',
        hours: '9 AM - 5 PM', district: 'Pabna', type: 'Government',
        rating: 3.9, reviewCount: 50, services: ['Government', 'Vaccination']
    },
    {
        id: 304, name: 'Upazila Veterinary Hospital, Bogura',
        address: 'Bogura Sadar, Bogura',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Veterinary+Hospital+Bogura',
        hours: '9 AM - 5 PM', district: 'Bogura', type: 'Government',
        rating: 3.9, reviewCount: 55, services: ['Government', 'Surgery', 'Vaccination']
    },
    {
        id: 305, name: 'District Veterinary Hospital, Chapainawabganj',
        address: 'Chapainawabganj Sadar, Chapainawabganj',
        phone: '01324-289377',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Chapainawabganj',
        hours: '9 AM - 5 PM', district: 'Chapainawabganj', type: 'Government',
        rating: 3.8, reviewCount: 30, services: ['Government', 'General Checkup']
    },
    {
        id: 306, name: 'Upazila Livestock Office, Naogaon',
        address: 'Naogaon Sadar, Naogaon',
        phone: '01324-289388',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Naogaon',
        hours: '9 AM - 5 PM', district: 'Naogaon', type: 'Government',
        rating: 3.7, reviewCount: 25, services: ['Government', 'Consultation']
    },
    {
        id: 307, name: 'Upazila Livestock Office, Natore',
        address: 'Natore Sadar, Natore',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Natore',
        hours: '9 AM - 5 PM', district: 'Natore', type: 'Government',
        rating: 3.8, reviewCount: 20, services: ['Government', 'General Checkup']
    },
    {
        id: 308, name: 'Upazila Livestock Office, Joypurhat',
        address: 'Joypurhat Sadar, Joypurhat',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Joypurhat',
        hours: '9 AM - 5 PM', district: 'Joypurhat', type: 'Government',
        rating: 3.7, reviewCount: 18, services: ['Government', 'Animal Health']
    },

    // ==========================================
    //           KHULNA DIVISION (10 Districts)
    // ==========================================
    {
        id: 903, name: 'Birds and Pet Animal Clinic (BPAC) - Khulna',
        address: 'Hazi Mohsin Road, House 52, Khulna',
        phone: '01620-211137',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Birds+and+Pet+Animal+Clinic+Khulna+Branch+Hazi+Mohosin+Road+House+52+khulna',
        hours: '10 AM - 10 PM', district: 'Khulna', type: 'Private',
        rating: 4.8, reviewCount: 65, services: ['General Checkup', 'Emergency', 'Surgery', 'Vaccination']
    },
    {
        id: 411, name: "Doctor's Pet Care and Cure (DPCC)",
        address: '171 Sher-e-Bangla Road, Power House Mor, Khulna',
        phone: '01793-617454',
        mapUrl: maps('Doctors Pet Care and Cure Khulna'),
        hours: '10 AM - 9 PM', district: 'Khulna', type: 'Private',
        services: ['Diagnostics', 'Surgery', 'Vaccination', 'Emergency']
    },
    {
        id: 412, name: 'Priyo Pet & Vet Care',
        address: 'House 105/A, Road 02, Nirjon Residential Area, Nirala, Khulna',
        phone: '01973-968669',
        mapUrl: maps('Priyo Pet and Vet Care Nirala Khulna'),
        hours: '10 AM - 8 PM', district: 'Khulna', type: 'Private',
        services: ['General Checkup', 'Vaccination', 'Surgery', 'Dental']
    },
    {
        id: 401, name: 'District Veterinary Hospital, Khulna',
        address: 'Sonadanga, Khulna',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Khulna',
        hours: '9 AM - 5 PM', district: 'Khulna', type: 'Government',
        rating: 4.1, reviewCount: 50, services: ['Government', 'Surgery', 'Vaccination']
    },
    {
        id: 402, name: 'District Veterinary Hospital, Jashore',
        address: 'Jashore Sadar, Jashore',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Jashore',
        hours: '9 AM - 5 PM', district: 'Jashore', type: 'Government',
        rating: 4.0, reviewCount: 60, services: ['Government', 'General Checkup']
    },
    {
        id: 403, name: 'District Livestock Office, Kushtia',
        address: 'Kushtia Sadar, Kushtia',
        phone: '01718-578020',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Kushtia',
        hours: '9 AM - 5 PM', district: 'Kushtia', type: 'Government',
        rating: 3.9, reviewCount: 40, services: ['Government', 'Treatment', 'Vaccination']
    },
    {
        id: 404, name: 'District Livestock Office, Jhenaidah',
        address: 'Jhenaidah Sadar, Jhenaidah',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Jhenaidah',
        hours: '9 AM - 5 PM', district: 'Jhenaidah', type: 'Government',
        rating: 3.8, reviewCount: 35, services: ['Government', 'Vaccination']
    },
    {
        id: 405, name: 'District Animal Husbandry Office, Chuadanga',
        address: 'Chuadanga Sadar, Chuadanga',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Chuadanga',
        hours: '9 AM - 5 PM', district: 'Chuadanga', type: 'Government',
        rating: 3.8, reviewCount: 22, services: ['Government', 'Consultation']
    },
    {
        id: 406, name: 'Upazila Livestock Office, Bagerhat',
        address: 'Bagerhat Sadar, Bagerhat',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Bagerhat',
        hours: '9 AM - 5 PM', district: 'Bagerhat', type: 'Government',
        rating: 3.7, reviewCount: 20, services: ['Government', 'General Checkup']
    },
    {
        id: 407, name: 'Upazila Livestock Office, Magura',
        address: 'Sreepur, Magura',
        phone: '01324-289779',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Magura',
        hours: '9 AM - 5 PM', district: 'Magura', type: 'Government',
        rating: 3.7, reviewCount: 15, services: ['Government', 'Animal Care']
    },
    {
        id: 408, name: 'District Livestock Office, Meherpur',
        address: 'Meherpur Sadar, Meherpur',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Meherpur',
        hours: '9 AM - 5 PM', district: 'Meherpur', type: 'Government',
        rating: 3.6, reviewCount: 12, services: ['Government', 'General Checkup']
    },
    {
        id: 409, name: 'District Livestock Office, Narail',
        address: 'Narail Sadar, Narail',
        phone: '0481-62277',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Narail',
        hours: '9 AM - 5 PM', district: 'Narail', type: 'Government',
        rating: 3.8, reviewCount: 18, services: ['Government', 'Vaccination']
    },
    {
        id: 410, name: 'Upazila Livestock Office, Satkhira',
        address: 'Kaliganj, Satkhira',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Satkhira',
        hours: '9 AM - 5 PM', district: 'Satkhira', type: 'Government',
        rating: 3.7, reviewCount: 25, services: ['Government', 'Emergency']
    },

    // ==========================================
    //           BARISHAL DIVISION (6 Districts)
    // ==========================================
    {
        id: 507, name: "Dr. Imran's Veterinary Care",
        address: 'Hena Palace, 837 Hospital Road, Barishal',
        phone: '01746-841255', altPhone: '01630-098999',
        mapUrl: maps('Dr Imran Veterinary Care Hospital Road Barishal'),
        hours: '10 AM - 8 PM', district: 'Barishal', type: 'Private',
        services: ['General Checkup', 'Vaccination', 'Treatment']
    },
    {
        id: 508, name: 'Barishal Pet Clinic',
        address: 'Katpotti, Barishal',
        phone: '01303-542964',
        mapUrl: maps('Barishal Pet Clinic Katpotti'),
        hours: '10 AM - 8 PM', district: 'Barishal', type: 'Private',
        services: ['General Checkup', 'Vaccination']
    },
    {
        id: 501, name: 'District Veterinary Hospital, Barishal',
        address: 'Kheyaghat Road, Barishal',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Barishal',
        hours: '9 AM - 5 PM', district: 'Barishal', type: 'Government',
        rating: 4.0, reviewCount: 40, services: ['Government', 'Surgery', 'Vaccination']
    },
    {
        id: 502, name: 'District Livestock Office, Pirojpur',
        address: 'Pirojpur Sadar, Pirojpur',
        phone: '01712-209149',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Pirojpur',
        hours: '9 AM - 5 PM', district: 'Pirojpur', type: 'Government',
        rating: 3.8, reviewCount: 20, services: ['Government', 'Vaccination']
    },
    {
        id: 509, name: 'First Care Vet And Pet Care',
        address: 'Station Road, Jhalokati',
        phone: '01712-278939',
        mapUrl: maps('First Care Vet and Pet Care Jhalokati'),
        hours: '10 AM - 8 PM', district: 'Jhalokati', type: 'Private',
        services: ['General Checkup', 'Vaccination']
    },
    {
        id: 503, name: 'District Livestock Officer, Jhalokati',
        address: 'Jhalokati Sadar, Jhalokati',
        phone: '01712-792311',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Officer+Jhalokati',
        hours: '9 AM - 5 PM', district: 'Jhalokati', type: 'Government',
        rating: 3.7, reviewCount: 15, services: ['Government', 'General Checkup']
    },
    {
        id: 504, name: 'District Livestock Officer, Barguna',
        address: 'Barguna Sadar, Barguna',
        phone: '01324-289917',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Officer+Barguna',
        hours: '9 AM - 5 PM', district: 'Barguna', type: 'Government',
        rating: 3.8, reviewCount: 22, services: ['Government', 'Treatment']
    },
    {
        id: 505, name: 'District Livestock Officer, Patuakhali',
        address: 'Patuakhali Sadar, Patuakhali',
        phone: '02-478835582',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Officer+Patuakhali',
        hours: '9 AM - 5 PM', district: 'Patuakhali', type: 'Government',
        rating: 3.9, reviewCount: 28, services: ['Government', 'Animal Health']
    },
    {
        id: 506, name: 'District Livestock Office, Bhola',
        address: 'Bhola Sadar, Bhola',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Bhola',
        hours: '9 AM - 5 PM', district: 'Bhola', type: 'Government',
        rating: 3.7, reviewCount: 18, services: ['Government', 'Vaccination']
    },

    // ==========================================
    //           SYLHET DIVISION (4 Districts)
    // ==========================================
    {
        id: 605, name: 'Sylhet Pet Care (SPC)',
        address: 'House 05 (1st Floor), Road 24, Block D, Shahjalal Uposhahar, Sylhet-3100',
        phone: '01776-214373',
        mapUrl: maps('Sylhet Pet Care Shahjalal Uposhahar'),
        hours: '10 AM - 8 PM', district: 'Sylhet', type: 'Private',
        rating: 4.5, reviewCount: 29,
        services: ['General Checkup', 'Surgery', 'Vaccination', 'Deworming']
    },
    {
        id: 608, name: 'Pet and Vet Care Sylhet',
        address: 'Deen Central Market, Sylhet-3100',
        phone: '01675-014088',
        mapUrl: maps('Pet and Vet Care Deen Central Market Sylhet'),
        hours: '10 AM - 8 PM', district: 'Sylhet', type: 'Private',
        rating: 4.6, reviewCount: 42,
        services: ['General Checkup', 'Surgery', 'Vaccination']
    },
    {
        id: 606, name: 'Sylhet Pet Haven Care',
        address: '39 Ghurni, Airport Road, Amberkhana, Sylhet',
        phone: '01878-072396',
        mapUrl: maps('Sylhet Pet Haven Care Amberkhana'),
        hours: '10 AM - 8 PM', district: 'Sylhet', type: 'Private',
        services: ['General Checkup', 'Pharmacy', 'Vaccination']
    },
    {
        id: 607, name: 'Panacea Vet and Pet Care',
        address: 'Mira Bazar, Sylhet',
        phone: '01707-367057',
        mapUrl: maps('Panacea Vet and Pet Care Mira Bazar Sylhet'),
        hours: '10 AM - 8 PM', district: 'Sylhet', type: 'Private',
        rating: 4.8, reviewCount: 15,
        services: ['General Checkup', 'Vaccination', 'Nutrition']
    },
    {
        id: 609, name: 'Pulse Pet & Vet Care',
        address: 'Sylhet Sadar, Sylhet',
        phone: '01521-403761',
        mapUrl: maps('Pulse Pet and Vet Care Sylhet'),
        hours: '10 AM - 8 PM', district: 'Sylhet', type: 'Private',
        rating: 4.7, reviewCount: 22,
        services: ['General Checkup', 'Vaccination']
    },
    {
        id: 610, name: 'Sylhet Veterinary Hospital (Mirza Jangal)',
        address: 'Mirza Jangal Rd, Sylhet',
        phone: '01937-794803',
        mapUrl: maps('Sylhet Veterinary Hospital Mirza Jangal'),
        hours: '10 AM - 8 PM', district: 'Sylhet', type: 'Private',
        rating: 4.4, reviewCount: 56,
        services: ['General Checkup', 'Surgery', 'Emergency']
    },
    {
        id: 601, name: 'Sylhet District Veterinary Hospital',
        address: 'Tilagor, Sylhet',
        phone: '01711-287533',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sylhet+District+Veterinary+Hospital',
        hours: '9 AM - 5 PM', district: 'Sylhet', type: 'Government',
        rating: 4.0, reviewCount: 150, services: ['Government', 'General Checkup', 'Vaccination']
    },
    {
        id: 602, name: 'District Veterinary Hospital, Moulvibazar',
        address: 'Moulvibazar Sadar, Moulvibazar',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Moulvibazar',
        hours: '9 AM - 5 PM', district: 'Moulvibazar', type: 'Government',
        rating: 3.9, reviewCount: 45, services: ['Government', 'Vaccination']
    },
    {
        id: 603, name: 'District Veterinary Hospital, Habiganj',
        address: 'Habiganj Sadar, Habiganj',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Habiganj',
        hours: '9 AM - 5 PM', district: 'Habiganj', type: 'Government',
        rating: 3.8, reviewCount: 30, services: ['Government', 'General Checkup']
    },
    {
        id: 604, name: 'District Livestock Office, Sunamganj',
        address: 'Sunamganj Sadar, Sunamganj',
        phone: '01712-081619',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Sunamganj',
        hours: '9 AM - 5 PM', district: 'Sunamganj', type: 'Government',
        rating: 3.7, reviewCount: 25, services: ['Government', 'Vaccination']
    },

    // ==========================================
    //           RANGPUR DIVISION (8 Districts)
    // ==========================================
    {
        id: 709, name: 'Community Pet Care (Rangpur)',
        address: 'B.Ed College Lane, opposite Circuit House, DC More, Rangpur 5400',
        phone: '01783-121256', altPhone: '01925-121100',
        mapUrl: maps('Community Pet Care Rangpur DC More'),
        hours: '24/7 Emergency Line', district: 'Rangpur', type: 'Private', emergency24h: true,
        services: ['24/7 Emergency', 'Vaccination', 'Spay/Neuter', 'Diagnostics']
    },
    {
        id: 701, name: 'District Veterinary Hospital, Rangpur',
        address: 'Grand Hotel Mor, Rangpur',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Rangpur',
        hours: '9 AM - 5 PM', district: 'Rangpur', type: 'Government',
        rating: 3.8, reviewCount: 110, services: ['Government', 'Livestock', 'Vaccination']
    },
    {
        id: 702, name: 'District Veterinary Hospital, Dinajpur',
        address: 'Dinajpur Sadar, Dinajpur',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Dinajpur',
        hours: '9 AM - 5 PM', district: 'Dinajpur', type: 'Government',
        rating: 3.9, reviewCount: 65, services: ['Government', 'Surgery', 'Vaccination']
    },
    {
        id: 703, name: 'District Veterinary Hospital, Thakurgaon',
        address: 'Thakurgaon Sadar, Thakurgaon',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Thakurgaon',
        hours: '9 AM - 5 PM', district: 'Thakurgaon', type: 'Government',
        rating: 3.8, reviewCount: 40, services: ['Government', 'General Checkup']
    },
    {
        id: 704, name: 'District Veterinary Hospital, Panchagarh',
        address: 'Panchagarh Sadar, Panchagarh',
        phone: '02-587718147',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Panchagarh',
        hours: '9 AM - 5 PM', district: 'Panchagarh', type: 'Government',
        rating: 3.6, reviewCount: 15, services: ['Government', 'General Checkup']
    },
    {
        id: 705, name: 'Upazila Veterinary Hospital, Nilphamari',
        address: 'Nilphamari Sadar, Nilphamari',
        phone: '01716-302882',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Veterinary+Hospital+Nilphamari',
        hours: '9 AM - 5 PM', district: 'Nilphamari', type: 'Government',
        rating: 3.7, reviewCount: 22, services: ['Government', 'Treatment']
    },
    {
        id: 706, name: 'District Veterinary Hospital, Lalmonirhat',
        address: 'Lalmonirhat Sadar, Lalmonirhat',
        phone: '01712-708154',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Lalmonirhat',
        hours: '9 AM - 5 PM', district: 'Lalmonirhat', type: 'Government',
        rating: 3.7, reviewCount: 18, services: ['Government', 'Vaccination']
    },
    {
        id: 707, name: 'District Veterinary Hospital, Kurigram',
        address: 'Kurigram Sadar, Kurigram',
        phone: '01730-324808',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Kurigram',
        hours: '9 AM - 5 PM', district: 'Kurigram', type: 'Government',
        rating: 3.6, reviewCount: 20, services: ['Government', 'Animal Health']
    },
    {
        id: 708, name: 'District Veterinary Hospital, Gaibandha',
        address: 'Gaibandha Sadar, Gaibandha',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Gaibandha',
        hours: '9 AM - 5 PM', district: 'Gaibandha', type: 'Government',
        rating: 3.7, reviewCount: 25, services: ['Government', 'General Checkup']
    },

    // ==========================================
    //         MYMENSINGH DIVISION (4 Districts)
    // ==========================================
    {
        id: 806, name: 'BAU Veterinary Teaching Hospital',
        address: 'Bangladesh Agricultural University, Mymensingh-2202',
        phone: '02-996667401',
        website: 'https://bau.edu.bd',
        mapUrl: maps('BAU Veterinary Teaching Hospital Mymensingh'),
        hours: '9 AM - 5 PM', district: 'Mymensingh', type: 'University',
        rating: 4.8, reviewCount: 310,
        services: ['University Hospital', 'Surgery', 'Diagnostics', 'Vaccination', 'Emergency']
    },
    {
        id: 801, name: 'Mymensingh Iron Hide Vet Clinic (Private)',
        address: 'Naumahal, Mymensingh',
        phone: '01774-477688',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mymensingh+Iron+Hide+Vet+Clinic',
        hours: '10 AM - 8 PM', district: 'Mymensingh', type: 'Private',
        services: ['Orthopedic', 'Surgery', 'X-Ray', 'General Checkup']
    },
    {
        id: 802, name: 'Upazila Veterinary Hospital, Mymensingh',
        address: 'Mymensingh Sadar, Mymensingh',
        phone: '16358', usesHelpline: true,
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Veterinary+Hospital+Mymensingh',
        hours: '9 AM - 5 PM', district: 'Mymensingh', type: 'Government',
        rating: 3.8, reviewCount: 30, services: ['Government', 'General Checkup', 'Vaccination']
    },
    {
        id: 803, name: 'District Veterinary Hospital, Jamalpur',
        address: 'Jamalpur Sadar, Jamalpur',
        phone: '01324-290126',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Jamalpur',
        hours: '9 AM - 5 PM', district: 'Jamalpur', type: 'Government',
        rating: 3.8, reviewCount: 35, services: ['Government', 'Livestock', 'Vaccination']
    },
    {
        id: 804, name: 'District Veterinary Hospital, Sherpur',
        address: 'Sherpur Sadar, Sherpur',
        phone: '01711-467755',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Sherpur',
        hours: '9 AM - 5 PM', district: 'Sherpur', type: 'Government',
        rating: 3.9, reviewCount: 28, services: ['Government', 'Surgery', 'Vaccination']
    },
    {
        id: 805, name: 'District Veterinary Hospital, Netrokona',
        address: 'Netrokona Sadar, Netrokona',
        phone: '01324-290225',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Netrokona',
        hours: '9 AM - 5 PM', district: 'Netrokona', type: 'Government',
        rating: 3.8, reviewCount: 25, services: ['Government', 'Vaccination']
    },
];
