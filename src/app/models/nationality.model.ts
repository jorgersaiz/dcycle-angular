export interface Nationality {
    count: number;
    country: Country[];
    name: string;
}

interface Country {
    country_id: string;
    probability: number;
}