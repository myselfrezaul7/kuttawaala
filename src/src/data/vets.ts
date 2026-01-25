export type VetClinic = {
    id: number;
    name: string;
    address: string;
    phone: string;
    website?: string;
    mapUrl: string;
    hours: string;
    district: string;
};

export const MOCK_VET_CLINICS: VetClinic[] = [
    // --- DHAKA DIVISION ---
    { id: 1, name: 'PAW Life Care', address: 'House 1/2, Road 2, Block A, Section 10, Mirpur, Dhaka', phone: '+8801712345678', website: 'https://pawlifecare.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PAW+Life+Care+Mirpur+Dhaka', hours: '10:00 AM - 8:00 PM', district: 'Dhaka' },
    { id: 2, name: 'PetVet Care', address: 'House 34, Road 12, Block E, Banani, Dhaka', phone: '+8801812345679', website: 'https://petvetcare.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PetVet+Care+Banani+Dhaka', hours: '9:00 AM - 9:00 PM', district: 'Dhaka' },
    { id: 3, name: 'Central Veterinary Hospital', address: '42, Kazi Nazrul Islam Ave, Dhaka 1215', phone: '+88029665492', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Central+Veterinary+Hospital+Dhaka', hours: '24 Hours', district: 'Dhaka' },
    { id: 4, name: 'Gulshan Pet Animal Clinic', address: 'House 20, Road 55, Gulshan 2, Dhaka', phone: '+8801912345680', website: 'https://gulshanpetclinic.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan+Pet+Animal+Clinic+Dhaka', hours: '11:00 AM - 7:00 PM', district: 'Dhaka' },
    { id: 5, name: 'Obhoyaronno Vet Clinic', address: 'House-3, Road-1, Sector-1, Uttara, Dhaka 1230', phone: '+8801718123456', website: 'http://obhoyaronno.org', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Obhoyaronno+Vet+Clinic+Uttara+Dhaka', hours: '10:00 AM - 7:00 PM', district: 'Dhaka' },
    { id: 6, name: 'The VET', address: 'House 7, Road 2/A, Sector 4, Uttara, Dhaka', phone: '+8801313303303', website: 'https://thevet.com.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+VET+Uttara+Dhaka', hours: '10:00 AM - 10:00 PM', district: 'Dhaka' },
    { id: 7, name: 'Care & Cure Vet Chamber', address: '5/4, Block-F, Lalmatia, Dhaka', phone: '+8801711234567', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Care+and+Cure+Vet+Chamber+Lalmatia', hours: '5:00 PM - 9:00 PM', district: 'Dhaka' },
    { id: 8, name: 'Vetymed Pet Clinic', address: '24, 2 Green Rd, Dhaka 1205', phone: '01711-258355', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vetymed+Pet+Clinic', hours: '10 AM - 9 PM', district: 'Dhaka' },

    // --- CHITTAGONG DIVISION ---
    { id: 11, name: 'Chattogram Veterinary and Animal Sciences University (CVASU)', address: 'Zakir Hossain Rd, Khulshi, Chittagong 4202', phone: '01314-300655', mapUrl: 'https://www.google.com/maps/search/?api=1&query=CVASU+Chittagong', hours: '9 AM - 5 PM', district: 'Chattogram' },
    { id: 12, name: 'VET AID', address: 'Oxygen Square, Chittagong', phone: '01886-377425', mapUrl: 'https://www.google.com/maps/search/?api=1&query=VET+AID+Chittagong', hours: '10 AM - 8 PM', district: 'Chattogram' },
    { id: 13, name: 'Antidote - Complete Veterinary Care', address: '402/A Garden City Complex, M M Ali Road, Chittagong', phone: '01670-433184', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Antidote+Veterinary+Care', hours: '10 AM - 9 PM', district: 'Chattogram' },

    // --- SYLHET DIVISION ---
    { id: 30, name: 'Sylhet District Veterinary Hospital', address: 'Tilagor, Sylhet', phone: '01711-287533', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sylhet+District+Veterinary+Hospital', hours: '9 AM - 5 PM', district: 'Sylhet' },
    { id: 31, name: 'Pet and Vet Care', address: 'Deen Central Market, Sylhet 3100', phone: '01675-014088', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pet+and+Vet+Care+Sylhet', hours: '10 AM - 8 PM', district: 'Sylhet' },
];
